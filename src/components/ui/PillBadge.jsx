// src/components/ui/PillBadge.jsx
/* Маленький pill-бейдж: единственное место, где разрешён капс с разрежением */
export default function PillBadge({ children, accent = '#2FA9F9', tone = 'solid', className = '' }) {
  const tones = {
    solid: 'text-ink',
    outline: 'bg-transparent border',
    dark: 'bg-islandink text-island',
  };

  const style =
    tone === 'solid'
      ? { backgroundColor: accent }
      : tone === 'outline'
      ? { borderColor: accent, color: accent }
      : undefined;

  return (
    <span
      className={`inline-flex items-center rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-badge ${tones[tone]} ${className}`}
      style={style}
    >
      {children}
    </span>
  );
}