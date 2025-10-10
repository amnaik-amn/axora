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

# LangChain core
from langchain.prompts import ChatPromptTemplate
from langchain.schema import HumanMessage, SystemMessage
from langchain.text_splitter import RecursiveCharacterTextSplitter

# Loaders & Vector store
from langchain_community.vectorstores import Chroma
from langchain_community.document_loaders import PyPDFLoader, TextLoader
from langchain_community.embeddings import HuggingFaceEmbeddings

# Chains
from langchain.chains import RetrievalQA

# Optional LLM backends (we import lazily in choose_llm())

APP_TITLE = "AEC Research Chatbot (RAG)"
DATA_DIR = Path("data")
PERSIST_DIR = ".chroma"
DEFAULT_EMBED_MODEL = "sentence-transformers/all-MiniLM-L6-v2"

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
            
            class WatsonxLLMWrapper:
                def __init__(self):
                    self.api_key = os.getenv("WATSONX_API_KEY")
                    self.url = os.getenv("WATSONX_URL")
                    self.project_id = os.getenv("WATSONX_PROJECT_ID")
                    self.model_id = os.getenv("WATSONX_MODEL_ID")
                    
                def invoke(self, messages):
                    # Convert messages to prompt
                    if isinstance(messages, list):
                        text = "\n".join([getattr(msg, 'content', str(msg)) for msg in messages])
                    else:
                        text = str(messages)
                    
                    # IBM watsonx API call
                    headers = {
                        "Authorization": f"Bearer {self.api_key}",
                        "Content-Type": "application/json"
                    }
                    
                    payload = {
                        "model_id": self.model_id,
                        "input": text,
                        "parameters": {
                            "temperature": 0.1,
                            "max_new_tokens": 1024
                        },
                        "project_id": self.project_id
                    }
                    
                    try:
                        response = requests.post(
                            f"{self.url}/ml/v1/text/generation?version=2023-05-28",
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
                
                def __call__(self, messages):
                    return self.invoke(messages)
            
            return WatsonxLLMWrapper()
        except ImportError:
            st.error("IBM watsonx backend requested but `requests` not available")
            return None
    else:
        st.error("No LLM backend configured. Set OPENAI_API_KEY or WATSONX_* environment variables.")
        return None

def load_documents() -> List:
    """Load all PDFs from the data directory."""
    if not DATA_DIR.exists():
        DATA_DIR.mkdir(exist_ok=True)
        return []
    
    documents = []
    for file_path in DATA_DIR.glob("*.pdf"):
        try:
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
    
    return documents

def create_vector_store(documents: List, force_rebuild: bool = False) -> Chroma:
    """Create or load Chroma vector store."""
    persist_path = Path(PERSIST_DIR)
    
    if persist_path.exists() and not force_rebuild and len(documents) > 0:
        # Load existing vector store
        embeddings = HuggingFaceEmbeddings(model_name=DEFAULT_EMBED_MODEL)
        vector_store = Chroma(
            persist_directory=str(persist_path),
            embedding_function=embeddings
        )
        st.success(f"Loaded existing vector store with {vector_store._collection.count()} documents")
        return vector_store
    
    if not documents:
        st.warning("No documents found. Please upload PDFs to the data directory or use the file uploader.")
        return None
    
    # Create new vector store
    st.info("Building vector store... This may take a few minutes.")
    
    # Split documents
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len,
        separators=["\n\n", "\n", " ", ""]
    )
    
    splits = text_splitter.split_documents(documents)
    st.info(f"Split documents into {len(splits)} chunks")
    
    # Create embeddings and vector store
    embeddings = HuggingFaceEmbeddings(model_name=DEFAULT_EMBED_MODEL)
    
    vector_store = Chroma.from_documents(
        documents=splits,
        embedding=embeddings,
        persist_directory=str(persist_path)
    )
    
    st.success(f"Created vector store with {len(splits)} document chunks")
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
    st.title(f"🏗️ {APP_TITLE}")
    st.markdown("Chat with your AEC documents using AI-powered search and generation")
    
    # Sidebar for configuration
    with st.sidebar:
        st.header("Configuration")
        
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
    
    # Load documents and create vector store
    documents = load_documents()
    
    if documents and st.session_state.vector_store is None:
        vector_store = create_vector_store(documents)
        if vector_store:
            st.session_state.vector_store = vector_store
            
            # Initialize LLM and QA chain
            llm = choose_llm()
            if llm:
                st.session_state.qa_chain = create_qa_chain(llm, vector_store)
    
    # Chat interface
    st.header("💬 Chat")
    
    # Display chat history
    for message in st.session_state.messages:
        with st.chat_message(message["role"]):
            st.markdown(message["content"])
            if "sources" in message:
                st.markdown(message["sources"])
    
    # Chat input
    if prompt := st.chat_input("Ask about your AEC documents..."):
        # Add user message to chat history
        st.session_state.messages.append({"role": "user", "content": prompt})
        
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
