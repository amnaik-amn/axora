#!/usr/bin/env python3
"""
Test script to verify IBM watsonx API authentication
"""
import os
import requests
import json
from dotenv import load_dotenv

# Load API keys from desktop data folder
DATA_DIR = os.path.expanduser("~/Desktop/data:")
api_keys_file = os.path.join(DATA_DIR, "api_keys.env")
load_dotenv(api_keys_file)

def test_watsonx_api():
    """Test IBM watsonx API connection"""
    
    api_key = os.getenv("WATSONX_API_KEY")
    url = os.getenv("WATSONX_URL")
    project_id = os.getenv("WATSONX_PROJECT_ID")
    model_id = os.getenv("WATSONX_MODEL_ID")
    
    print(f"API Key: {api_key[:20]}..." if api_key else "No API key")
    print(f"URL: {url}")
    print(f"Project ID: {project_id}")
    print(f"Model ID: {model_id}")
    
    # Test different authentication formats
    test_payload = {
        "model_id": model_id,
        "input": "Hello, this is a test message.",
        "parameters": {
            "temperature": 0.1,
            "max_new_tokens": 50
        },
        "project_id": project_id
    }
    
    # Test 1: Bearer token format
    print("\n=== Test 1: Bearer Token Format ===")
    headers1 = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    try:
        response1 = requests.post(
            f"{url}/ml/v1/text/generation?version=2024-11-20",
            headers=headers1,
            json=test_payload,
            timeout=30
        )
        print(f"Status: {response1.status_code}")
        print(f"Response: {response1.text[:200]}...")
    except Exception as e:
        print(f"Error: {e}")
    
    # Test 2: API Key format (no Bearer)
    print("\n=== Test 2: API Key Format (no Bearer) ===")
    headers2 = {
        "Authorization": api_key,
        "Content-Type": "application/json"
    }
    
    try:
        response2 = requests.post(
            f"{url}/ml/v1/text/generation?version=2024-11-20",
            headers=headers2,
            json=test_payload,
            timeout=30
        )
        print(f"Status: {response2.status_code}")
        print(f"Response: {response2.text[:200]}...")
    except Exception as e:
        print(f"Error: {e}")
    
    # Test 3: Get access token first
    print("\n=== Test 3: Get Access Token First ===")
    try:
        # Try to get an access token using the API key
        auth_payload = {
            "apikey": api_key
        }
        auth_response = requests.post(
            "https://iam.cloud.ibm.com/identity/token",
            headers={"Content-Type": "application/x-www-form-urlencoded"},
            data=f"grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey={api_key}",
            timeout=30
        )
        print(f"Auth Status: {auth_response.status_code}")
        if auth_response.status_code == 200:
            auth_data = auth_response.json()
            access_token = auth_data.get("access_token")
            print(f"Got access token: {access_token[:20]}..." if access_token else "No access token")
            
            # Now try with the access token
            headers3 = {
                "Authorization": f"Bearer {access_token}",
                "Content-Type": "application/json"
            }
            
            response3 = requests.post(
                f"{url}/ml/v1/text/generation?version=2024-11-20",
                headers=headers3,
                json=test_payload,
                timeout=30
            )
            print(f"API Status: {response3.status_code}")
            print(f"API Response: {response3.text[:200]}...")
        else:
            print(f"Auth Error: {auth_response.text}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_watsonx_api()
