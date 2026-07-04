from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.bullet_point_routes import router as bullet_point_router

app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(bullet_point_router)


@app.get("/health")
def health_check():
    """
    Basic liveness check.
    Deployment platforms (Render, Azure App Service, etc.) and
    uptime monitors ping this to confirm the service is running.
    """
    return {"status": "ok", "environment": settings.environment}