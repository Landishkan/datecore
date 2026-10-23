// src/components/ui/Button.jsx
import { motion } from 'framer-motion';
import useMagnetic from '../../hooks/useMagnetic';
import { hexToRgba } from '../../hooks/useTilt';

/* Кнопка-пилюля. variant: 'accent' | 'ghost'. Магнитная, hover — свечение + translateY(-2px). */
export default function Button({
  children,
  variant = 'accent',
  size = 'md',
  accent = '#2FA9F9',
  onClick,
  href,
  type = 'button',
  className = '',
  hoverLabel,
  ariaLabel,
}) {
  const magnetic = useMagnetic({ strength: 6 });

  const sizes = {
    sm: 'px-5 py-2 text-sm',
    md: 'px-7 py-3 text-sm md:text-base',
    lg: 'px-9 py-4 text-base',
  };

  const base = `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-300 select-none ${sizes[size]} ${className}`;

  const look =
    variant === 'accent'
      ? 'text-ink'
      : 'border border-line bg-transparent text-paper hover:border-paper/40';

  const style =
    variant === 'accent' ? { backgroundColor: accent } : undefined;

  const Comp = href ? motion.a : motion.button;

  return (
    <motion.span
      className="inline-block"
      style={magnetic.style}
      {...magnetic.handlers}
    >
      <Comp
        href={href || undefined}
        type={href ? undefined : type}
        onClick={onClick}
        aria-label={ariaLabel}
        data-hover={hoverLabel}
        className={`${base} ${look}`}
        style={style}
        whileHover={{ y: -2, boxShadow: `0 0 28px ${hexToRgba(accent, variant === 'accent' ? 0.4 : 0.25)}` }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        {children}
      </Comp>
    </motion.span>
  );
}