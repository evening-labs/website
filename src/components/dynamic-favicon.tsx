'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';

export function DynamicFavicon() {
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    const updateFavicon = () => {
      const currentTheme = resolvedTheme || theme || 'light';
      
      // Create a canvas to generate the favicon
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;
      
      // Define colors based on theme (matching your CSS variables)
      const colors = {
        light: '#B8860B', // Convert oklch(0.7 0.2381 37.59) to hex approximation
        dark: '#D4AF37'   // Convert oklch(0.6412 0.2381 37.59) to hex approximation
      };
      
      const primaryColor = colors[currentTheme as keyof typeof colors] || colors.light;
      
      // Draw orange circle
      ctx.fillStyle = primaryColor;
      ctx.beginPath();
      ctx.arc(16, 16, 16, 0, 2 * Math.PI);
      ctx.fill();
      
      // Convert canvas to data URL
      const dataURL = canvas.toDataURL('image/png');
      
      // Update favicon
      const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement || document.createElement('link');
      link.type = 'image/png';
      link.rel = 'icon';
      link.href = dataURL;
      
      if (!document.querySelector("link[rel*='icon']")) {
        document.getElementsByTagName('head')[0].appendChild(link);
      }
    };

    // Update favicon when theme changes
    updateFavicon();
    
    // Also update on system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => updateFavicon();
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [theme, resolvedTheme]);

  return null; // This component doesn't render anything
}
