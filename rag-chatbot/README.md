# RAG Chatbot for Architecture & Engineering Research Questions

A Streamlit application that lets you chat with your own PDFs (AEC specs, codes, papers) using Retrieval-Augmented Generation (RAG).

## Features

- 🏗️ **AEC-Focused**: Specialized for Architecture, Engineering, and Construction documents
- 💬 **Chat Interface**: Interactive chat-style UI with conversation history
- 📄 **PDF Processing**: Upload multiple PDFs and build a Chroma vector database
- 🔍 **Smart Retrieval**: RAG using LangChain for accurate, context-aware responses
- 📚 **Citations**: Automatic citations with filenames and page numbers
- 🔌 **Flexible LLM**: Supports both OpenAI and IBM watsonx backends

## Quickstart

### 1. Create Virtual Environment

**macOS/Linux:**
```bash
python3 -m venv .venv && source .venv/bin/activate
```

**Windows (PowerShell):**
```powershell
py -m venv .venv; .venv\Scripts\Activate.ps1
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

**Optional LLM backends (install at least one):**

For OpenAI:
```bash
pip install -U openai langchain-openai
```

For IBM watsonx:
```bash
pip install -U langchain-ibm ibm-watsonx-ai
```

### 3. Set Environment Variables

Choose one of the following options:

#### Option A — OpenAI (Recommended for simplest setup)
```bash
export OPENAI_API_KEY="sk-..."
```

#### Option B — IBM watsonx
```bash
export WATSONX_API_KEY="..."
export WATSONX_URL="https://us-south.ml.cloud.ibm.com"  # or your region URL
export WATSONX_PROJECT_ID="proj-..."
export WATSONX_MODEL_ID="meta-llama/llama-3-70b-instruct"  # or your preferred model
```

### 4. Add Your PDFs

Place your AEC documents (PDFs) in the `./data` directory, or upload them through the web interface.

### 5. Run the Application

```bash
streamlit run app.py
```

The app will open in your browser at `http://localhost:8501`.

## Usage

1. **Upload Documents**: Use the sidebar file uploader to add PDFs, or place them directly in the `./data` folder
2. **Wait for Processing**: The first run builds a local Chroma index under `./.chroma`
3. **Start Chatting**: Ask questions about your documents in the chat interface
4. **View Sources**: Each response includes citations with filenames and page numbers
5. **Rebuild Index**: If you add new documents, click "Rebuild Index" in the sidebar

## File Structure

```
rag-chatbot/
├── app.py              # Main Streamlit application
├── requirements.txt    # Python dependencies
├── README.md          # This file
├── data/              # Directory for your PDF files
│   └── .gitkeep
└── .chroma/           # Vector database (created automatically)
```

## Notes

- The first run will build a local Chroma index. Subsequent runs are fast.
- If you change PDFs, click "Rebuild Index" to refresh the vector store.
- The app uses `sentence-transformers/all-MiniLM-L6-v2` for embeddings by default.
- Documents are split into 1000-character chunks with 200-character overlap for optimal retrieval.

## Troubleshooting

### Common Issues

1. **"No LLM backend configured"**: Make sure you've set the appropriate environment variables for your chosen LLM provider.

2. **Import errors**: Ensure you've installed the correct packages for your LLM backend:
   - OpenAI: `pip install openai langchain-openai`
   - IBM watsonx: `pip install langchain-ibm ibm-watsonx-ai`

3. **Slow first run**: The initial embedding generation can take several minutes depending on your document size and hardware.

4. **Memory issues**: For large document collections, consider using a more powerful machine or reducing the chunk size in the code.

### Environment Variables

You can also create a `.env` file in the project directory:
```
OPENAI_API_KEY=sk-...
# OR
WATSONX_API_KEY=...
WATSONX_URL=https://us-south.ml.cloud.ibm.com
WATSONX_PROJECT_ID=proj-...
WATSONX_MODEL_ID=meta-llama/llama-3-70b-instruct
```

## License

This project is open source and available under the MIT License.
