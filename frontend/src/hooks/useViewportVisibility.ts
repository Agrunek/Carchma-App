import { useEffect, useRef, useState } from 'react';

const useViewportVisibility = <T extends HTMLElement>(initialVisibility: boolean = false) => {
  const elementRef = useRef<T>(null);

  const [isVisible, setIsVisible] = useState(initialVisibility);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return { elementRef, isVisible };
};

export default useViewportVisibility;
