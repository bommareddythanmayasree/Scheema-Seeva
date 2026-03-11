from fastapi import APIRouter, HTTPException, Query
from typing import List
from ..models.user_model import UserEligibilityRequest, Scheme, EligibilityResponse
from ..services.eligibility_engine import check_eligibility, search_schemes, get_all_schemes

router = APIRouter()


@router.post("/check-eligibility", response_model=EligibilityResponse)
async def check_user_eligibility(user: UserEligibilityRequest):
    """
    Check which schemes a user is eligible for based on their profile
    """
    try:
        eligible_schemes = check_eligibility(user)
        return EligibilityResponse(
            eligible_schemes=eligible_schemes,
            total_count=len(eligible_schemes)
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error checking eligibility: {str(e)}")


@router.get("/schemes", response_model=List[Scheme])
async def get_schemes():
    """
    Get all available schemes
    """
    try:
        schemes = get_all_schemes()
        return schemes
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching schemes: {str(e)}")


@router.get("/search", response_model=List[Scheme])
async def search_schemes_endpoint(query: str = Query(..., description="Search query for scheme name or category")):
    """
    Search schemes by name or category
    """
    try:
        if not query or len(query.strip()) == 0:
            return []
        
        matching_schemes = search_schemes(query.strip())
        return matching_schemes
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error searching schemes: {str(e)}")
