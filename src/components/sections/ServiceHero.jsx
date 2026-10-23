// src/components/sections/ServiceHero.jsx
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SilkBackground from '../backgrounds/SilkBackground';
import PillBadge from '../ui/PillBadge';
import Button from '../ui/Button';
import LineMask from '../motion/LineMask';

export default function ServiceHero({ badge, title, accentWord, accent, onNavigate }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[70vh] items-center justify-center overflow-hidden pt-20">
      <SilkBackground parallax={false} />

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto max-w-5xl px-5 text-center">
        <PillBadge accent={accent}>{badge}</PillBadge>

        <LineMask
          as="h1"
          className="mt-8 font-display text-[clamp(2.8rem,7vw,5.5rem)] font-black leading-[1.05] tracking-[-0.02em]"
          lines={[title, accentWord]}
          renderLine={(line, i) =>
            i === 1 ? (
              <em className="accent-italic" style={{ color: accent }}>
                {line}
              </em>
            ) : (
              <span className="text-volume">{line}</span>
            )
          }
        />

        <div className="mt-10">
          <Button variant="accent" accent={accent} onClick={() => onNavigate('form')}>
            Обсудить проект
          </Button>
        </div>
      </motion.div>
    </section>
  );
}