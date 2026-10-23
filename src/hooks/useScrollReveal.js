// src/hooks/useScrollReveal.js
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { VIEWPORT } from '../components/motion/variants';

/* Основной триггер появления секций: useInView({ once: true, margin: '-10% 0px' }) */
export default function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const inView = useInView(ref, { ...VIEWPORT, ...options });
  return [ref, inView];
}

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [query]);
  return matches;
}

export const useIsDesktop = () => useMediaQuery('(min-width: 768px)');