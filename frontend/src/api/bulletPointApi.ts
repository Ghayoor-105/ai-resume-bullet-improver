import axios from "axios";
import type { BulletPointRequest, BulletPointResponse } from "../types/bulletPoint";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

/**
 * Calls the backend to improve a resume bullet point.
 * Throws on network errors or non-2xx responses — callers
 * are responsible for catching and displaying errors to the user.
 */
export async function improveBulletPoint(
  originalText: string
): Promise<BulletPointResponse> {
  const payload: BulletPointRequest = { original_text: originalText };

  const response = await axios.post<BulletPointResponse>(
    `${API_BASE_URL}/api/bullet-point/improve`,
    payload
  );

  return response.data;
}