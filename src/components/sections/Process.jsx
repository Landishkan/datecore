// src/components/sections/Process.jsx
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import FadeIn from '../motion/FadeIn';
import { process } from '../../data/texts';

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section className="py-24 md:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-5 md:px-8">
        <h2 className="mb-16 text-center font-display text-4xl font-black text-volume md:text-5xl">
          Как мы <em className="accent-italic text-accent">работаем</em>
        </h2>

        <div className="relative">
          <motion.div
            className="absolute left-0 right-0 top-8 hidden h-[2px] bg-line md:block"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            aria-hidden="true"
          />

          <div className="grid gap-8 md:grid-cols-4">
            {process.map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.15}>
                <div className="relative rounded-2xl border border-line bg-card p-8">
                  <div className="mb-4 font-display text-5xl font-black italic text-accent">
                    {step.num}
                  </div>
                  <h3 className="font-display text-xl font-bold text-paper">
                    {step.title}
                  </h3>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}