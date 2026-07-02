from fastapi import FastAPI
from app.core.config import settings

app = FastAPI(title=settings.app_name)


@app.get("/health")
def health_check():
    """
    Basic liveness check.
    Deployment platforms (Render, Azure App Service, etc.) and
    uptime monitors ping this to confirm the service is running.
    """
    return {"status": "ok", "environment": settings.environment}