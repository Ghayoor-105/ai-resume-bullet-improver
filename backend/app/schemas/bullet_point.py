from pydantic import BaseModel, Field, field_validator


class BulletPointRequest(BaseModel):
    """
    Incoming request payload: the raw resume bullet point
    the user wants improved.
    """
    original_text: str = Field(
        ...,
        min_length=3,
        max_length=500,
        description="The original, unimproved resume bullet point.",
        examples=["Responsible for managing a team"],
    )

    @field_validator("original_text")
    @classmethod
    def must_contain_real_content(cls, value: str) -> str:
        """
        Rejects input that is only whitespace, or that becomes too short
        once whitespace is stripped. Prevents wasting an AI API call on
        input with no meaningful content.
        """
        stripped = value.strip()
        if len(stripped) < 3:
            raise ValueError(
                "original_text must contain at least 3 non-whitespace characters"
            )
        return stripped


class BulletPointResponse(BaseModel):
    """
    Outgoing response payload: the AI-improved bullet point,
    plus supporting context so the user understands *why*
    it's better and how to write stronger ones themselves.
    """
    improved_text: str = Field(
        ...,
        description="The rewritten, ATS-friendly, achievement-oriented bullet point.",
    )
    explanation: str = Field(
        ...,
        description="A brief explanation of why the improved version is stronger.",
    )
    suggested_verbs: list[str] = Field(
        ...,
        description="Alternative strong action verbs the user could use.",
    )
