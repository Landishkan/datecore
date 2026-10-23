// src/components/layout/Header.jsx
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { studio } from '../../data/texts';
import Button from '../ui/Button';

const NAV = [
  { label: 'Услуги', hash: 'services' },
  { label: 'Демо', hash: 'demo' },
  { label: 'Вопросы', hash: 'faq' },
  { label: 'Контакты', hash: 'contacts' },
];

export default function Header({ onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 8));

  /* Scroll-spy активного пункта (только на главной) */
  useEffect(() => {
    if (location.pathname !== '/') {
      setActive('');
      return;
    }
    const els = NAV.map((n) => document.getElementById(n.hash)).filter(Boolean);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [location.pathname]);

  const go = (hash) => (e) => {
    e.preventDefault();
    setOpen(false);
    onNavigate(hash);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        scrolled ? 'border-b border-line/60 bg-ink/70 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
        <Link
          to="/"
          data-hover="открыть"
          className="font-display text-lg font-extrabold tracking-tight text-paper"
          onClick={(e) => {
            e.preventDefault();
            setOpen(false);
            onNavigate('top');
          }}
        >
          {studio.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Основная навигация">
          {NAV.map((n) => (
            <a
              key={n.hash}
              href={`/#${n.hash}`}
              onClick={go(n.hash)}
              className={`link-underline text-sm transition-colors duration-300 ${
                active === n.hash ? 'text-accent' : 'text-muted hover:text-paper'
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="accent"
            size="sm"
            className="hidden sm:inline-flex"
            onClick={() => onNavigate('contacts')}
          >
            Обсудить проект
          </Button>

          <button
            type="button"
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] rounded-full border border-line md:hidden"
          >
            <motion.span
              className="block h-[1.5px] w-5 bg-paper"
              animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="block h-[1.5px] w-5 bg-paper"
              animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="fixed inset-0 top-16 z-30 flex flex-col items-start gap-2 bg-ink/95 px-6 py-10 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
            exit={{ opacity: 0, y: -16, transition: { duration: 0.25, ease: [0.5, 0, 0.75, 0] } }}
            aria-label="Мобильная навигация"
          >
            {NAV.map((n, i) => (
              <motion.a
                key={n.hash}
                href={`/#${n.hash}`}
                onClick={go(n.hash)}
                className="font-display text-3xl font-extrabold text-paper"
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.06 * i, duration: 0.4 } }}
              >
                {n.label}
              </motion.a>
            ))}
            <Button variant="accent" className="mt-6" onClick={go('contacts')}>
              Обсудить проект
            </Button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}