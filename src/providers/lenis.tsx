'use client';

import { ReactLenis } from 'lenis/react';

export function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.15,
        smoothWheel: true,
        anchors: {
          duration: 1.5,
          offset: -64,
        }
      }}
    >
      {children}
    </ReactLenis>
  );
}
