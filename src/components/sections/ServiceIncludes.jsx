// src/components/sections/ServiceIncludes.jsx
import FadeIn from '../motion/FadeIn';

export default function ServiceIncludes({ items = [], accent = '#2FA9F9' }) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <h2 className="mb-10 font-display text-3xl font-black text-volume md:text-4xl">
          Что <em className="accent-italic" style={{ color: accent }}>входит</em>
        </h2>

        <div className="flex flex-col gap-4">
          {items.map((item, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="rounded-2xl border border-line bg-card p-6">
                <p className="text-lg text-paper">
                  <span className="font-bold">{item.lead}</span> {item.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}