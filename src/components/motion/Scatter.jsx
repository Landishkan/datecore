// src/components/motion/Scatter.jsx
import { useMemo, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { scatterContainer, scatterItem, makeScatterSeeds, VIEWPORT } from './variants';

/* Посимвольный разлёт заголовка → spring-сборка.
   parts: [{ text: 'А что нужно ', accent: false }, { text: 'вам', accent: true }, { text: '?', accent: false }] */
export default function Scatter({ parts = [], as = 'h2', className = '', accentColor = '#2FA9F9' }) {
  const ref = useRef(null);
  const inView = useInView(ref, VIEWPORT);
  const reduce = useReducedMotion();

  const chars = useMemo(() => {
    const list = [];
    parts.forEach((p) => {
      Array.from(p.text).forEach((ch) => list.push({ ch, accent: Boolean(p.accent) }));
    });
    return list;
  }, [parts]);

  const seeds = useMemo(() => makeScatterSeeds(chars.length), [chars.length]);

  const Comp = motion[as] || motion.h2;

  return (
    <Comp
      ref={ref}
      className={`whitespace-pre-wrap ${className}`}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={scatterContainer}
    >
      {chars.map((c, i) => (
        <motion.span
          key={i}
          className={`inline-block will-change-transform ${c.accent ? 'accent-italic' : 'text-volume'}`}
          style={c.accent ? { color: accentColor } : undefined}
          variants={
            reduce
              ? { hidden: { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }, show: {} }
              : scatterItem
          }
          custom={seeds[i]}
        >
          {c.ch}
        </motion.span>
      ))}
    </Comp>
  );
}