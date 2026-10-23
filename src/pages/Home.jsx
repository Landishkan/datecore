// src/pages/Home.jsx
import { PageShell } from '../components/layout/Layout';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import WhyUs from '../components/sections/WhyUs';
import StackCards from '../components/sections/StackCards';
import ServicesPick from '../components/sections/ServicesPick';
import Constellation from '../components/sections/Constellation';
import Process from '../components/sections/Process';
import Marquee from '../components/motion/Marquee';
import Faq from '../components/sections/Faq';

const marqueeItems = [
  'сайты под ключ',
  'telegram-боты',
  'автоматизация данных',
  'демо до оплаты',
  'фикс-цена',
];

export default function Home({ onNavigate }) {
  return (
    <PageShell accent="#2FA9F9">
      <Hero onNavigate={onNavigate} />
      <About />
      <WhyUs />
      <StackCards />
      <ServicesPick />
      <Constellation />
      <Process />
      <Marquee items={marqueeItems} />
      <Faq />
    </PageShell>
  );
}