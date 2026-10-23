// src/components/sections/ServiceTariffs.jsx
import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Card from '../ui/Card';
import PriceTag from '../ui/PriceTag';
import Starburst from '../ui/Starburst';
import Button from '../ui/Button';
import { stackPin } from '../motion/variants';

export default function ServiceTariffs({ tariffs = [], accent = '#2FA9F9' }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <h2 className="mb-16 text-center font-display text-4xl font-black text-volume md:text-5xl">
          <em className="accent-italic" style={{ color: accent }}>Тарифы</em>
        </h2>

        <div ref={containerRef} className="relative" style={{ height: `${tariffs.length * 400}px` }}>
          {tariffs.map((t, i) => (
            <TariffCard key={t.name} tariff={t} index={i} total={tariffs.length} scrollYProgress={scrollYProgress} accent={accent} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TariffCard({ tariff, index, total, scrollYProgress, accent }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  const start = index / total;
  const end = (index + 1) / total;
  const scale = useTransform(scrollYProgress, [start, end], [1, stackPin.scale]);
  const brightness = useTransform(scrollYProgress, [start, end], [1, stackPin.brightness]);

  return (
    <motion.div
      ref={ref}
      className="sticky top-24 mb-6"
      style={{
        scale,
        filter: `brightness(${brightness})`,
        zIndex: total - index,
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
    >
      <Card className={`relative ${tariff.hit ? 'border-2' : ''}`} style={{ borderColor: tariff.hit ? accent : undefined }}>
        {tariff.hit && (
          <Starburst accent={accent} className="absolute -right-4 -top-4" />
        )}

        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <h3 className="font-display text-2xl font-black text-paper md:text-3xl">{tariff.name}</h3>
            <p className="mt-2 text-muted">Срок: {tariff.term}</p>
          </div>
          <PriceTag value={tariff.price} accent={accent} />
        </div>

        <ul className="mt-6 space-y-2">
          {tariff.includes.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-paper">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: accent }} />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Button variant="accent" accent={accent}>
            Выбрать тариф
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}