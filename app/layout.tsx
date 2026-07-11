import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'AmIAutomatable — which parts of your job can AI already do?',
  description:
    'Paste your job title and weekly tasks. Get an honest, task-by-task breakdown of what AI does today, what it speeds up, and where your human moat is — plus what to learn next.',
};

const themeInit = `
try {
  var t = localStorage.getItem('aia-theme');
  if (t === 'dark' || (!t && matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
} catch (e) {}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
