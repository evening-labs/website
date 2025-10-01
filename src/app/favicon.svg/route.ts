import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Get the theme from the request (you can also check cookies or headers)
  const url = new URL(request.url);
  const theme = url.searchParams.get('theme') || 'light';
  
  // Define colors based on theme
  const colors = {
    light: 'oklch(0.7 0.2381 37.59)', // Light theme primary
    dark: 'oklch(0.6412 0.2381 37.59)'  // Dark theme primary
  };
  
  const primaryColor = colors[theme as keyof typeof colors] || colors.light;
  
  // Create SVG favicon
  const svg = `
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="${primaryColor}"/>
    </svg>
  `.trim();

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
