// src/components/sections/StackCards.jsx
import FadeIn from '../motion/FadeIn';
import { stack } from '../../data/stack';

export default function StackCards() {
  return (
    <section className="border-y border-line/40 bg-card2/30 py-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="mb-8 text-center text-sm uppercase tracking-badge text-muted">
          С чем работаем
        </p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {stack.map((tech, i) => (
            <FadeIn key={tech} delay={i * 0.05} className="rounded-xl border border-line bg-card px-8 py-4">
              <span className="font-display text-xl font-bold italic text-paper">{tech}</span>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}