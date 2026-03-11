import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from .routes import scheme_routes

app = FastAPI(
    title="SchemeSeva API",
    description="Government Scheme Eligibility Checker API",
    version="1.0.0"
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    # Allow any localhost/127.0.0.1 dev server port (Vite can change ports).
    allow_origin_regex=r"^https?://(localhost|127\.0\.0\.1)(:\d+)?$",
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(scheme_routes.router, prefix="/api", tags=["schemes"])

# Serve React (Vite) build from backend/build
_APP_DIR = os.path.dirname(os.path.abspath(__file__))
_BUILD_DIR = os.path.normpath(os.path.join(_APP_DIR, "..", "build"))
_INDEX_HTML = os.path.join(_BUILD_DIR, "index.html")

if os.path.isdir(_BUILD_DIR):
    assets_dir = os.path.join(_BUILD_DIR, "assets")
    static_dir = os.path.join(_BUILD_DIR, "static")

    if os.path.isdir(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")
    if os.path.isdir(static_dir):
        app.mount("/static", StaticFiles(directory=static_dir), name="static")


@app.get("/")
async def serve_frontend():
    if os.path.isfile(_INDEX_HTML):
        return FileResponse(_INDEX_HTML)
    return {
        "message": "Welcome to SchemeSeva API",
        "version": "1.0.0",
        "endpoints": {
            "check_eligibility": "/api/check-eligibility",
            "get_all_schemes": "/api/schemes",
            "search_schemes": "/api/search?query=your_query",
        },
        "frontend": "not built (missing backend/build/index.html)",
    }


@app.get("/{path:path}")
async def catch_all(path: str):
    if os.path.isfile(_INDEX_HTML):
        return FileResponse(_INDEX_HTML)
    return {"detail": "Not Found"}


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
