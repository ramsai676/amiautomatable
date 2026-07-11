import type { Analysis, Category, TaskAnalysis } from './types';

/** Overall exposure: mean automatability across tasks, 0–100. */
export function exposureScore(tasks: TaskAnalysis[]): number {
  if (tasks.length === 0) return 0;
  return Math.round(tasks.reduce((s, t) => s + t.automatability, 0) / tasks.length);
}

export interface Verdict {
  band: 'low' | 'moderate' | 'high' | 'critical';
  title: string;
  line: string;
}

export function verdict(score: number): Verdict {
  if (score >= 75)
    return {
      band: 'critical',
      title: 'Critical exposure',
      line: 'Most of this role is automatable today. The version of this job that survives looks very different — start repositioning now.',
    };
  if (score >= 55)
    return {
      band: 'high',
      title: 'High exposure',
      line: 'More than half of this work can already be done by AI. The people who direct the AI will replace the people who don’t.',
    };
  if (score >= 35)
    return {
      band: 'moderate',
      title: 'Moderate exposure',
      line: 'A meaningful slice of this role is automatable — treat that slice as freed-up time and reinvest it in the human parts.',
    };
  return {
    band: 'low',
    title: 'Low exposure',
    line: 'The core of this role still depends on things AI can’t do. Use AI on the edges and deepen the moat.',
  };
}

export function categoryFromScore(score: number): Category {
  if (score >= 70) return 'automate';
  if (score >= 40) return 'copilot';
  return 'moat';
}

export function breakdown(tasks: TaskAnalysis[]): Record<Category, number> {
  const counts: Record<Category, number> = { automate: 0, copilot: 0, moat: 0 };
  for (const t of tasks) counts[t.category]++;
  return counts;
}

/** Parse a free-text task list: one per line, strips bullets/numbering. */
export function parseTasks(raw: string): string[] {
  return raw
    .split(/\r?\n/)
    .map((l) => l.replace(/^\s*(?:[-*•]|\d+[.)])\s*/, '').trim())
    .filter((l) => l.length > 2)
    .slice(0, 20);
}

export function validateAnalysis(a: unknown): a is Analysis {
  if (typeof a !== 'object' || a === null) return false;
  const x = a as Analysis;
  return (
    typeof x.role === 'string' &&
    typeof x.summary === 'string' &&
    Array.isArray(x.tasks) &&
    x.tasks.length > 0 &&
    x.tasks.every(
      (t) =>
        typeof t.task === 'string' &&
        typeof t.automatability === 'number' &&
        t.automatability >= 0 &&
        t.automatability <= 100 &&
        ['automate', 'copilot', 'moat'].includes(t.category)
    )
  );
}
