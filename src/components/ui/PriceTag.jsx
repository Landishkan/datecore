// src/components/ui/PriceTag.jsx
/* Цена: «Стартует от» + число курсивом акцентным цветом, крупно */
export default function PriceTag({
  label = 'Стартует от',
  value,
  accent = '#2FA9F9',
  size = 'lg',
  className = '',
}) {
  const sizes = {
    sm: 'text-2xl md:text-3xl',
    lg: 'text-4xl md:text-5xl',
  };

  return (
    <div className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 ${className}`}>
      <span className="text-sm text-muted">{label}</span>
      <span className={`accent-italic ${sizes[size]}`} style={{ color: accent }}>
        {value}
      </span>
    </div>
  );
}