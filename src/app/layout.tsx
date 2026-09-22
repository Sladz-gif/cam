import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Information Console — Display System',
  description:
    'Display console with home overview, date picker, video channel, and system logs. Built with Next.js, TypeScript, and Tailwind CSS.',
  applicationName: 'Information Console',
  authors: [{ name: 'Information Console' }],
  keywords: [
    'console',
    'dashboard',
    'information',
    'display',
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
  ],
  openGraph: {
    type: 'website',
    title: 'Information Console — Display System',
    description:
      'Display console. Home overview, date picker, video channel, and system logs.',
    siteName: 'Information Console',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Information Console — Display System',
    description:
      'Display console. Home overview, date picker, video channel, and system logs.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0b3d91',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full w-full flex flex-col relative">
        <main className="relative z-10 flex flex-1 w-full overflow-hidden p-0">
          {children}
        </main>
      </body>
    </html>
  );
}
