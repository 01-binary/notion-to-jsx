import { useEffect, useRef, RefObject } from 'react';

interface IntersectionObserverOptions {
  onIntersect: () => void;
  threshold?: number;
  rootMargin?: string;
  enabled?: boolean;
}

export const useIntersectionObserver = <T extends HTMLElement>({
  onIntersect,
  threshold = 0,
  rootMargin = '0px',
  enabled = true,
}: IntersectionObserverOptions): RefObject<T> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onIntersect();
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [enabled, onIntersect, rootMargin, threshold]);

  return ref;
};
