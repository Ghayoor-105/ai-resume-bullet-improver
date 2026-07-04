import json
import logging

from google import genai

from app.core.config import settings
from app.schemas.bullet_point import BulletPointResponse

logger = logging.getLogger(__name__)

_client = genai.Client(api_key=settings.gemini_api_key)

SYSTEM_INSTRUCTIONS = """\
You are an expert resume writing coach. You improve weak resume bullet \
points into strong, professional, ATS-friendly achievement statements.

Rules you must follow:
1. Do NOT invent specific numbers, metrics, or facts (e.g. team size, \
percentages, dollar amounts) that are not present in the original text.
2. Preserve and build on every piece of concrete information already \
present in the original text (what was done, for whom, using what tools \
or context) — do not remove or generalize away real details the user \
already gave you. Your job is to elevate the language, not shorten the \
content.
3. Use strong, professional action verbs (e.g. "Led", "Architected", \
"Streamlined") instead of weak, passive phrasing (e.g. "Responsible for", \
"Helped with").
4. If the original text is vague or lacks detail (e.g. "managed a team" \
with no further context), improve the verb and phrasing, and you may \
add a plausible general outcome phrase only if it uses non-specific, \
non-fabricated language (e.g. "to meet project goals" or "to support \
business objectives") — never invent specific numbers or named outcomes.
5. Keep the improved bullet point to one sentence, ideally 12-25 words — \
detailed enough to feel substantive, not just a trimmed fragment.
6. Respond ONLY with valid JSON matching this exact structure, no extra \
commentary, no markdown code fences:
{
  "improved_text": "string",
  "explanation": "string, 1-2 sentences explaining why this version is stronger",
  "suggested_verbs": ["string", "string", "string"]
}
"""


def improve_bullet_point(original_text: str) -> BulletPointResponse:
    """
    Sends the user's resume bullet point to Gemini and returns a
    structured, validated improvement.

    Raises:
        ValueError: if Gemini's response isn't valid JSON matching our schema.
        Exception: for underlying API/network failures (handled by caller).
    """
    prompt = f'{SYSTEM_INSTRUCTIONS}\n\nOriginal bullet point:\n"{original_text}"'

    logger.info("Sending bullet point improvement request to Gemini")

    response = _client.models.generate_content(
        model=settings.gemini_model,
        contents=prompt,
    )

    raw_text = response.text.strip()
    cleaned_text = _strip_markdown_fences(raw_text)

    try:
        data = json.loads(cleaned_text)
        return BulletPointResponse(**data)
    except (json.JSONDecodeError, TypeError) as e:
        logger.error("Failed to parse Gemini response as valid JSON: %s", raw_text)
        raise ValueError("AI response was not in the expected format") from e


def _strip_markdown_fences(text: str) -> str:
    """
    Gemini sometimes wraps JSON output in markdown code fences
    (```json ... ```) despite instructions not to. This defensively
    strips them so json.loads() doesn't choke on non-JSON characters.
    """
    if text.startswith("```"):
        lines = text.split("\n")
        lines = lines[1:]  # drop the opening ``` or ```json line
        if lines and lines[-1].strip() == "```":
            lines = lines[:-1]  # drop the closing ``` line
        text = "\n".join(lines)
    return text.strip()