import type { Metadata } from 'next';
import { metadata } from '../metadata';

import { LenisProvider, ThemeProvider } from '@/providers';

export async function generateMetadata(): Promise<Metadata> {
  return { ...metadata };
}

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LenisProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
      >
        {children}
      </ThemeProvider>
    </LenisProvider>
  );
}
