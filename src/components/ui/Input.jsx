// src/components/ui/Input.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';

/* Поле формы: input #1E1E1F, граница #353537, фокус — граница акцентом
   + underline-прорисовка scaleX 0 → 1 */
export default function Input({
  label,
  name,
  type = 'text',
  as = 'input',
  options = [],
  value,
  onChange,
  placeholder,
  required = false,
  accent = '#2FA9F9',
  rows = 4,
}) {
  const [focus, setFocus] = useState(false);

  const controlClass =
    'w-full rounded-xl bg-field px-4 py-3 text-paper placeholder:text-muted/60 focus:outline-none transition-colors duration-300';

  const borderStyle = { borderColor: focus ? accent : '#353537' };

  return (
    <label className="block text-left">
      <span className="mb-2 block text-sm text-muted">{label}</span>
      <span className="relative block">
        {as === 'textarea' ? (
          <textarea
            name={name}
            rows={rows}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            className={`${controlClass} resize-none border`}
            style={borderStyle}
          />
        ) : as === 'select' ? (
          <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            className={`${controlClass} border appearance-none`}
            style={borderStyle}
          >
            {options.map((o) => (
              <option key={o.value} value={o.value} className="bg-field text-paper">
                {o.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            className={`${controlClass} border`}
            style={borderStyle}
          />
        )}

        <motion.span
          className="pointer-events-none absolute -bottom-[1px] left-0 h-[2px] w-full origin-left rounded-full"
          style={{ backgroundColor: accent }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: focus ? 1 : 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        />
      </span>
    </label>
  );
}