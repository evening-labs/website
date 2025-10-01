import type { Metadata } from 'next';
import { metadata } from '../metadata';

import { LenisProvider, LoadingProvider, ThemeProvider } from '@/providers';
import { Preloader } from '@/components/layouts';

export async function generateMetadata(): Promise<Metadata> {
  return { ...metadata };
}

export default function FrontendLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LoadingProvider> 
      <LenisProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Preloader />
          {children}
        </ThemeProvider>
      </LenisProvider>
    </LoadingProvider>
  );
}
