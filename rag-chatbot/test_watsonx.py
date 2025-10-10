#!/usr/bin/env python3
"""
Test script for IBM watsonx configuration
Run this to verify your credentials are working
"""

import os
from ibm_watsonx_ai.foundation_models import Model
from ibm_watsonx_ai.metanames import GenTextParamsMetaNames

def test_watsonx():
    """Test IBM watsonx connection and model"""
    
    # Check environment variables
    required_vars = ["WATSONX_API_KEY", "WATSONX_URL", "WATSONX_PROJECT_ID", "WATSONX_MODEL_ID"]
    missing_vars = [var for var in required_vars if not os.getenv(var)]
    
    if missing_vars:
        print("❌ Missing environment variables:")
        for var in missing_vars:
            print(f"   - {var}")
        print("\nSet them with:")
        print("export WATSONX_API_KEY='your-key'")
        print("export WATSONX_URL='https://us-south.ml.cloud.ibm.com'")
        print("export WATSONX_PROJECT_ID='59727236-990a-49f1-98e8-e92a178bdca0'")
        print("export WATSONX_MODEL_ID='meta-llama/llama-3-70b-instruct'")
        return False
    
    print("✅ All environment variables found")
    
    try:
        # Create model instance
        print("🔗 Connecting to IBM watsonx...")
        model = Model(
            model_id=os.getenv("WATSONX_MODEL_ID"),
            credentials={
                "url": os.getenv("WATSONX_URL"),
                "apikey": os.getenv("WATSONX_API_KEY")
            },
            project_id=os.getenv("WATSONX_PROJECT_ID")
        )
        
        # Test generation
        print("🤖 Testing model generation...")
        response = model.generate_text(
            prompt="What is the capital of France?",
            params={
                GenTextParamsMetaNames.TEMPERATURE: 0.1,
                GenTextParamsMetaNames.MAX_NEW_TOKENS: 50
            }
        )
        
        print("✅ Success! Model response:")
        print(f"   {response}")
        print("\n🎉 IBM watsonx is configured correctly!")
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        print("\nTroubleshooting:")
        print("1. Check your API key is correct")
        print("2. Verify the URL matches your region")
        print("3. Ensure your project ID is correct")
        print("4. Check if the model ID is available in your region")
        return False

if __name__ == "__main__":
    test_watsonx()
