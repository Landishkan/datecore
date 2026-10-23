// src/components/ui/Card.jsx
/* Плотная серая карточка со щедрыми внутренними отступами */
export default function Card({
  children,
  className = '',
  tone = 'card',
  radius = 24,
  border = true,
  padding = 'p-7 md:p-10',
}) {
  return (
    <div
      className={`${tone === 'card2' ? 'bg-card2' : 'bg-card'} ${
        border ? 'border border-line' : ''
      } ${padding} ${className}`}
      style={{ borderRadius: radius }}
    >
      {children}
    </div>
  );
}