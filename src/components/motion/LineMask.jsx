// src/components/motion/LineMask.jsx
import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { lineMask, VIEWPORT } from './variants';

/* Заголовок по строкам: каждая строка в overflow-hidden, y: 110% → 0 */
export default function LineMask({
  lines = [],
  as = 'h2',
  className = '',
  lineClassName = '',
  immediate = false, // true — анимировать сразу при монтировании (hero)
  renderLine, // (line, i) => node — чтобы красить акцентные строки
}) {
  const ref = useRef(null);
  const inView = useInView(ref, VIEWPORT);
  const reduce = useReducedMotion();
  const play = immediate || inView;

  const Comp = motion[as] || motion.h2;

  return (
    <Comp ref={ref} className={className} initial="hidden" animate={play ? 'show' : 'hidden'}>
      {lines.map((line, i) => (
        <span key={i} className={`block overflow-hidden ${lineClassName}`}>
          <motion.span
            className="block will-change-transform"
            variants={reduce ? { hidden: { y: 0 }, show: { y: 0 } } : lineMask}
            custom={i}
          >
            {renderLine ? renderLine(line, i) : line}
          </motion.span>
        </span>
      ))}
    </Comp>
  );
}