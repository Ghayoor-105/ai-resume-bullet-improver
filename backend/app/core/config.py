from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Centralized application configuration.
    Values are loaded from environment variables / a .env file.
    Never scatter os.getenv() calls throughout the codebase —
    everything reads config from this single source of truth.
    """
    app_name: str = "AI Resume Bullet Point Improver API"
    environment: str = "development"

    gemini_api_key: str
    gemini_model: str = "gemini-2.5-flash"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()