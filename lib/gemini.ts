import type { Analysis } from './types';
import { validateAnalysis } from './scoring';

/**
 * Client-side Gemini call — the user's API key never leaves their browser
 * except to go directly to Google. There is no backend.
 * Gemini's free tier makes this genuinely free for most users.
 */

const MODEL = 'gemini-2.5-flash';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

const RESPONSE_SCHEMA = {
  type: 'OBJECT',
  properties: {
    role: { type: 'STRING' },
    summary: { type: 'STRING', description: 'Two-sentence honest verdict on this role’s AI exposure' },
    tasks: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          task: { type: 'STRING' },
          automatability: { type: 'INTEGER', description: '0-100: share of this task shipping AI tools can do today' },
          category: { type: 'STRING', enum: ['automate', 'copilot', 'moat'] },
          why: { type: 'STRING', description: 'One sentence: why this score' },
          learn: { type: 'STRING', description: 'One sentence: how to adapt' },
        },
        required: ['task', 'automatability', 'category', 'why', 'learn'],
      },
    },
    moatAdvice: {
      type: 'STRING',
      description: '2-3 sentences: where this person’s durable human advantage is and how to invest in it',
    },
    learnPriorities: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          skill: { type: 'STRING' },
          why: { type: 'STRING' },
        },
        required: ['skill', 'why'],
      },
    },
  },
  required: ['role', 'summary', 'tasks', 'moatAdvice', 'learnPriorities'],
};

const SYSTEM = `You are a blunt, well-calibrated career analyst assessing how much of a job AI can do TODAY — not lab demos, but tools people can actually buy and deploy (LLM assistants, agentic workflows, OCR+LLM pipelines, RAG chatbots, coding agents).

Calibration:
- 85-100: shipping tools do this end-to-end with light human review
- 60-84: AI does most of it, human directs and finishes
- 35-59: real speed-up, but human judgment carries the outcome
- 0-34: fundamentally human — trust, physical presence, accountability, relationships

Be honest, not alarmist and not comforting. Score each task independently. The "why" must name the mechanism (what tool/technique does it), not vibes. The "learn" line must be concrete and actionable for someone in India's job market. Return exactly 3 learnPriorities ordered by leverage.`;

export async function analyzeJob(apiKey: string, jobTitle: string, tasks: string[]): Promise<Analysis> {
  const res = await fetch(`${ENDPOINT}?key=${encodeURIComponent(apiKey.trim())}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM }] },
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `Job title: ${jobTitle}\n\nWeekly tasks:\n${tasks.map((t) => `- ${t}`).join('\n')}`,
            },
          ],
        },
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: RESPONSE_SCHEMA,
        maxOutputTokens: 8000,
      },
    }),
  });

  if (!res.ok) {
    let detail = '';
    try {
      const err = await res.json();
      detail = err?.error?.message ?? '';
    } catch {}
    if (res.status === 400 && /api key/i.test(detail)) {
      throw new Error('That API key was rejected. Get a free one at aistudio.google.com/apikey.');
    }
    if (res.status === 429) {
      throw new Error('Rate limited — the free tier allows a few requests per minute. Wait a moment and try again.');
    }
    throw new Error(detail || `The Gemini API returned ${res.status}. Try again in a moment.`);
  }

  const data = await res.json();
  const candidate = data?.candidates?.[0];
  if (candidate?.finishReason === 'SAFETY') {
    throw new Error('The model declined to analyze this input. Try rephrasing your tasks.');
  }
  const text: string | undefined = candidate?.content?.parts?.map((p: { text?: string }) => p.text ?? '').join('');
  if (!text) throw new Error('Empty response from the API. Try again.');

  const parsed = JSON.parse(text);
  if (!validateAnalysis(parsed)) throw new Error('The analysis came back malformed. Please try again.');
  return parsed;
}

export function friendlyApiError(e: unknown): string {
  if (e instanceof TypeError) return 'Could not reach the Gemini API. Check your connection.';
  return e instanceof Error ? e.message : 'Something went wrong.';
}
