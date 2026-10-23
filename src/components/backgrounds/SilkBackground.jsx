// src/components/backgrounds/SilkBackground.jsx
import { useId, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useIsDesktop } from '../../hooks/useScrollReveal';

/* Процедурный «шёлк»: feTurbulence (fractalNoise) + feDisplacementMap поверх
   градиента #000 → #1c1c1e с мягкими бликами. Лёгкий параллакс по scrollY. */
export default function SilkBackground({ className = '', parallax = true, factor = 0.08, seed = 7 }) {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, '');
  const gradId = `silk-g-${rawId}`;
  const filtId = `silk-f-${rawId}`;
  const sheenId = `silk-s-${rawId}`;
  const blurId = `silk-b-${rawId}`;

  const ref = useRef(null);
  const desktop = useIsDesktop();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (v) => (desktop && parallax && !reduce ? v * factor : 0));

  return (
    <div
      ref={ref}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <motion.div className="absolute inset-[-12%]" style={{ y }}>
        <svg className="h-full w-full" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0.35" y2="1">
              <stop offset="0" stopColor="#000000" />
              <stop offset="0.55" stopColor="#101012" />
              <stop offset="1" stopColor="#1c1c1e" />
            </linearGradient>
            <radialGradient id={sheenId} cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.14" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
            <filter id={filtId} x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.006 0.012" octaves="3" seed={seed} result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="140" xChannelSelector="R" yChannelSelector="G" />
              <feGaussianBlur stdDeviation="0.6" />
            </filter>
            <filter id={blurId} x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="28" />
            </filter>
          </defs>

          <rect width="100%" height="100%" fill={`url(#${gradId})`} filter={`url(#${filtId})`} />

          <g filter={`url(#${blurId})`}>
            <ellipse cx="24%" cy="28%" rx="36%" ry="14%" fill={`url(#${sheenId})`} />
            <ellipse cx="76%" cy="60%" rx="40%" ry="16%" fill={`url(#${sheenId})`} />
            <ellipse cx="52%" cy="10%" rx="28%" ry="9%" fill={`url(#${sheenId})`} />
          </g>
        </svg>
      </motion.div>
    </div>
  );
}