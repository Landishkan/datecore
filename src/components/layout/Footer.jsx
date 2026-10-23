// src/components/layout/Footer.jsx
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import SilkBackground from '../backgrounds/SilkBackground';
import { studio, footer } from '../../data/texts';
import { EASE_ENTER } from '../motion/variants';

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <footer id="contacts" className="relative overflow-hidden border-t border-line/60">
      <SilkBackground seed={21} factor={0.06} />

      <div ref={ref} className="relative mx-auto max-w-7xl px-5 pb-12 pt-20 md:px-8 md:pt-28">
        {/* Огромное имя студии выезжает снизу */}
        <div className="overflow-hidden">
          <motion.h2
            className="text-volume font-display text-[clamp(3rem,12vw,9.5rem)] font-black leading-[0.95] tracking-[-0.02em]"
            initial={{ y: '100%' }}
            animate={inView ? { y: '0%' } : {}}
            transition={{ duration: 0.9, ease: EASE_ENTER }}
          >
            {studio.name}
          </motion.h2>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-sm text-muted">{footer.tagline}</p>
            <div className="mt-6 flex flex-col items-start gap-3">
              <a
                href={studio.telegramUrl}
                target="_blank"
                rel="noreferrer"
                data-hover="написать"
                className="link-underline font-medium text-paper"
              >
                {studio.telegram}
              </a>
              <a href={`mailto:${studio.email}`} data-hover="написать" className="link-underline font-medium text-paper">
                {studio.email}
              </a>
            </div>
          </div>

          <nav className="flex flex-col items-start gap-3" aria-label="Навигация в футере">
            {footer.nav.map((n) => (
              <Link key={n.to} to={n.to} className="link-underline text-sm text-muted hover:text-paper">
                {n.label}
              </Link>
            ))}
          </nav>

          <nav className="flex flex-col items-start gap-3" aria-label="Услуги">
            {footer.services.map((s) => (
              <Link
                key={s.to}
                to={s.to}
                className="group inline-flex items-center gap-2 text-sm text-muted hover:text-paper"
              >
                <span className="link-underline">{s.label}</span>
                <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  ↗
                </span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-line/60 pt-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <span>© 2026 {studio.name}</span>
          <span className="text-muted/70">{footer.easterEgg}</span>
        </div>
      </div>
    </footer>
  );
}