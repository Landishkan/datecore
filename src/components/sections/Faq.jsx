// src/components/sections/Faq.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faq } from '../../data/faq';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <h2 className="mb-16 text-center font-display text-4xl font-black text-volume md:text-5xl">
          <em className="accent-italic text-accent">FAQ</em>
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {faq.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-line bg-card p-6"
            >
              <button
                type="button"
                onClick={() => toggle(i)}
                className="flex w-full items-start justify-between gap-4 text-left"
                aria-expanded={openIndex === i}
              >
                <span className="font-display text-lg font-bold text-paper">
                  {item.q}
                </span>
                <motion.div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent"
                  animate={{ rotate: openIndex === i ? 90 : 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0B0B0C" strokeWidth="2.5">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 text-muted">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}