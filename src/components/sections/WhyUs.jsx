// src/components/sections/WhyUs.jsx
import PillBadge from '../ui/PillBadge';
import Button from '../ui/Button';
import FadeIn from '../motion/FadeIn';
import { whyUs } from '../../data/texts';

export default function WhyUs() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="md:sticky md:top-32 md:self-start">
            <PillBadge>Почему мы</PillBadge>
            <h2 className="mt-6 font-display text-4xl font-black leading-tight tracking-[-0.02em] text-volume md:text-5xl">
              Что вы <em className="accent-italic text-accent">получаете</em>, работая с нами
            </h2>
            <div className="mt-8">
              <Button variant="ghost">Узнать больше</Button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {whyUs.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1} className="rounded-2xl border border-line bg-card p-6">
                <h3 className="font-display text-lg font-bold text-paper">{item.title}</h3>
                <p className="mt-2 text-muted">{item.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}