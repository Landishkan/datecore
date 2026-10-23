// src/components/motion/SlideIn.jsx
import { useRef, useMemo } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { VIEWPORT, withDelay, reduced, EASE_ENTER } from './variants';

/* Выдвижение блока с произвольной дистанцией (для карточек услуг: x: -100vw → 0 и т.п.) */
export default function SlideIn({
  children,
  from = 'left', // 'left' | 'right' | 'bottom'
  distance = 80,
  rotate = 0,
  scale = 1,
  delay = 0,
  className = '',
}) {
  const ref = useRef(null);
  const inView = useInView(ref, VIEWPORT);
  const reduce = useReducedMotion();

  const hidden =
    from === 'bottom'
      ? { opacity: 0, y: distance, scale, rotate }
      : { opacity: 0, x: from === 'left' ? -distance : distance, scale, rotate };

  const variants = useMemo(() => {
    const v = {
      hidden,
      show: {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        transition: { duration: 0.9, ease: EASE_ENTER, delay },
      },
    };
    return reduce ? reduced(v) : v;
  }, [from, distance, rotate, scale, delay, reduce]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}