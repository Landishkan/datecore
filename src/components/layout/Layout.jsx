// src/components/layout/Layout.jsx
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Lenis from 'lenis';
import Header from './Header';
import Footer from './Footer';
import ScrollProgress from './ScrollProgress';
import Cursor from './Cursor';
import { EASE_ENTER, EASE_EXIT } from '../motion/variants';

export const lenisRef = { current: null };

export function scrollToTarget(target, offset = -88) {
  if (target === 'top') {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { duration: 1.1 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;
  if (lenisRef.current) lenisRef.current.scrollTo(el, { offset, duration: 1.1 });
  else el.scrollIntoView({ behavior: 'smooth' });
}

/* Оболочка страницы: curtain-wipe переход между роутами */
export function PageShell({ accent = '#2FA9F9', children }) {
  const reduce = useReducedMotion();
  const location = useLocation();

  useEffect(() => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [location.pathname]);

  const d = reduce ? 0 : undefined;

  return (
    <motion.div className="relative">
      {children}
      <motion.div
        className="pointer-events-none fixed inset-0 z-curtain"
        style={{ backgroundColor: accent, willChange: 'clip-path' }}
        initial={{ clipPath: 'inset(0 0 0 0)' }}
        animate={{ clipPath: 'inset(100% 0 0 0)', transition: { duration: d ?? 0.25, ease: EASE_ENTER, delay: d ?? 0.05 } }}
        exit={{ clipPath: 'inset(0 0 0 0)', transition: { duration: d ?? 0.2, ease: EASE_EXIT } }}
        onAnimationComplete={() => {
          /* will-change снимаем после анимации */
        }}
        aria-hidden="true"
      />
    </motion.div>
  );
}

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  /* Lenis: глобальный плавный скролл */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ lerp: 0.12, smoothWheel: true });
    lenisRef.current = lenis;
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  /* Якоря вида /#hash после смены роута */
  useEffect(() => {
    if (!location.hash) return;
    const t = setTimeout(() => scrollToTarget(location.hash), 80);
    return () => clearTimeout(t);
  }, [location.pathname, location.hash]);

  const handleNavigate = (hash) => {
    if (hash === 'top') {
      if (location.pathname !== '/') navigate('/');
      scrollToTarget('top');
      return;
    }
    if (location.pathname !== '/') {
      navigate(`/#${hash}`);
    } else {
      scrollToTarget(`#${hash}`);
    }
  };

  return (
    <div className="relative min-h-screen bg-ink">
      <ScrollProgress />
      <Cursor />
      <Header onNavigate={handleNavigate} />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  );
}