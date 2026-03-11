"""
Simple test script to verify the API is working
Run this from the backend directory: python test_api.py
"""
import requests
import json

BASE_URL = "http://localhost:8000"

def test_health():
    """Test the health endpoint"""
    print("Testing health endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/health")
        print(f"Status: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        return response.status_code == 200
    except Exception as e:
        print(f"Error: {e}")
        return False

def test_check_eligibility():
    """Test the eligibility check endpoint"""
    print("\nTesting eligibility check endpoint...")
    test_data = {
        "age": 25,
        "income": 200000,
        "occupation": "student",
        "gender": "male",
        "state": "Maharashtra"
    }
    try:
        response = requests.post(
            f"{BASE_URL}/api/check-eligibility",
            json=test_data
        )
        print(f"Status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Total eligible schemes: {data.get('total_count', 0)}")
            print(f"First 3 schemes:")
            for scheme in data.get('eligible_schemes', [])[:3]:
                print(f"  - {scheme.get('scheme_name')}")
        else:
            print(f"Error: {response.text}")
        return response.status_code == 200
    except Exception as e:
        print(f"Error: {e}")
        return False

def test_get_schemes():
    """Test getting all schemes"""
    print("\nTesting get all schemes endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/api/schemes")
        print(f"Status: {response.status_code}")
        if response.status_code == 200:
            schemes = response.json()
            print(f"Total schemes: {len(schemes)}")
        else:
            print(f"Error: {response.text}")
        return response.status_code == 200
    except Exception as e:
        print(f"Error: {e}")
        return False

if __name__ == "__main__":
    print("=" * 50)
    print("API Test Script")
    print("=" * 50)
    print("\nMake sure the backend server is running on http://localhost:8000")
    print("Start it with: uvicorn app.main:app --reload\n")
    
    health_ok = test_health()
    if not health_ok:
        print("\n❌ Health check failed. Make sure the backend is running!")
        exit(1)
    
    schemes_ok = test_get_schemes()
    eligibility_ok = test_check_eligibility()
    
    print("\n" + "=" * 50)
    if health_ok and schemes_ok and eligibility_ok:
        print("✅ All tests passed!")
    else:
        print("❌ Some tests failed. Check the errors above.")
