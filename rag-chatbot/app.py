"""
RAG Chatbot for Architecture & Engineering Research Questions
-------------------------------------------------------------
Streamlit app that lets you chat with your own PDFs (AEC specs, codes, papers).

Features
- Chat-style UI with history
- Upload multiple PDFs (or drop them in ./data) and build a Chroma vector DB
- Retrieval-Augmented Generation (RAG) using LangChain
- Citations with filenames and page numbers
- Pluggable LLM: IBM watsonx **or** OpenAI (auto-detects from env vars)
"""

import os
import uuid
from pathlib import Path
from typing import List, Tuple

import streamlit as st
from dotenv import load_dotenv
import time

# LangChain core
from langchain.prompts import ChatPromptTemplate
from langchain.schema import HumanMessage, SystemMessage
from langchain.text_splitter import RecursiveCharacterTextSplitter

# Loaders & Vector store
from langchain_community.vectorstores import Chroma
from langchain_community.document_loaders import PyPDFLoader, TextLoader
# from langchain_community.embeddings import HuggingFaceEmbeddings

# Chains
from langchain.chains import RetrievalQA

# Optional LLM backends (we import lazily in choose_llm())

APP_TITLE = "AEC Research Chatbot (RAG)"
# Use desktop data folder
DATA_DIR = Path.home() / "Desktop" / "data:"
PERSIST_DIR = ".chroma"
DEFAULT_EMBED_MODEL = "sentence-transformers/all-MiniLM-L6-v2"

def load_api_keys():
    """Load API keys from desktop data folder."""
    api_keys_file = DATA_DIR / "api_keys.env"
    if api_keys_file.exists():
        load_dotenv(api_keys_file)
        st.success("✅ API keys loaded from desktop data folder")
    else:
        st.warning("⚠️ No api_keys.env file found in desktop data folder")
        st.info("Create ~/Desktop/data:/api_keys.env with your API keys")

# Page config
st.set_page_config(
    page_title=APP_TITLE,
    page_icon="🏗️",
    layout="wide",
    initial_sidebar_state="expanded"
)

def choose_llm():
    """Choose LLM backend based on available environment variables."""
    if os.getenv("OPENAI_API_KEY"):
        try:
            from langchain_openai import ChatOpenAI
            return ChatOpenAI(
                model="gpt-3.5-turbo",
                temperature=0.1,
                streaming=True
            )
        except ImportError:
            st.error("OpenAI backend requested but `langchain-openai` not installed. Run: pip install langchain-openai")
            return None
    elif all(os.getenv(k) for k in ["WATSONX_API_KEY", "WATSONX_URL", "WATSONX_PROJECT_ID", "WATSONX_MODEL_ID"]):
        try:
            # Simple HTTP-based IBM watsonx integration
            import requests
            import json
            
            from langchain_core.language_models.llms import LLM
            from langchain_core.outputs import LLMResult
            from typing import Any, List, Optional
            from pydantic import Field
            
            class WatsonxLLMWrapper(LLM):
                api_key: str = Field(default_factory=lambda: os.getenv("WATSONX_API_KEY", ""))
                url: str = Field(default_factory=lambda: os.getenv("WATSONX_URL", ""))
                project_id: str = Field(default_factory=lambda: os.getenv("WATSONX_PROJECT_ID", ""))
                model_id: str = Field(default_factory=lambda: os.getenv("WATSONX_MODEL_ID", ""))
                
                @property
                def _llm_type(self) -> str:
                    return "watsonx"
                
                def _call(self, prompt: str, stop: Optional[List[str]] = None, **kwargs: Any) -> str:
                    # IBM watsonx API call with correct authentication
                    headers = {
                        "Authorization": f"Bearer {self.api_key}",
                        "Content-Type": "application/json"
                    }
                    
                    payload = {
                        "model_id": self.model_id,
                        "input": prompt,
                        "parameters": {
                            "temperature": 0.1,
                            "max_new_tokens": 1024
                        },
                        "project_id": self.project_id
                    }
                    
                    try:
                        # Try the correct IBM watsonx endpoint
                        response = requests.post(
                            f"{self.url}/ml/v1/text/generation?version=2024-11-20",
                            headers=headers,
                            json=payload,
                            timeout=30
                        )
                        
                        if response.status_code == 200:
                            result = response.json()
                            return result.get("results", [{}])[0].get("generated_text", "No response generated")
                        else:
                            return f"Error: {response.status_code} - {response.text}"
                    
                    except Exception as e:
                        return f"Connection error: {str(e)}"
            
            return WatsonxLLMWrapper()
        except ImportError:
            st.error("IBM watsonx backend requested but `requests` not available")
            return None
    else:
        st.error("No LLM backend configured. Set OPENAI_API_KEY or WATSONX_* environment variables.")
        return None

