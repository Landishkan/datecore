// src/components/sections/About.jsx
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import PillBadge from '../ui/PillBadge';
import Counter from '../ui/Counter';
import { EASE_ENTER } from '../motion/variants';
import { team } from '../../data/texts';

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  const counters = [
    { n: 2, label: 'человека' },
    { n: 3, label: 'направления' },
    { n: 0, label: 'скрытых доплат' },
  ];

  return (
    <section className="relative py-24 md:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="overflow-hidden rounded-[28px] bg-island p-8 text-islandink md:p-16">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <PillBadge tone="dark" accent="#141414">
                О студии
              </PillBadge>
              <h2 className="mt-6 font-display text-4xl font-black leading-tight tracking-[-0.02em] md:text-5xl">
                Две разработчицы, которые{' '}
                <em className="accent-italic text-accent">считают ваши деньги</em>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-islandink/80">
                Мы устали смотреть, как малый бизнес переплачивает за сайты и ботов. Поэтому делаем
                цифровые продукты по честным ценам: от визитки до сложной автоматизации. У нас есть
                готовые шаблоны, которые мы адаптируем под вас — это быстрее и дешевле, чем писать с
                нуля.
              </p>
              
              {/* Счетчики — исправленная сетка */}
              <div className="mt-10 grid grid-cols-3 gap-4">
                {counters.map((c, i) => (
                  <div 
                    key={i} 
                    className="flex flex-col rounded-xl border border-islandink/20 p-4 md:p-6"
                  >
                    <div className="font-display text-3xl font-black md:text-4xl">
                      <Counter to={c.n} suffix="" />
                    </div>
                    <div className="mt-2 text-sm font-medium text-islandink/70 md:text-base">
                      {c.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Стикеры команды — исправленное позиционирование */}
            <div className="relative flex min-h-[320px] items-center justify-center md:min-h-[400px]">
              {team.map((m, i) => {
                const baseRotate = i === 0 ? -6 : 8;
                const baseX = i === 0 ? -30 : 30;
                const baseY = i === 0 ? 0 : 20;
                
                return (
                  <motion.div
                    key={m.name}
                    className="absolute w-48 rounded-lg bg-white p-3 shadow-sticker md:w-56"
                    initial={{ scale: 0.9, rotate: i === 0 ? -12 : 12, opacity: 0 }}
                    animate={
                      inView
                        ? { scale: 1, rotate: baseRotate, opacity: 1 }
                        : {}
                    }
                    transition={{
                      delay: 0.2 + i * 0.15,
                      type: 'spring',
                      stiffness: 100,
                      damping: 18,
                    }}
                    whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
                    style={{ 
                      zIndex: i,
                      transform: `translate(${baseX}px, ${baseY}px)`,
                    }}
                  >
                    <div className="mb-3 aspect-square rounded bg-islandink/10" />
                    <div className="font-display text-sm font-bold">{m.name}</div>
                    <div className="mt-1 text-xs text-islandink/60">{m.role}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}