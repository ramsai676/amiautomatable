export type Category = 'automate' | 'copilot' | 'moat';

export interface TaskAnalysis {
  task: string;
  /** 0–100: how much of this task AI can do today */
  automatability: number;
  category: Category;
  why: string;
  /** what to learn / how to adapt for this task */
  learn: string;
}

export interface Analysis {
  role: string;
  summary: string;
  tasks: TaskAnalysis[];
  moatAdvice: string;
  learnPriorities: { skill: string; why: string }[];
}

export interface RolePreset extends Analysis {
  slug: string;
}

export const CATEGORY_META: Record<
  Category,
  { label: string; description: string }
> = {
  automate: {
    label: 'AI does this today',
    description: 'Current AI tools handle this end-to-end with light review.',
  },
  copilot: {
    label: 'AI + you',
    description: 'AI drafts, you direct and decide. Speed-up, not replacement.',
  },
  moat: {
    label: 'Your moat',
    description: 'Trust, judgment, relationships, presence — still human ground.',
  },
};
