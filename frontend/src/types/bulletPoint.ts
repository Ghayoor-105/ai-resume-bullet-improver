/**
 * Mirrors the backend's BulletPointRequest Pydantic schema.
 * Keep in sync with backend/app/schemas/bullet_point.py
 */
export interface BulletPointRequest {
  original_text: string;
}

/**
 * Mirrors the backend's BulletPointResponse Pydantic schema.
 * Keep in sync with backend/app/schemas/bullet_point.py
 */
export interface BulletPointResponse {
  improved_text: string;
  explanation: string;
  suggested_verbs: string[];
}