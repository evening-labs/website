'use client';

import { useEffect, useState } from 'react';

export function useMenuKeyboard(isMenuOpen: boolean, onClose: () => void) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        onClose();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen, onClose]);
}

export function useMenuToggleKeyboard(onToggle: () => void) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if the key is "I" or "i" and not in an input/textarea
      if (
        (event.key === 'i' || event.key === 'I') &&
        !(event.target instanceof HTMLInputElement) &&
        !(event.target instanceof HTMLTextAreaElement)
      ) {
        event.preventDefault();
        onToggle();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onToggle]);
}

export function useInView() {
  const [isInView, setIsInView] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: '0px 0px 0px 0px',
      }
    );

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return { isInView, setRef };
}
