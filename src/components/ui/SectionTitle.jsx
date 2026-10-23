// src/components/ui/SectionTitle.jsx
/* Дисплейный заголовок с объёмной заливкой и курсивным акцентным словом */
export default function SectionTitle({
  as = 'h2',
  pre = '',
  accentWord = '',
  post = '',
  accent = '#2FA9F9',
  align = 'left',
  className = '',
}) {
  const Comp = as;

  return (
    <Comp
      className={`text-volume font-display font-extrabold tracking-[-0.02em] ${
        align === 'center' ? 'text-center' : ''
      } ${className}`}
    >
      {pre}
      {accentWord && (
        <>
          {' '}
          <em className="accent-italic" style={{ color: accent }}>
            {accentWord}
          </em>
        </>
      )}
      {post ? ` ${post}` : ''}
    </Comp>
  );
}