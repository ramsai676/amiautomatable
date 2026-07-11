// Minimal inline icon set — 1.5px strokes, sized via className.

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function BotMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="5" y="8" width="14" height="11" rx="3" {...base} strokeWidth={2} />
      <path d="M12 8V4.5" {...base} strokeWidth={2} />
      <circle cx="12" cy="3.5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="9.5" cy="13" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="13" r="1.3" fill="currentColor" stroke="none" />
      <path d="M9.5 16.5h5" {...base} />
    </svg>
  );
}

export function MoonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M20 13.5A8 8 0 0 1 10.5 4 8 8 0 1 0 20 13.5Z" {...base} />
    </svg>
  );
}

export function SunIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="12" r="4" {...base} />
      <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" {...base} />
    </svg>
  );
}

export function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M19 12H5m0 0 6 6m-6-6 6-6" {...base} />
    </svg>
  );
}

export function BoltIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M13 3 5 13.5h6L11 21l8-10.5h-6L13 3Z" {...base} />
    </svg>
  );
}

export function HandshakeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 6 8.5 9.5a1.8 1.8 0 0 0 2.5 2.5L12.5 10.5" {...base} />
      <path d="M3 7l4-2 5 1 5-1 4 2" {...base} />
      <path d="M12.5 10.5 16 14a1.7 1.7 0 0 1-2.4 2.4L12 14.8m-1.6 1.6a1.7 1.7 0 0 1-2.4-2.4" {...base} />
    </svg>
  );
}

export function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 3 5 6v5c0 4.5 3 8.4 7 10 4-1.6 7-5.5 7-10V6l-7-3Z" {...base} />
      <path d="m9.2 11.8 2 2 3.8-4" {...base} />
    </svg>
  );
}

export function BookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z" {...base} />
      <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5A2.5 2.5 0 0 1 4 20.5Z" {...base} />
    </svg>
  );
}

export function KeyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="8" cy="14" r="4" {...base} />
      <path d="m11 11 8-8m-3 3 2.5 2.5M15.5 6.5 18 9" {...base} />
    </svg>
  );
}

export function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 4c.6 3.6 2.4 5.4 6 6-3.6.6-5.4 2.4-6 6-.6-3.6-2.4-5.4-6-6 3.6-.6 5.4-2.4 6-6Z" {...base} />
    </svg>
  );
}
