import { useEffect, useRef, RefObject } from 'react';

interface KeyboardNavigationOptions {
  onEscape?: () => void;
  onEnter?: () => void;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
}

export const useKeyboardNavigation = <T extends HTMLElement>(
  options: KeyboardNavigationOptions
): RefObject<T | null> => {
  const ref = useRef<T>(null);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          optionsRef.current.onEscape?.();
          break;
        case 'Enter':
          optionsRef.current.onEnter?.();
          break;
        case 'ArrowUp':
          event.preventDefault();
          optionsRef.current.onArrowUp?.();
          break;
        case 'ArrowDown':
          event.preventDefault();
          optionsRef.current.onArrowDown?.();
          break;
        case 'ArrowLeft':
          optionsRef.current.onArrowLeft?.();
          break;
        case 'ArrowRight':
          optionsRef.current.onArrowRight?.();
          break;
      }
    };

    element.addEventListener('keydown', handleKeyDown);
    return () => element.removeEventListener('keydown', handleKeyDown);
  }, []);

  return ref;
};
