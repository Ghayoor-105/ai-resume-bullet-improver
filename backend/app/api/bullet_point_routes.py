import logging

from fastapi import APIRouter, HTTPException

from app.schemas.bullet_point import BulletPointRequest, BulletPointResponse
from app.services.gemini_service import (
    improve_bullet_point,
    RateLimitError,
    AIServiceUnavailableError,
)

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/bullet-point", tags=["Bullet Point"])


@router.post("/improve", response_model=BulletPointResponse)
def improve_bullet_point_endpoint(payload: BulletPointRequest) -> BulletPointResponse:
    """
    Accepts a raw resume bullet point and returns an AI-improved version,
    along with an explanation and suggested action verbs.
    """
    try:
        return improve_bullet_point(payload.original_text)
    except RateLimitError as e:
        raise HTTPException(
            status_code=429,
            detail="This demo has reached its daily AI request limit. Please try again tomorrow.",
        ) from e
    except AIServiceUnavailableError as e:
        raise HTTPException(
            status_code=503,
            detail="The AI service is temporarily overloaded. Please try again in a moment.",
        ) from e
    except ValueError as e:
        logger.error("AI response validation failed: %s", e)
        raise HTTPException(
            status_code=502,
            detail="The AI service returned an unexpected response. Please try again.",
        ) from e
    except Exception as e:
        logger.exception("Unexpected error while improving bullet point")
        raise HTTPException(
            status_code=500,
            detail="Something went wrong while processing your request.",
        ) from e
