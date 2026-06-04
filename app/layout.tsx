import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ThemeRegistry from '@/providers/ThemeRegistry';
import { DashboardShell } from '@/components/layout/DashboardShell';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Dashboard de Acessibilidade WCAG',
  description: 'Dashboard científico para análise de acessibilidade WCAG em portais brasileiros.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.className}>
      <body>
        <ThemeRegistry>
          <DashboardShell>
            {children}
          </DashboardShell>
        </ThemeRegistry>
      </body>
    </html>
  );
}
