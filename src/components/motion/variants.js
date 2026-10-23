// src/components/motion/variants.js
export const EASE_ENTER = [0.22, 1, 0.36, 1];
export const EASE_EXIT = [0.5, 0, 0.75, 0];

export const VIEWPORT = { once: true, margin: '-10% 0px' };

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_ENTER } },
};

export const slideLeft = {
  hidden: { opacity: 0, x: -80 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE_ENTER } },
};

export const slideRight = {
  hidden: { opacity: 0, x: 80 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE_ENTER } },
};

export const slideBottom = {
  hidden: { opacity: 0, y: 100 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_ENTER } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE_ENTER } },
};

export const curtain = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  show: { clipPath: 'inset(0 0 0 0)', transition: { duration: 0.45, ease: EASE_ENTER } },
};

/* Строки заголовка в overflow-hidden, y: 110% → 0 */
export const lineMask = {
  hidden: { y: '110%' },
  show: (i = 0) => ({
    y: '0%',
    transition: { duration: 0.9, ease: EASE_ENTER, delay: i * 0.12 },
  }),
};

/* Посимвольный разлёт → spring в ноль */
export const scatterContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035, delayChildren: 0.05 } },
};

export const scatterItem = {
  hidden: (seed) => ({
    opacity: 0,
    x: seed.x,
    y: seed.y,
    rotate: seed.r,
    scale: seed.s,
  }),
  show: () => ({
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 130, damping: 15, mass: 0.9 },
  }),
};

export function makeScatterSeeds(count) {
  return Array.from({ length: count }, () => ({
    x: (Math.random() - 0.5) * 160,
    y: (Math.random() - 0.5) * 120,
    r: (Math.random() - 0.5) * 40,
    s: 0.6 + Math.random() * 0.5,
  }));
}

/* Конфиг stacked pinned карточек тарифов */
export const stackPin = {
  top: 96,
  gap: 24,
  scale: 0.96,
  brightness: 0.7,
};

/* Помощник: добавить задержку к variant */
export function withDelay(variant, delay) {
  return {
    ...variant,
    show: {
      ...variant.show,
      transition: { ...variant.show.transition, delay },
    },
  };
}

/* Помощник: обнулить длительности для prefers-reduced-motion */
export function reduced(variant) {
  const kill = (t = {}) => ({ ...t, duration: 0, delay: 0 });
  return {
    hidden: variant.hidden,
    show: { ...variant.show, transition: kill(variant.show.transition) },
  };
}