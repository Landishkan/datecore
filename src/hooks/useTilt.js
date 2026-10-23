// src/hooks/useTilt.js
import { useCallback, useEffect, useState } from 'react';
import { useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

export function hexToRgba(hex, alpha = 1) {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const num = parseInt(full, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/* Tilt rotateX/Y ±max deg + glow-follow (radial-gradient по курсору).
   На мобильных (<768px) и при prefers-reduced-motion отключён. */
export default function useTilt({ max = 3, accent = '#2FA9F9', glow = true } = {}) {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setEnabled(mq.matches && !reduce);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [reduce]);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateY = useSpring(useTransform(px, [0, 1], [max, -max]), { stiffness: 160, damping: 22 });
  const rotateX = useSpring(useTransform(py, [0, 1], [-max, max]), { stiffness: 160, damping: 22 });

  const glowBackground = useTransform(
    [px, py],
    ([x, y]) =>
      `radial-gradient(420px circle at ${x * 100}% ${y * 100}%, ${hexToRgba(accent, 0.16)}, transparent 65%)`
  );

  const onMouseMove = useCallback(
    (e) => {
      if (!enabled) return;
      const r = e.currentTarget.getBoundingClientRect();
      px.set((e.clientX - r.left) / r.width);
      py.set((e.clientY - r.top) / r.height);
    },
    [enabled, px, py]
  );

  const onMouseLeave = useCallback(() => {
    px.set(0.5);
    py.set(0.5);
  }, [px, py]);

  return {
    enabled,
    handlers: { onMouseMove, onMouseLeave },
    tiltStyle: enabled ? { rotateX, rotateY, transformPerspective: 900 } : {},
    glowStyle: enabled && glow ? { background: glowBackground } : undefined,
  };
}