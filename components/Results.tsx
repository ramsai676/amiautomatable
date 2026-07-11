'use client';

import { breakdown, exposureScore, verdict } from '@/lib/scoring';
import { CATEGORY_META, type Analysis, type Category } from '@/lib/types';
import { ThemeToggle } from './ThemeToggle';
import { AnimatedNumber } from './motion-bits';
import { ArrowLeftIcon, BoltIcon, BookIcon, BotMark, HandshakeIcon, ShieldIcon } from './icons';

interface Props {
  analysis: Analysis;
  source: 'preset' | 'custom';
  onBack: () => void;
}

const CAT_STYLE: Record<Category, { color: string; icon: React.ReactNode }> = {
  automate: { color: 'var(--critical)', icon: <BoltIcon className="h-3.5 w-3.5" /> },
  copilot: { color: 'var(--warn)', icon: <HandshakeIcon className="h-3.5 w-3.5" /> },
  moat: { color: 'var(--good-text)', icon: <ShieldIcon className="h-3.5 w-3.5" /> },
};

const BAND_COLOR: Record<string, string> = {
  low: 'var(--good-text)',
  moderate: 'var(--warn)',
  high: 'var(--serious-text)',
  critical: 'var(--critical)',
};

function CategoryChip({ category }: { category: Category }) {
  const s = CAT_STYLE[category];
  return (
    <span
      className="inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium"
      style={{ color: s.color, background: 'color-mix(in srgb, currentColor 10%, transparent)' }}
    >
      {s.icon}
      {CATEGORY_META[category].label}
    </span>
  );
}

