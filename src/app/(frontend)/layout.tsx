import type { Metadata } from 'next';

import { LenisProvider } from '@/providers/lenis';
import { metadata } from '../metadata';

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
      {/* <Header /> */}
      {children}
    </LenisProvider>
  );
}
