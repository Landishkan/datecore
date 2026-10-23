// src/hooks/useMagnetic.js
import { useCallback, useEffect, useState } from 'react';
import { useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

const clamp = (v, max) => Math.max(-max, Math.min(max, v));

/* Магнитные кнопки: смещение к курсору до strength px, spring-возврат */
export default function useMagnetic({ strength = 6 } = {}) {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setEnabled(mq.matches && !reduce);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [reduce]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.5 });

  const onMouseMove = useCallback(
    (e) => {
      if (!enabled) return;
      const r = e.currentTarget.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      x.set(clamp(dx * 0.25, strength));
      y.set(clamp(dy * 0.25, strength));
    },
    [enabled, strength, x, y]
  );

  const onMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return {
    enabled,
    handlers: { onMouseMove, onMouseLeave },
    style: enabled ? { x: sx, y: sy } : {},
  };
}