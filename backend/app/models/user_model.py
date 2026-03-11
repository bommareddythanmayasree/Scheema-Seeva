from pydantic import BaseModel, Field
from typing import List, Optional


class UserEligibilityRequest(BaseModel):
    age: int = Field(..., ge=0, le=120, description="User age")
    income: int = Field(..., ge=0, description="Annual income in rupees")
    occupation: str = Field(..., description="User occupation")
    gender: str = Field(..., description="User gender")
    state: str = Field(..., description="User state")


class Scheme(BaseModel):
    id: int
    scheme_name: str
    category: str
    occupation: List[str]
    min_age: int
    max_age: Optional[int] = None
    max_income: int
    gender: str
    state: str
    benefit: str
    apply_link: str

    class Config:
        json_schema_extra = {
            "example": {
                "id": 1,
                "scheme_name": "PM Kisan Samman Nidhi",
                "category": "agriculture",
                "occupation": ["farmer"],
                "min_age": 18,
                "max_age": None,
                "max_income": 600000,
                "gender": "all",
                "state": "all",
                "benefit": "₹6000 annual support for farmers",
                "apply_link": "https://pmkisan.gov.in"
            }
        }


class EligibilityResponse(BaseModel):
    eligible_schemes: List[Scheme]
    total_count: int
