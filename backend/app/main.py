from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import scheme_routes

app = FastAPI(
    title="SchemeSeva API",
    description="Government Scheme Eligibility Checker API",
    version="1.0.0"
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(scheme_routes.router, prefix="/api", tags=["schemes"])


@app.get("/")
async def root():
    return {
        "message": "Welcome to SchemeSeva API",
        "version": "1.0.0",
        "endpoints": {
            "check_eligibility": "/api/check-eligibility",
            "get_all_schemes": "/api/schemes",
            "search_schemes": "/api/search?query=your_query"
        }
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    try:
        from .services.eligibility_engine import load_schemes
        schemes = load_schemes()
        return {
            "status": "healthy",
            "schemes_loaded": len(schemes),
            "data_file": "accessible"
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "error": str(e)
        }
