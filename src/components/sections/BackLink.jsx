// src/components/sections/BackLink.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function BackLink({ to = '/', label = 'На главную', accent = '#2FA9F9' }) {
  return (
    <div className="py-12 text-center">
      <Link to={to} className="group inline-flex items-center gap-2 text-muted hover:text-paper">
        <motion.span
          className="inline-block"
          whileHover={{ x: -4 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          ←
        </motion.span>
        <span className="link-underline" style={{ color: accent }}>
          {label}
        </span>
      </Link>
    </div>
  );
}