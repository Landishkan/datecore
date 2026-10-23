// src/components/sections/Constellation.jsx
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { cases } from '../../data/cases';

export default function Constellation() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section id="demo" ref={ref} className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <h2 className="mb-16 text-center font-display text-4xl font-black text-volume md:text-5xl">
          Созвездие <em className="accent-italic text-accent">демо</em>
        </h2>

        <div className="relative">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            {cases.slice(0, -1).map((_, i) => {
              const x1 = `${((i + 0.5) / cases.length) * 100}%`;
              const x2 = `${((i + 1.5) / cases.length) * 100}%`;
              return (
                <motion.line
                  key={i}
                  x1={x1}
                  y1="50%"
                  x2={x2}
                  y2="50%"
                  stroke="#353537"
                  strokeWidth="1"
                  strokeDasharray="100"
                  initial={{ strokeDashoffset: 100 }}
                  animate={inView ? { strokeDashoffset: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                />
              );
            })}
          </svg>

          <div className="grid gap-8 md:grid-cols-4">
            {cases.map((c, i) => (
              <motion.div
                key={c.slug}
                initial={{ scale: 0.92, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: i * 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={`/${c.serviceSlug}`}
                  data-hover="открыть"
                  className="group block"
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-card grayscale transition-all duration-500 group-hover:grayscale-0">
                    <div className="h-full w-full bg-gradient-to-br from-card2 to-card" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-paper">
                    {c.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{c.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}