def load_documents() -> List:
    """Load all PDFs from the data directory with progress tracking."""
    if not DATA_DIR.exists():
        DATA_DIR.mkdir(exist_ok=True)
        return []
    
    documents = []
    pdf_files = list(DATA_DIR.glob("*.pdf"))
    
    if not pdf_files:
        return documents
    
    # Create progress bar
    progress_bar = st.progress(0)
    status_text = st.empty()
    
    for i, file_path in enumerate(pdf_files):
        try:
            # Update progress
            progress = (i + 1) / len(pdf_files)
            progress_bar.progress(progress)
            status_text.text(f"📄 Processing {file_path.name}... ({i+1}/{len(pdf_files)})")
            
            loader = PyPDFLoader(str(file_path))
            docs = loader.load()
            # Add metadata for citations
            for doc in docs:
                doc.metadata["source_file"] = file_path.name
                if "page" in doc.metadata:
                    doc.metadata["page_number"] = doc.metadata["page"] + 1
            documents.extend(docs)
        except Exception as e:
            st.error(f"Error loading {file_path.name}: {e}")
    
    # Clear progress indicators
    progress_bar.empty()
    status_text.empty()
    
    return documents

def create_vector_store(documents: List, force_rebuild: bool = False) -> Chroma:
    """Create or load Chroma vector store."""
    persist_path = Path(PERSIST_DIR)
    
    # Use a simple embedding function that doesn't require HuggingFace
    from langchain_community.embeddings import OpenAIEmbeddings
    import openai
    
    # Try to use OpenAI embeddings if API key is available
    if os.getenv("OPENAI_API_KEY"):
        embeddings = OpenAIEmbeddings()
    else:
        # Fallback to a simple TF-IDF based embedding
        from langchain_community.embeddings import FakeEmbeddings
        st.info("Using simple text embeddings (no OpenAI key required)")
        embeddings = FakeEmbeddings(size=1536)
    
    if persist_path.exists() and not force_rebuild and len(documents) > 0:
        # Load existing vector store
        with st.spinner("Loading existing vector store..."):
            vector_store = Chroma(
                persist_directory=str(persist_path),
                embedding_function=embeddings
            )
        st.success(f"✅ Loaded existing vector store with {vector_store._collection.count()} documents")
        return vector_store
    
    if not documents:
        st.warning("No documents found. Please upload PDFs to the data directory or use the file uploader.")
        return None
    
    # Create new vector store
    st.info("🔨 Building vector store... This may take a few minutes.")
    
    # Split documents
    with st.spinner("📝 Splitting documents into chunks..."):
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
            length_function=len,
            separators=["\n\n", "\n", " ", ""]
        )
        
        splits = text_splitter.split_documents(documents)
        st.info(f"📊 Split documents into {len(splits)} chunks")
    
    # Create embeddings and vector store
    with st.spinner("🧠 Creating embeddings and vector store..."):
        vector_store = Chroma.from_documents(
            documents=splits,
            embedding=embeddings,
            persist_directory=str(persist_path)
        )
    
    st.success(f"✅ Created vector store with {len(splits)} document chunks")
    return vector_store

