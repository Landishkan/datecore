// src/components/motion/Marquee.jsx
/* Деликатная лента: rotate(-1.5deg), 45s linear infinite, pause on hover */
export default function Marquee({ items = [], className = '' }) {
  const row = (key, hidden) => (
    <div className="flex shrink-0 items-center" key={key} aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <span
          key={i}
          className="flex items-center gap-6 pr-6 md:gap-10 md:pr-10 whitespace-nowrap font-medium text-muted text-base md:text-xl"
        >
          {t}
          <span className="text-accent text-xl md:text-2xl leading-none select-none">*</span>
        </span>
      ))}
    </div>
  );

  return (
    <section className={`marquee relative overflow-hidden py-10 md:py-14 ${className}`}>
      <div className="rotate-[-1.5deg] scale-x-105">
        <div className="marquee-track flex w-max">
          {row('a', false)}
          {row('b', true)}
        </div>
      </div>
    </section>
  );
}