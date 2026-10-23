// src/pages/ServicePage.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { services } from '../data/services';
import { tariffs } from '../data/tariffs';
import ServiceHero from '../components/sections/ServiceHero';
import ServiceIncludes from '../components/sections/ServiceIncludes';
import ServiceTariffs from '../components/sections/ServiceTariffs';
import ServiceCases from '../components/sections/ServiceCases';
import ServiceForm from '../components/sections/ServiceForm';
import BackLink from '../components/sections/BackLink';
import { PageShell, scrollToTarget } from '../components/layout/Layout';

const includesData = {
  sites: [
    { lead: 'Адаптивная вёрстка.', text: 'Корректно работает на всех устройствах.' },
    { lead: 'SEO-оптимизация.', text: 'Мета-теги, структура, скорость загрузки.' },
    { lead: 'CMS для контента.', text: 'Вы сами меняете тексты и картинки.' },
    { lead: 'Формы и интеграции.', text: 'Заявки приходят в Telegram или на почту.' },
    { lead: 'Хостинг и домен.', text: 'Помогаем выбрать и настроить.' },
  ],
  bots: [
    { lead: 'Меню и команды.', text: 'Удобная навигация для пользователя.' },
    { lead: 'База данных.', text: 'Храним записи, заказы, пользователей.' },
    { lead: 'Админ-панель.', text: 'Управление ботом через Telegram.' },
    { lead: 'Уведомления.', text: 'Автоматические напоминания и рассылки.' },
    { lead: 'Интеграции.', text: 'Google Sheets, CRM, платёжные системы.' },
  ],
  automation: [
    { lead: 'Анализ процессов.', text: 'Находим, что можно автоматизировать.' },
    { lead: 'Связки сервисов.', text: 'Telegram, Google Sheets, CRM, почта.' },
    { lead: 'Парсинг данных.', text: 'Сбор информации с сайтов и сервисов.' },
    { lead: 'Отчёты и логи.', text: 'Видно, что работает, а что нет.' },
    { lead: 'Поддержка.', text: 'Следим, чтобы всё работало стабильно.' },
  ],
};

export default function ServicePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted">Услуга не найдена.</p>
      </div>
    );
  }

  const handleNavigate = (target) => {
    if (target === 'form') {
      scrollToTarget('#contact-form', -88);
    }
  };

  return (
    <PageShell accent={service.accent}>
      <ServiceHero
        badge={service.title}
        title={
          slug === 'sites'
            ? 'Сайты, которые'
            : slug === 'bots'
            ? 'Боты, которые'
            : 'Данные, которые'
        }
        accentWord={
          slug === 'sites' ? 'продают' : slug === 'bots' ? 'работают за вас' : 'считаются сами'
        }
        accent={service.accent}
        onNavigate={handleNavigate}
      />

      <ServiceIncludes items={includesData[slug] || []} accent={service.accent} />

      <ServiceTariffs tariffs={tariffs[slug] || []} accent={service.accent} />

      <ServiceCases serviceSlug={slug} accent={service.accent} />

      <div id="contact-form">
        <ServiceForm accent={service.accent} />
      </div>

      <BackLink to="/" label="На главную" accent={service.accent} />
    </PageShell>
  );
}