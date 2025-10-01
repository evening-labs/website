'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

interface LoadingContextType {
  isLoading: boolean;
  progress: number;
  loadedImages: number;
  totalImages: number;
  reportImageLoaded: () => void;
  setTotalImages: (total: number) => void;
  markComplete: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadedImages, setLoadedImages] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const [resourcesLoaded, setResourcesLoaded] = useState({
    images: false,
    fonts: false,
    criticalCSS: true, // CSS is likely already loaded
    documentReady: false,
  });

  const reportImageLoaded = useCallback(() => {
    setLoadedImages((prev) => {
      const newLoaded = prev + 1;
      return newLoaded;
    });
  }, []);

  const markComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Track image loading progress with smooth animation
  useEffect(() => {
    if (totalImages === 0) return;

    const targetProgress = (loadedImages / totalImages) * 100;

    // If this is the first update or progress is complete, set it directly
    if (progress === 0 || targetProgress >= 100) {
      setProgress(targetProgress);
    } else {
      // Smoothly animate to the target progress over time
      const startProgress = progress;
      const progressDiff = targetProgress - startProgress;
      const duration = 600; // Animation duration in ms
      const startTime = Date.now();

      const animateProgress = () => {
        const elapsed = Date.now() - startTime;
        const progressRatio = Math.min(elapsed / duration, 1);

        // Use easeOut for smoother animation
        const easeOutRatio = 1 - Math.pow(1 - progressRatio, 3);
        const newProgress = startProgress + progressDiff * easeOutRatio;

        setProgress(newProgress);

        if (progressRatio < 1) {
          requestAnimationFrame(animateProgress);
        }
      };

      requestAnimationFrame(animateProgress);
    }

    // Mark images as complete when all are loaded
    if (loadedImages >= totalImages && totalImages > 0) {
      setResourcesLoaded((prev) => ({ ...prev, images: true }));
    }
  }, [loadedImages, totalImages]);

  // Track web fonts loading
  useEffect(() => {
    // Check if web fonts are loaded
    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        setResourcesLoaded((prev) => ({ ...prev, fonts: true }));
      });
    } else {
      // Fallback for browsers without font loading API
      setTimeout(() => {
        setResourcesLoaded((prev) => ({ ...prev, fonts: true }));
      }, 100);
    }
  }, []);

  // Track document ready state
  useEffect(() => {
    if (document.readyState === 'complete') {
      setResourcesLoaded((prev) => ({ ...prev, documentReady: true }));
    } else {
      const handleReadyStateChange = () => {
        if (document.readyState === 'complete') {
          setResourcesLoaded((prev) => ({ ...prev, documentReady: true }));
        }
      };

      document.addEventListener('readystatechange', handleReadyStateChange);
      return () =>
        document.removeEventListener(
          'readystatechange',
          handleReadyStateChange
        );
    }
  }, []);

  // Determine overall loading state
  useEffect(() => {
    const allResourcesLoaded = Object.values(resourcesLoaded).every(
      (loaded) => loaded
    );

    if (allResourcesLoaded && loadedImages >= totalImages) {
      // Add a small delay for smooth transition
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [resourcesLoaded, loadedImages, totalImages]);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        progress,
        loadedImages,
        totalImages,
        reportImageLoaded,
        setTotalImages,
        markComplete,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}
