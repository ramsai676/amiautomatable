'use client';

import { useEffect, useState } from 'react';
import { ROLE_PRESETS } from '@/lib/roles';
import { exposureScore } from '@/lib/scoring';
import { ThemeToggle } from './ThemeToggle';
import { BotMark, KeyIcon, SparkleIcon } from './icons';

interface Props {
  onPreset: (slug: string) => void;
  onAnalyze: (title: string, tasksRaw: string, apiKey: string) => void;
  busy: boolean;
  error: string | null;
}

const PLACEHOLDER_TASKS = `screen resumes and shortlist candidates
schedule interviews with hiring managers
write job descriptions
conduct HR interviews
negotiate offers and close candidates`;

export function InputScreen({ onPreset, onAnalyze, busy, error }: Props) {
  const [title, setTitle] = useState('');
  const [tasksRaw, setTasksRaw] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [keyOpen, setKeyOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('aia-gemini-key');
      if (saved) {
        setApiKey(saved);
        setKeyOpen(true);
      }
    } catch {}
  }, []);

  const saveKey = (v: string) => {
    setApiKey(v);
    try {
      localStorage.setItem('aia-gemini-key', v);
    } catch {}
  };

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-4xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg text-white" style={{ background: 'var(--brand)' }}>
            <BotMark className="h-5 w-5" />
          </span>
          <span className="text-[17px] font-semibold tracking-[-0.01em]">AmIAutomatable</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="https://github.com/ramsai/amiautomatable" className="text-sm text-[var(--ink-2)] transition-colors hover:text-[var(--ink)]">
            GitHub
          </a>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 pb-24">
        {/* hero */}
        <section className="hero-glow mx-auto max-w-2xl pt-12 text-center sm:pt-16">
          <h1 className="rise rise-1 text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[52px]">
            Which parts of your job can AI <span className="grad-text">already do</span>?
          </h1>
          <p className="rise rise-2 mx-auto mt-5 max-w-xl text-pretty text-[17px] leading-relaxed text-[var(--ink-2)]">
            Not someday — today, with tools anyone can buy. An honest task-by-task breakdown:
            what automates, what becomes a copilot, and where your human moat is.
          </p>
        </section>

        {/* preset roles */}
        <section className="rise rise-3 mt-12">
          <h2 className="text-[13px] font-semibold uppercase tracking-wide text-[var(--ink-3)]">
            Pick your role — pre-analyzed, no signup
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {ROLE_PRESETS.map((r) => {
              const score = exposureScore(r.tasks);
              return (
                <button
                  key={r.slug}
                  onClick={() => onPreset(r.slug)}
                  className="pressable card-lift group rounded-2xl border p-4 text-left"
                  style={{ borderColor: 'var(--hairline)', background: 'var(--surface)', boxShadow: 'var(--shadow-card)' }}
                >
                  <p className="text-[14px] font-medium leading-snug">{r.role}</p>
                  <p className="mt-2 text-[12px] text-[var(--ink-3)]" style={{ fontVariantNumeric: 'tabular-nums' }}>
                    <span className="font-semibold" style={{ color: 'var(--brand)' }}>{score}%</span> automatable →
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* divider */}
        <div className="rise rise-4 my-12 flex items-center gap-4">
          <span className="h-px flex-1" style={{ background: 'var(--grid)' }} />
          <span className="text-[13px] font-medium text-[var(--ink-3)]">or analyze your exact job</span>
          <span className="h-px flex-1" style={{ background: 'var(--grid)' }} />
        </div>

        {/* custom form */}
        <section
          className="rise rise-5 mx-auto max-w-2xl rounded-2xl border p-6 sm:p-8"
          style={{ borderColor: 'var(--hairline)', background: 'var(--surface)', boxShadow: 'var(--shadow-card)' }}
        >
          <label className="block text-[13px] font-semibold text-[var(--ink-2)]">Your job title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. HR Recruiter at a mid-size IT services company"
            className="mt-2 w-full rounded-xl border bg-transparent px-4 py-3 text-[15px] outline-none transition-colors placeholder:text-[var(--ink-3)] focus:border-[var(--brand)]"
            style={{ borderColor: 'var(--hairline-strong)' }}
          />

          <label className="mt-5 block text-[13px] font-semibold text-[var(--ink-2)]">
            What you actually do in a week — one task per line
          </label>
          <textarea
            value={tasksRaw}
            onChange={(e) => setTasksRaw(e.target.value)}
            placeholder={PLACEHOLDER_TASKS}
            rows={7}
            className="mt-2 w-full resize-y rounded-xl border bg-transparent px-4 py-3 text-[15px] leading-relaxed outline-none transition-colors placeholder:text-[var(--ink-3)] focus:border-[var(--brand)]"
            style={{ borderColor: 'var(--hairline-strong)' }}
          />

          {/* API key */}
          <details
            open={keyOpen}
            onToggle={(e) => setKeyOpen((e.target as HTMLDetailsElement).open)}
            className="mt-5 rounded-xl border px-4 py-3"
            style={{ borderColor: 'var(--hairline)' }}
          >
            <summary className="flex cursor-pointer list-none items-center gap-2 text-[13px] font-medium text-[var(--ink-2)]">
              <KeyIcon className="h-4 w-4 text-[var(--ink-3)]" />
              Google Gemini API key — required for custom analysis (free tier works)
            </summary>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => saveKey(e.target.value)}
              placeholder="AIza…"
              className="mt-3 w-full rounded-lg border bg-transparent px-3 py-2 font-mono text-[13px] outline-none focus:border-[var(--brand)]"
              style={{ borderColor: 'var(--hairline-strong)' }}
            />
            <p className="mt-2 text-[12px] leading-relaxed text-[var(--ink-3)]">
              This is a static page with no backend — your key stays in your browser and calls
              Google directly. Stored only in your own localStorage. Get a free key at{' '}
              <a href="https://aistudio.google.com/apikey" className="underline underline-offset-2" style={{ color: 'var(--brand)' }}>
                aistudio.google.com/apikey
              </a>
              . The free tier covers this comfortably.
            </p>
          </details>

          {error && (
            <p className="fade mt-4 rounded-xl border px-4 py-3 text-sm leading-relaxed" style={{ borderColor: 'var(--critical)', color: 'var(--critical)' }}>
              {error}
            </p>
          )}

          <button
            onClick={() => onAnalyze(title, tasksRaw, apiKey)}
            disabled={busy}
            className="pressable mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-[15px] font-semibold text-white transition-opacity disabled:opacity-60"
            style={{ background: 'var(--brand)' }}
          >
            <SparkleIcon className={`h-4 w-4 ${busy ? 'thinking' : ''}`} />
            {busy ? 'Analyzing your tasks…' : 'Analyze my job'}
          </button>
        </section>

        <p className="mt-10 text-center text-[13px] leading-relaxed text-[var(--ink-3)]">
          Calibrated to shipping tools, not lab demos · open source · part of the{' '}
          <span className="font-medium">Unnoticed</span> series (2 of 5)
        </p>
      </main>
    </div>
  );
}
