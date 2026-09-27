import { useEffect, useState, useRef } from 'react';

/**
 * Custom hook to detect when an element is scrolled into view using IntersectionObserver.
 * @param {Object} options - IntersectionObserver options (threshold, rootMargin)
 * @returns {[React.RefObject, boolean]} Array containing element ref and boolean visibility flag
 */
export function useScrollAnimation(options = {}) {
  const { threshold = 0.15, rootMargin = '0px 0px -50px 0px' } = options;
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, keep visible (trigger once)
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { threshold, rootMargin }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin]);

  return [ref, isVisible];
}

/**
 * Standard Framer Motion variant helper for smooth section scroll reveals.
 */
export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: custom * 0.15,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  })
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

