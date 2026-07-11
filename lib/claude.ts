import Anthropic from '@anthropic-ai/sdk';
import type { Analysis } from './types';
import { validateAnalysis } from './scoring';

/**
 * Client-side Claude call — the user's API key never leaves their browser
 * except to go directly to Anthropic. There is no backend.
 */

const ANALYSIS_SCHEMA = {
  type: 'object',
  properties: {
    role: { type: 'string' },
    summary: {
      type: 'string',
      description: 'Two-sentence honest verdict on this role’s AI exposure',
    },
    tasks: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          task: { type: 'string' },
          automatability: {
            type: 'integer',
            description: '0-100: share of this task shipping AI tools can do today',
          },
          category: { type: 'string', enum: ['automate', 'copilot', 'moat'] },
          why: { type: 'string', description: 'One sentence: why this score' },
          learn: { type: 'string', description: 'One sentence: how to adapt' },
        },
        required: ['task', 'automatability', 'category', 'why', 'learn'],
        additionalProperties: false,
      },
    },
    moatAdvice: {
      type: 'string',
      description: '2-3 sentences: where this person’s durable human advantage is and how to invest in it',
    },
    learnPriorities: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          skill: { type: 'string' },
          why: { type: 'string' },
        },
        required: ['skill', 'why'],
        additionalProperties: false,
      },
    },
  },
  required: ['role', 'summary', 'tasks', 'moatAdvice', 'learnPriorities'],
  additionalProperties: false,
} as const;

const SYSTEM = `You are a blunt, well-calibrated career analyst assessing how much of a job AI can do TODAY — not lab demos, but tools people can actually buy and deploy (LLM assistants, agentic workflows, OCR+LLM pipelines, RAG chatbots, coding agents).

Calibration:
- 85-100: shipping tools do this end-to-end with light human review
- 60-84: AI does most of it, human directs and finishes
- 35-59: real speed-up, but human judgment carries the outcome
- 0-34: fundamentally human — trust, physical presence, accountability, relationships

Be honest, not alarmist and not comforting. Score each task independently. The "why" must name the mechanism (what tool/technique does it), not vibes. The "learn" line must be concrete and actionable for someone in India's job market. Return 3 learnPriorities ordered by leverage.`;

export async function analyzeJob(
  apiKey: string,
  jobTitle: string,
  tasks: string[]
): Promise<Analysis> {
  const client = new Anthropic({
    apiKey,
    dangerouslyAllowBrowser: true, // BYO-key static app: the key is the user's own, entered locally
  });

  const response = await client.messages.create({
    model: 'claude-opus-4-8',
    max_tokens: 8000,
    system: SYSTEM,
    output_config: {
      format: {
        type: 'json_schema',
        schema: ANALYSIS_SCHEMA as unknown as Record<string, unknown>,
      },
    },
    messages: [
      {
        role: 'user',
        content: `Job title: ${jobTitle}\n\nWeekly tasks:\n${tasks.map((t) => `- ${t}`).join('\n')}`,
      },
    ],
  });

  if (response.stop_reason === 'refusal') {
    throw new Error('The model declined to analyze this input. Try rephrasing your tasks.');
  }

  const text = response.content.find((b) => b.type === 'text');
  if (!text || text.type !== 'text') throw new Error('Empty response from the API.');

  const parsed = JSON.parse(text.text);
  if (!validateAnalysis(parsed)) throw new Error('The analysis came back malformed. Please try again.');
  return parsed;
}

export function friendlyApiError(e: unknown): string {
  if (e instanceof Anthropic.AuthenticationError) {
    return 'That API key was rejected. Check it at console.anthropic.com → API keys.';
  }
  if (e instanceof Anthropic.RateLimitError) {
    return 'Rate limited — wait a minute and try again.';
  }
  if (e instanceof Anthropic.APIConnectionError) {
    return 'Could not reach the Anthropic API. Check your connection.';
  }
  if (e instanceof Anthropic.APIError) {
    return `API error: ${e.message}`;
  }
  return e instanceof Error ? e.message : 'Something went wrong.';
}
