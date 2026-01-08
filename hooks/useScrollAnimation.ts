
import { useState, useEffect, useRef, RefObject } from 'react';

/**
 * Custom hook to detect when an element is visible in the viewport.
 * @param options - IntersectionObserver options.
 * @returns A tuple containing the ref to attach to the element and a boolean indicating if it's visible.
 */
export const useScrollAnimation = <T extends HTMLElement>(options?: IntersectionObserverInit): [RefObject<T>, boolean] => {
  const elementRef = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        ...options,
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options]);

  return [elementRef, isVisible];
};
