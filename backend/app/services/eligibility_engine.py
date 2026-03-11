import json
import os
from typing import List, Dict, Any
from ..models.user_model import Scheme, UserEligibilityRequest


def load_schemes() -> List[Dict[str, Any]]:
    """Load schemes from JSON file"""
    try:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        # Go up two levels from services/ to backend/, then into data/
        data_path = os.path.join(current_dir, "..", "..", "data", "schemes.json")
        # Normalize the path to handle any path issues
        data_path = os.path.normpath(data_path)
        
        if not os.path.exists(data_path):
            raise FileNotFoundError(f"Schemes data file not found at: {data_path}")
        
        with open(data_path, "r", encoding="utf-8") as f:
            schemes = json.load(f)
        
        if not isinstance(schemes, list):
            raise ValueError("Schemes data must be a list")
        
        return schemes
    except FileNotFoundError as e:
        raise FileNotFoundError(f"Could not find schemes.json file: {str(e)}")
    except json.JSONDecodeError as e:
        raise ValueError(f"Invalid JSON in schemes.json: {str(e)}")
    except Exception as e:
        raise Exception(f"Error loading schemes: {str(e)}")


def check_eligibility(user: UserEligibilityRequest) -> List[Scheme]:
    """
    Check user eligibility for schemes based on rules:
    - user age >= scheme min_age
    - user age <= scheme max_age (if max_age exists)
    - user income <= scheme max_income
    - occupation matches (scheme occupation contains user occupation or "all")
    - gender matches (scheme gender == user gender or "all")
    - state matches (scheme state == user state or "all")
    """
    schemes_data = load_schemes()
    eligible_schemes = []
    
    for scheme_data in schemes_data:
        # Age check
        if user.age < scheme_data.get("min_age", 0):
            continue
        
        # Max age check (if exists)
        if "max_age" in scheme_data and scheme_data["max_age"] is not None:
            if user.age > scheme_data["max_age"]:
                continue
        
        # Income check
        if user.income > scheme_data.get("max_income", float("inf")):
            continue
        
        # Occupation check
        scheme_occupations = scheme_data.get("occupation", [])
        if "all" not in scheme_occupations:
            # Normalize occupation for matching
            user_occupation_lower = user.occupation.lower()
            scheme_occupations_lower = [occ.lower() for occ in scheme_occupations]
            
            # Check if user occupation matches any scheme occupation
            if user_occupation_lower not in scheme_occupations_lower:
                # Also check for partial matches (e.g., "self-employed" matches "self-employed")
                if not any(user_occupation_lower in occ or occ in user_occupation_lower 
                          for occ in scheme_occupations_lower):
                    continue
        
        # Gender check
        scheme_gender = scheme_data.get("gender", "all").lower()
        if scheme_gender != "all" and scheme_gender != user.gender.lower():
            continue
        
        # State check
        scheme_state = scheme_data.get("state", "all").lower()
        if scheme_state != "all" and scheme_state != user.state.lower():
            continue
        
        # All checks passed - user is eligible
        try:
            eligible_schemes.append(Scheme(**scheme_data))
        except Exception as e:
            # Skip schemes that fail validation
            print(f"Error validating scheme {scheme_data.get('id', 'unknown')}: {str(e)}")
            continue
    
    return eligible_schemes


def search_schemes(query: str) -> List[Scheme]:
    """Search schemes by name or category"""
    schemes_data = load_schemes()
    query_lower = query.lower()
    matching_schemes = []
    
    for scheme_data in schemes_data:
        scheme_name = scheme_data.get("scheme_name", "").lower()
        category = scheme_data.get("category", "").lower()
        benefit = scheme_data.get("benefit", "").lower()
        
        if (query_lower in scheme_name or 
            query_lower in category or 
            query_lower in benefit):
            matching_schemes.append(Scheme(**scheme_data))
    
    return matching_schemes


def get_all_schemes() -> List[Scheme]:
    """Get all schemes"""
    schemes_data = load_schemes()
    schemes = []
    for scheme_data in schemes_data:
        try:
            schemes.append(Scheme(**scheme_data))
        except Exception as e:
            # Log the error but continue processing other schemes
            print(f"Error parsing scheme {scheme_data.get('id', 'unknown')}: {str(e)}")
            continue
    return schemes
