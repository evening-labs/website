import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { ThemeProvider } from '@/providers/theme-provider';
import { metadata as siteMetadata } from './metadata';

import '@/styles/globals.css';
import { DynamicFavicon } from '@/components/dynamic-favicon';

export const metadata = siteMetadata;

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DynamicFavicon />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
