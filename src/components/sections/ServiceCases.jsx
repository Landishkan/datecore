// src/components/sections/ServiceCases.jsx
import { useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { cases } from '../../data/cases';

export default function ServiceCases({ serviceSlug, accent = '#2FA9F9' }) {
  const containerRef = useRef(null);
  const dragControls = useDragControls();

  const filtered = cases.filter((c) => c.serviceSlug === serviceSlug);

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <h2 className="mb-12 font-display text-3xl font-black text-volume md:text-4xl">
          <em className="accent-italic" style={{ color: accent }}>Примеры</em> работ
        </h2>

        <div
          ref={containerRef}
          className="flex cursor-grab gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 md:gap-8"
          onPointerDown={(e) => dragControls.start(e)}
        >
          {filtered.map((c) => (
            <motion.div
              key={c.slug}
              className="w-80 shrink-0 snap-start md:w-96"
              drag="x"
              dragControls={dragControls}
              dragConstraints={containerRef}
            >
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-card">
                <div className="h-full w-full bg-gradient-to-br from-card2 to-card" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-paper">{c.title}</h3>
              <p className="mt-2 text-muted">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}