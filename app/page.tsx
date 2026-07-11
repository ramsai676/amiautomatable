'use client';

import { useCallback, useState } from 'react';
import { InputScreen } from '@/components/InputScreen';
import { Results } from '@/components/Results';
import { analyzeJob, friendlyApiError } from '@/lib/gemini';
import { parseTasks } from '@/lib/scoring';
import { getPreset } from '@/lib/roles';
import type { Analysis } from '@/lib/types';

type Stage =
  | { kind: 'input' }
  | { kind: 'results'; analysis: Analysis; source: 'preset' | 'custom' };

export default function Home() {
  const [stage, setStage] = useState<Stage>({ kind: 'input' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePreset = useCallback((slug: string) => {
    const preset = getPreset(slug);
    if (preset) setStage({ kind: 'results', analysis: preset, source: 'preset' });
    window.scrollTo({ top: 0 });
  }, []);

  const handleAnalyze = useCallback(async (title: string, tasksRaw: string, apiKey: string) => {
    setError(null);
    const tasks = parseTasks(tasksRaw);
    if (!title.trim()) {
      setError('Give me your job title.');
      return;
    }
    if (tasks.length < 3) {
      setError('List at least 3 tasks (one per line) — the analysis is only as good as the input.');
      return;
    }
    if (!apiKey.trim()) {
      setError('Custom analysis calls the Gemini API from your browser — paste your Google AI Studio key (free) (or pick a pre-analyzed role above, no key needed).');
      return;
    }
    setBusy(true);
    try {
      const analysis = await analyzeJob(apiKey.trim(), title.trim(), tasks);
      setStage({ kind: 'results', analysis, source: 'custom' });
      window.scrollTo({ top: 0 });
    } catch (e) {
      setError(friendlyApiError(e));
    } finally {
      setBusy(false);
    }
  }, []);

  if (stage.kind === 'results') {
    return (
      <Results
        analysis={stage.analysis}
        source={stage.source}
        onBack={() => setStage({ kind: 'input' })}
      />
    );
  }

  return <InputScreen onPreset={handlePreset} onAnalyze={handleAnalyze} busy={busy} error={error} />;
}