export function Results({ analysis, source, onBack }: Props) {
  const score = exposureScore(analysis.tasks);
  const v = verdict(score);
  const counts = breakdown(analysis.tasks);
  const sorted = [...analysis.tasks].sort((a, b) => b.automatability - a.automatability);

  return (
    <div className="min-h-screen pb-20">
      <header
        className="sticky top-0 z-40 border-b backdrop-blur-md"
        style={{ borderColor: 'var(--hairline)', background: 'color-mix(in srgb, var(--page) 85%, transparent)' }}
      >
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-3.5">
          <button
            onClick={onBack}
            className="pressable flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] font-medium text-[var(--ink-2)] hover:text-[var(--ink)]"
            style={{ borderColor: 'var(--hairline)' }}
          >
            <ArrowLeftIcon className="h-3.5 w-3.5" />
            Another role
          </button>
          <span className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-md text-white" style={{ background: 'var(--brand)' }}>
              <BotMark className="h-4 w-4" />
            </span>
            <span className="text-[15px] font-semibold tracking-[-0.01em]">AmIAutomatable</span>
          </span>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6">
        {/* ——— verdict ——— */}
        <section className="rise rise-1 pt-10 text-center">
          <p className="text-[15px] font-medium text-[var(--ink-2)]">{analysis.role}</p>
          <p className="mt-4 text-[72px] font-semibold leading-none tracking-[-0.03em]" style={{ fontVariantNumeric: 'tabular-nums' }}>
            <AnimatedNumber value={score} />
            <span className="text-[40px] text-[var(--ink-3)]">%</span>
          </p>
          <p className="mt-1 text-[15px] font-semibold" style={{ color: BAND_COLOR[v.band] }}>
            {v.title} — automatable today
          </p>

          {/* exposure bar */}
          <div className="mx-auto mt-6 max-w-md">
            <div className="h-2 overflow-hidden rounded-full" style={{ background: 'var(--grid)' }}>
              <div
                className="bar-grow h-full rounded-full"
                style={{ width: `${score}%`, background: BAND_COLOR[v.band] }}
              />
            </div>
            <div className="mt-1.5 flex justify-between text-[11px] text-[var(--ink-3)]">
              <span>safe</span>
              <span>transforming</span>
              <span>automated</span>
            </div>
          </div>

          <p className="mx-auto mt-6 max-w-xl text-pretty text-[15px] leading-relaxed text-[var(--ink-2)]">
            {analysis.summary}
          </p>
          <p className="mx-auto mt-3 max-w-xl text-[14px] italic leading-relaxed text-[var(--ink-3)]">{v.line}</p>
        </section>

        {/* ——— category legend ——— */}
        <section className="rise rise-2 mt-10 grid gap-3 sm:grid-cols-3">
          {(Object.keys(CATEGORY_META) as Category[]).map((c) => (
            <div
              key={c}
              className="card-lift rounded-2xl border p-4"
              style={{ borderColor: 'var(--hairline)', background: 'var(--surface)', boxShadow: 'var(--shadow-card)' }}
            >
              <div className="flex items-center justify-between">
                <CategoryChip category={c} />
                <span className="text-lg font-semibold" style={{ fontVariantNumeric: 'tabular-nums' }}>
                  {counts[c]}
                </span>
              </div>
              <p className="mt-2 text-[12px] leading-relaxed text-[var(--ink-3)]">{CATEGORY_META[c].description}</p>
            </div>
          ))}
        </section>

        {/* ——— task breakdown ——— */}
        <section className="rise rise-3 mt-8">
          <div
            className="rounded-2xl border"
            style={{ borderColor: 'var(--hairline)', background: 'var(--surface)', boxShadow: 'var(--shadow-card)' }}
          >
            <h2 className="px-6 pt-5 text-[13px] font-semibold uppercase tracking-wide text-[var(--ink-2)]">
              Task by task
            </h2>
            <ul className="mt-2 divide-y" style={{ borderColor: 'var(--grid)' }}>
              {sorted.map((t, i) => (
                <li key={i} className="px-6 py-4" style={{ borderColor: 'var(--grid)' }}>
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-[15px] font-medium leading-snug">{t.task}</p>
                    <span className="shrink-0 text-[15px] font-semibold" style={{ fontVariantNumeric: 'tabular-nums', color: CAT_STYLE[t.category].color }}>
                      {t.automatability}%
                    </span>
                  </div>
                  <div className="mt-2.5 h-1.5 overflow-hidden rounded-full" style={{ background: 'var(--grid)' }}>
                    <div
                      className="bar-grow h-full rounded-full"
                      style={{ width: `${t.automatability}%`, background: CAT_STYLE[t.category].color, animationDelay: `${i * 60}ms` }}
                    />
                  </div>
                  <div className="mt-2.5 flex flex-wrap items-center gap-2">
                    <CategoryChip category={t.category} />
                    <p className="text-[13px] leading-relaxed text-[var(--ink-2)]">{t.why}</p>
                  </div>
                  {t.learn && t.learn !== '—' && (
                    <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--ink-3)]">
                      <span className="font-medium" style={{ color: 'var(--brand)' }}>Adapt: </span>
                      {t.learn}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ——— moat ——— */}
        <section
          className="rise rise-4 mt-8 rounded-2xl border p-6"
          style={{ borderColor: 'var(--hairline)', background: 'var(--surface)', boxShadow: 'var(--shadow-card)' }}
        >
          <h2 className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wide" style={{ color: 'var(--good-text)' }}>
            <ShieldIcon className="h-4 w-4" /> Your moat
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink)]">{analysis.moatAdvice}</p>
        </section>

        {/* ——— what to learn ——— */}
        <section
          className="rise rise-5 mt-4 rounded-2xl border p-6"
          style={{ borderColor: 'var(--hairline)', background: 'var(--surface)', boxShadow: 'var(--shadow-card)' }}
        >
          <h2 className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wide" style={{ color: 'var(--brand)' }}>
            <BookIcon className="h-4 w-4" /> Learn next — in order of leverage
          </h2>
          <ol className="mt-4 space-y-3">
            {analysis.learnPriorities.map((l, i) => (
              <li key={i} className="flex gap-3">
                <span
                  className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-[12px] font-semibold text-white"
                  style={{ background: 'var(--brand)', fontVariantNumeric: 'tabular-nums' }}
                >
                  {i + 1}
                </span>
                <div>
                  <p className="text-[15px] font-medium leading-snug">{l.skill}</p>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-[var(--ink-2)]">{l.why}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <p className="mt-8 text-center text-[12px] leading-relaxed text-[var(--ink-3)]">
          {source === 'preset'
            ? 'Pre-analyzed role — for your exact job, run a custom analysis with your own task list.'
            : 'Analyzed by Gemini from your task list — scores reflect tools shipping today.'}
          <br />
          Not career advice from an oracle. A mirror with a number on it.
        </p>
      </main>
    </div>
  );
}
