// src/components/motion/FadeIn.jsx
import { useRef, useMemo } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { fadeUp, slideLeft, slideRight, slideBottom, scaleIn, VIEWPORT, withDelay, reduced } from './variants';

const MAP = { fadeUp, slideLeft, slideRight, slideBottom, scaleIn };

export default function FadeIn({
  children,
  variant = 'fadeUp',
  delay = 0,
  className = '',
  as = 'div',
}) {
  const ref = useRef(null);
  const inView = useInView(ref, VIEWPORT);
  const reduce = useReducedMotion();

  const variants = useMemo(() => {
    const base = withDelay(MAP[variant] || fadeUp, delay);
    return reduce ? reduced(base) : base;
  }, [variant, delay, reduce]);

  const Comp = motion[as] || motion.div;

  return (
    <Comp
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={variants}
    >
      {children}
    </Comp>
  );
}