// src/components/ui/Starburst.jsx
/* Starburst-наклейка «Хит»: звезда-взрыв, rotate -12deg */
const POINTS = (() => {
  const spikes = 12;
  const cx = 50;
  const cy = 50;
  const R = 50;
  const r = 37;
  const pts = [];
  for (let i = 0; i < spikes * 2; i++) {
    const rad = (Math.PI * i) / spikes - Math.PI / 2;
    const rr = i % 2 === 0 ? R : r;
    pts.push(`${(cx + rr * Math.cos(rad)).toFixed(2)},${(cy + rr * Math.sin(rad)).toFixed(2)}`);
  }
  return pts.join(' ');
})();

export default function Starburst({ accent = '#2FA9F9', label = 'Хит', size = 104, className = '' }) {
  return (
    <div
      className={`pointer-events-none relative select-none -rotate-12 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" className="h-full w-full" style={{ filter: `drop-shadow(0 8px 24px ${accent}55)` }}>
        <polygon points={POINTS} fill={accent} />
      </svg>
      <span className="absolute inset-0 grid place-items-center font-display text-sm font-extrabold text-ink">
        {label}
      </span>
    </div>
  );
}