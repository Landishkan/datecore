// src/components/sections/Hero.jsx
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SilkBackground from '../backgrounds/SilkBackground';
import PillBadge from '../ui/PillBadge';
import Button from '../ui/Button';
import LineMask from '../motion/LineMask';

export default function Hero({ onNavigate }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20"
    >
      <SilkBackground parallax={false} />

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto max-w-5xl px-5 text-center">
        <PillBadge className="mb-8">Веб-студия двух разработчиц</PillBadge>

        <LineMask
          as="h1"
          className="font-display text-[clamp(2.8rem,7vw,5.5rem)] font-black leading-[1.05] tracking-[-0.02em]"
          lines={['Сайты, боты и автоматизация.', 'Под ваш бюджет.']}
          renderLine={(line, i) =>
            i === 1 ? (
              <em className="accent-italic text-accent">{line}</em>
            ) : (
              <span className="text-volume">{line}</span>
            )
          }
        />

        <motion.p
          className="mx-auto mt-8 max-w-2xl text-lg text-muted md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Без заоблачных цен и бесконечных сроков. Демо до оплаты.
        </motion.p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button variant="accent" onClick={() => onNavigate('contacts')}>
            Обсудить проект
          </Button>
          <Button variant="ghost" onClick={() => onNavigate('demo')}>
            Смотреть демо
          </Button>
        </div>

        <motion.div
          className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs text-muted"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <span>листай</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}