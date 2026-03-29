import { GoogleGenAI } from '@google/genai';

let _client: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI {
  if (!_client) {
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!apiKey) throw new Error('GOOGLE_GEMINI_API_KEY is not set');
    _client = new GoogleGenAI({ apiKey });
  }
  return _client;
}

export const GEMINI_MODELS = {
  flash: 'gemini-2.0-flash',
  pro:   'gemini-2.0-pro-exp',
  imagen: 'imagen-3.0-generate-002',
} as const;
