// src/data/texts.js
export const studio = {
  name: 'Date Core',
  telegram: '@duetkod',
  telegramUrl: 'https://t.me/duetkod',
  email: 'hello@duetkod.ru',
};

export const team = [
  {
    name: 'Ландыш',
    role: 'fullstack, безопасность, сервер',
  },
  {
    name: 'Лиана',
    role: 'ТГ-боты, дизайн, маркетинг',
  },
];

export const whyUs = [
  {
    title: 'Фиксированная цена',
    desc: 'Смета не меняется после брифа.',
  },
  {
    title: 'Демо до оплаты',
    desc: 'Сначала рабочий прототип, потом деньги.',
  },
  {
    title: 'Поддержка 3 месяца',
    desc: 'Мелкие правки бесплатно после запуска.',
  },
  {
    title: 'Шаблоны + кастомизация',
    desc: 'Быстрее и дешевле разработки с нуля.',
  },
  {
    title: 'Безопасность',
    desc: 'Инфраструктура и бэкапы настроены с первого дня.',
  },
];

export const process = [
  { num: '01', title: 'Бриф и смета' },
  { num: '02', title: 'Демо-прототип' },
  { num: '03', title: 'Оплата' },
  { num: '04', title: 'Запуск и поддержка' },
];

export const footer = {
  tagline: 'Веб-студия двух разработчиц. Сайты, боты и автоматизация без заоблачных цен.',
  nav: [
    { label: 'Услуги', to: '/#services' },
    { label: 'Демо', to: '/#demo' },
    { label: 'Вопросы', to: '/#faq' },
    { label: 'Контакты', to: '/#contacts' },
  ],
  services: [
    { label: 'Сайты', to: '/sites' },
    { label: 'Telegram-боты', to: '/bots' },
    { label: 'Автоматизация', to: '/automation' },
  ],
  easterEgg: 'Сделано на React двумя парами рук.',
};