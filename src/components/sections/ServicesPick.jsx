// src/components/sections/ServicesPick.jsx
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import Scatter from '../motion/Scatter';
import SlideIn from '../motion/SlideIn';
import useTilt from '../../hooks/useTilt';
import { services } from '../../data/services';

export default function ServicesPick() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section id="services" ref={ref} className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-16 text-center">
          <Scatter
            as="h2"
            className="font-display text-4xl font-black leading-tight tracking-[-0.02em] md:text-6xl"
            parts={[
              { text: 'А что нужно ', accent: false },
              { text: 'вам', accent: true },
              { text: '?', accent: false },
            ]}
          />
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index, inView }) {
  const tilt = useTilt({ max: 3, accent: service.accent });
  const [hovered, setHovered] = useState(false);

  const slideFrom = index === 0 ? 'left' : index === 1 ? 'bottom' : 'right';
  const slideDistance = index === 0 || index === 2 ? 200 : 120;
  const slideRotate = index === 0 ? -3 : index === 2 ? 3 : 0;

  return (
    <SlideIn
      from={slideFrom}
      distance={slideDistance}
      rotate={slideRotate}
      delay={index * 0.15}
    >
      <Link
        to={`/${service.slug}`}
        data-hover="открыть"
        className="group relative block h-full"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        <motion.div
          className={`relative h-full rounded-[28px] border border-line bg-card p-8 transition-colors duration-300 ${
            hovered ? 'border-opacity-100' : ''
          }`}
          style={{
            ...tilt.tiltStyle,
            borderColor: hovered ? service.accent : undefined,
          }}
          animate={{ y: hovered ? -6 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {tilt.glowStyle && (
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-300"
              style={tilt.glowStyle}
              animate={{ opacity: hovered ? 1 : 0 }}
            />
          )}

          <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-xl bg-card2">
            {service.mockupType === 'site' && (
              <motion.div
                className="h-full w-full bg-gradient-to-br from-card to-card2"
                animate={{ scale: hovered ? 1.06 : 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
            {service.mockupType === 'bot' && (
              <div className="relative h-full w-full bg-card2 p-4">
                <div className="mb-2 h-3 w-16 rounded-full bg-accent/20" />
                <div className="mb-2 h-3 w-24 rounded-full bg-line" />
                <motion.div
                  className="absolute bottom-4 right-4 h-3 w-20 rounded-full bg-accent/30"
                  initial={{ y: 20, opacity: 0 }}
                  animate={hovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                />
              </div>
            )}
            {service.mockupType === 'automation' && (
              <svg className="h-full w-full" viewBox="0 0 200 150">
                <motion.circle cx="50" cy="50" r="8" fill={service.accent} />
                <motion.circle cx="150" cy="100" r="8" fill={service.accent} />
                <motion.line
                  x1="50"
                  y1="50"
                  x2="150"
                  y2="100"
                  stroke={service.accent}
                  strokeWidth="2"
                  strokeDasharray="200"
                  animate={{ strokeDashoffset: hovered ? 0 : 200 }}
                  transition={{ duration: 2, repeat: hovered ? Infinity : 0 }}
                />
              </svg>
            )}
          </div>

          <h3 className="font-display text-2xl font-black text-paper md:text-3xl">
            {service.title}
          </h3>
          <p className="mt-3 text-muted">{service.desc}</p>

          <div className="mt-6 flex items-center justify-between">
            <span className="font-display text-xl font-bold italic" style={{ color: service.accent }}>
              {service.price}
            </span>
            <motion.div
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line"
              animate={{ x: hovered ? 4 : 0, y: hovered ? -4 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </SlideIn>
  );
}