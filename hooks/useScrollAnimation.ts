import { useState, useEffect, useRef, RefObject } from 'react';

/**
 * Custom hook to detect when an element is visible in the viewport.
 * @param options - IntersectionObserver options.
 * @returns A tuple containing the ref to attach to the element and a boolean indicating if it's visible.
 */
// FIX: Changed the hook to be generic to accept any HTMLElement type. This resolves type errors when applying the ref to specific elements like divs or sections.
export const useScrollAnimation = <T extends HTMLElement>(options?: IntersectionObserverInit): [RefObject<T>, boolean] => {
  const elementRef = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the element is intersecting, update the state and unobserve
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        ...options,
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    // Cleanup observer on component unmount
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options]);

  return [elementRef, isVisible];
};
