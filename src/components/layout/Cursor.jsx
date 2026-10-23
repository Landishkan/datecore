// src/components/layout/Cursor.jsx
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { hexToRgba } from '../../hooks/useTilt';

/* Деликатный курсор: точка 6px + кольцо 28px (spring);
   на [data-hover] кольцо 56px с подписью. Off: touch / reduced-motion / <768px. */
export default function Cursor({ accent = '#2FA9F9' }) {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [label, setLabel] = useState('');

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const x = useSpring(mx, { stiffness: 320, damping: 26, mass: 0.5 });
  const y = useSpring(my, { stiffness: 320, damping: 26, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)');
    const wide = window.matchMedia('(min-width: 768px)');
    const update = () => setEnabled(fine.matches && wide.matches && !reduce);
    update();
    fine.addEventListener('change', update);
    wide.addEventListener('change', update);
    return () => {
      fine.removeEventListener('change', update);
      wide.removeEventListener('change', update);
    };
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return;
    const move = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      const target = e.target instanceof Element ? e.target.closest('[data-hover]') : null;
      if (target) {
        setHovered(true);
        setLabel(target.getAttribute('data-hover') || '');
      } else {
        setHovered(false);
        setLabel('');
      }
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [enabled, mx, my]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-cursor" aria-hidden="true">
      <motion.div className="absolute left-0 top-0" style={{ x, y }}>
        <motion.div
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border"
          initial={false}
          animate={{
            width: hovered ? 56 : 28,
            height: hovered ? 56 : 28,
            borderColor: hovered ? hexToRgba(accent, 0.9) : hexToRgba(accent, 0.5),
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        >
          {label && (
            <span className="text-[9px] font-semibold uppercase tracking-badge text-accent">
              {label}
            </span>
          )}
        </motion.div>
        <div className="absolute left-0 top-0 h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
      </motion.div>
    </div>
  );
}