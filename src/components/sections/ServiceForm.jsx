// src/components/sections/ServiceForm.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function ServiceForm({ accent = '#2FA9F9', onSubmit }) {
  const [form, setForm] = useState({ name: '', contact: '', budget: '', desc: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (onSubmit) onSubmit(form);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <h2 className="mb-12 text-center font-display text-4xl font-black text-volume md:text-5xl">
          Расскажите о вашей <em className="accent-italic" style={{ color: accent }}>задаче</em>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input label="Имя" name="name" value={form.name} onChange={handleChange} required accent={accent} />
          <Input
            label="Контакт (ТГ или почта)"
            name="contact"
            value={form.contact}
            onChange={handleChange}
            required
            accent={accent}
          />
          <Input
            label="Бюджет"
            name="budget"
            as="select"
            value={form.budget}
            onChange={handleChange}
            required
            accent={accent}
            options={[
              { value: '', label: 'Выберите бюджет' },
              { value: 'до 10к', label: 'До 10 000 ₽' },
              { value: '10-30к', label: '10 000 – 30 000 ₽' },
              { value: '30-70к', label: '30 000 – 70 000 ₽' },
              { value: '70к+', label: '70 000+ ₽' },
            ]}
          />
          <Input
            label="Описание задачи"
            name="desc"
            as="textarea"
            value={form.desc}
            onChange={handleChange}
            required
            accent={accent}
            rows={5}
          />

          <div className="relative">
            <Button variant="accent" accent={accent} type="submit" className="w-full">
              {submitted ? 'Отправлено' : 'Отправить'}
            </Button>

            <AnimatePresence>
              {submitted && (
                <motion.p
                  className="mt-4 text-center text-muted"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  Напишем в течение 24 часов.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </form>
      </div>
    </section>
  );
}