def create_qa_chain(llm, vector_store: Chroma) -> RetrievalQA:
    """Create the RAG QA chain."""
    retriever = vector_store.as_retriever(
        search_type="similarity",
        search_kwargs={"k": 4}
    )
    
    prompt_template = """You are an expert architecture and engineering research assistant. 
    Use the following context to answer questions about AEC (Architecture, Engineering, Construction) topics.
    
    Context: {context}
    
    Question: {question}
    
    Provide a comprehensive answer based on the context. If you reference specific information, 
    mention the source file and page number when available.
    
    Answer:"""
    
    prompt = ChatPromptTemplate.from_template(prompt_template)
    
    chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=retriever,
        chain_type_kwargs={"prompt": prompt},
        return_source_documents=True
    )
    
    return chain

def format_citations(source_docs) -> str:
    """Format source documents as citations."""
    citations = []
    for doc in source_docs:
        source_file = doc.metadata.get("source_file", "Unknown")
        page_num = doc.metadata.get("page_number", "Unknown")
        citations.append(f"📄 {source_file}, p.{page_num}")
    
    if citations:
        return "\n\n**Sources:**\n" + "\n".join(citations)
    return ""

def main():
    # Load API keys from desktop data folder first
    load_api_keys()
    
    st.title(f"🏗️ {APP_TITLE}")
    st.markdown("Chat with your AEC documents using AI-powered search and generation")
    
    # Sidebar for configuration
    with st.sidebar:
        st.header("Configuration")
        
        # Show data folder info
        st.info(f"📁 Data folder: `{DATA_DIR}`")
        st.caption("PDFs will be loaded from this folder")
        
        # File uploader
        st.subheader("Upload PDFs")
        uploaded_files = st.file_uploader(
            "Choose PDF files",
            type="pdf",
            accept_multiple_files=True,
            help="Upload your AEC documents, specs, codes, or research papers"
        )
        
        # Save uploaded files
        if uploaded_files:
            for uploaded_file in uploaded_files:
                file_path = DATA_DIR / uploaded_file.name
                with open(file_path, "wb") as f:
                    f.write(uploaded_file.getbuffer())
            st.success(f"Saved {len(uploaded_files)} files to data directory")
        
        # Rebuild index button
        if st.button("🔄 Rebuild Index", help="Rebuild the vector database"):
            # Clear existing vector store
            persist_path = Path(PERSIST_DIR)
            if persist_path.exists():
                import shutil
                shutil.rmtree(persist_path)
            st.experimental_rerun()
        
        # Clear chat history button
        if st.button("🗑️ Clear Chat History", help="Clear all chat messages"):
            st.session_state.messages = []
            chat_history_file = Path("chat_history.json")
            if chat_history_file.exists():
                chat_history_file.unlink()
            st.experimental_rerun()
        
        # Force refresh button
        if st.button("🔄 Force Refresh", help="Force refresh the app and reinitialize everything"):
            # Clear all session state
            for key in list(st.session_state.keys()):
                del st.session_state[key]
            # Clear vector store directory
            persist_path = Path(PERSIST_DIR)
            if persist_path.exists():
                import shutil
                shutil.rmtree(persist_path)
            st.experimental_rerun()
        
        # Environment status
        st.subheader("LLM Backend Status")
        if os.getenv("OPENAI_API_KEY"):
            st.success("✅ OpenAI configured")
        elif all(os.getenv(k) for k in ["WATSONX_API_KEY", "WATSONX_URL", "WATSONX_PROJECT_ID", "WATSONX_MODEL_ID"]):
            st.success("✅ IBM watsonx configured")
        else:
            st.error("❌ No LLM backend configured")
            st.markdown("Set environment variables:")
            st.code("export OPENAI_API_KEY='sk-...'")
    
    # Initialize session state
    if "messages" not in st.session_state:
        st.session_state.messages = []
    if "vector_store" not in st.session_state:
        st.session_state.vector_store = None
    if "qa_chain" not in st.session_state:
        st.session_state.qa_chain = None
    
    # Load chat history from file if it exists
    chat_history_file = Path("chat_history.json")
    if chat_history_file.exists() and not st.session_state.messages:
        try:
            import json
            with open(chat_history_file, 'r') as f:
                st.session_state.messages = json.load(f)
        except:
            st.session_state.messages = []
    
    # Load documents and create vector store (with caching)
    with st.spinner("Loading documents..."):
        documents = load_documents()
    
    # Create vector store if we have documents and no vector store
    if documents and not st.session_state.get('vector_store'):
        with st.spinner("Creating vector store..."):
            vector_store = create_vector_store(documents)
        if vector_store:
            st.session_state.vector_store = vector_store
    
    # Initialize QA chain if we have vector store but no QA chain
    if st.session_state.get('vector_store') and not st.session_state.get('qa_chain'):
        with st.spinner("Initializing QA chain..."):
            llm = choose_llm()
            if llm:
                st.session_state.qa_chain = create_qa_chain(llm, st.session_state.vector_store)
                st.success("✅ QA chain initialized successfully!")
            else:
                st.error("❌ Failed to initialize LLM backend")
    
    # Chat interface
    st.header("💬 Chat with Your Documents")
    
    # Show welcome message if no chat history
    if not st.session_state.messages:
        st.markdown("👋 Welcome! I'm your AEC Research Assistant. Ask me anything about your documents!")
        st.markdown("**Try asking:**")
        st.markdown("- 'What are the main topics in these documents?'")
        st.markdown("- 'Summarize the key concepts'")
        st.markdown("- 'Explain machine learning algorithms'")
    
    # Show status message if no documents are loaded
    if not documents:
        st.warning("📁 **No documents found!** Please ensure PDF files are in the desktop data folder or upload them using the sidebar.")
    else:
        st.success(f"📚 **{len(documents)} documents loaded** from your desktop data folder")
    
    # Debug information
    with st.expander("🔧 Debug Information"):
        st.write(f"**Documents loaded:** {len(documents) if documents else 0}")
        st.write(f"**Vector store:** {'✅ Available' if st.session_state.get('vector_store') else '❌ Not available'}")
        st.write(f"**QA chain:** {'✅ Available' if st.session_state.get('qa_chain') else '❌ Not available'}")
        st.write(f"**API keys loaded:** {'✅ Yes' if os.getenv('WATSONX_API_KEY') else '❌ No'}")
    
    # Display chat history
    for message in st.session_state.messages:
        with st.chat_message(message["role"]):
            st.markdown(message["content"])
            if "sources" in message:
                st.markdown(message["sources"])
    
    # Chat input - always visible at the bottom
    st.markdown("---")
    prompt = st.chat_input("💬 Ask about your AEC documents...")
    if prompt:
        # Add user message to chat history
        st.session_state.messages.append({"role": "user", "content": prompt})
        
        # Save chat history to file
        import json
        chat_history_file = Path("chat_history.json")
        with open(chat_history_file, 'w') as f:
            json.dump(st.session_state.messages, f, indent=2)
        
        # Display user message
        with st.chat_message("user"):
            st.markdown(prompt)
        
        # Generate response
        if st.session_state.qa_chain:
            with st.chat_message("assistant"):
                with st.spinner("Thinking..."):
                    try:
                        result = st.session_state.qa_chain({"query": prompt})
                        
                        response = result["result"]
                        source_docs = result.get("source_documents", [])
                        citations = format_citations(source_docs)
                        
                        st.markdown(response)
                        if citations:
                            st.markdown(citations)
                        
                        # Add assistant response to chat history
                        st.session_state.messages.append({
                            "role": "assistant", 
                            "content": response,
                            "sources": citations
                        })
                        
                        # Save chat history to file
                        import json
                        with open(chat_history_file, 'w') as f:
                            json.dump(st.session_state.messages, f, indent=2)
                        
                    except Exception as e:
                        error_msg = f"Error generating response: {e}"
                        st.error(error_msg)
                        st.session_state.messages.append({
                            "role": "assistant", 
                            "content": error_msg
                        })
        else:
            error_msg = "No QA chain available. Please configure your LLM backend and ensure documents are loaded."
            st.error(error_msg)
            st.session_state.messages.append({
                "role": "assistant", 
                "content": error_msg
            })

if __name__ == "__main__":
    main()
