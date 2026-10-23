// src/components/layout/ScrollProgress.jsx
import { motion, useScroll, useSpring } from 'framer-motion';

/* Линия прогресса скролла 2px акцентом, scaleX = progress */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-accent"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}