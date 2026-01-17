import { Bot, Cog, Lightbulb, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const services = [
  {
    key: 'consulting',
    icon: Lightbulb,
  },
  {
    key: 'chatbots',
    icon: MessageSquare,
  },
  {
    key: 'agents',
    icon: Bot,
  },
  {
    key: 'automation',
    icon: Cog,
  },
];

export function Services() {
  const { t } = useTranslation();

  return (
    <section id="services" style={{ paddingTop: '8rem', paddingBottom: '8rem' }} className="relative">
      <div style={{ maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '1rem', paddingRight: '1rem' }}>
        {/* Section header */}
        <div className="flex flex-col items-center justify-center mb-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-center">
            {t('services.title')}
          </h2>
          <p className="text-lg text-[var(--color-text-muted)] max-w-2xl text-center mb-2">
            {t('services.subtitle')}
          </p>
        </div>
        <div style={{ height: '2.5rem' }} />

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {services.map((service, idx) => (
            <div
              key={service.key}
              className={
                `group rounded-3xl shadow-xl shadow-indigo-900/20 border border-transparent hover:border-[var(--color-primary)]/60 hover:scale-102 hover:shadow-2xl transition-all duration-300 cursor-default ` +
                (idx % 2 === 0 ? 'card-gradient-animate-left' : 'card-gradient-animate-right')
              }
              style={{
                minHeight: '200px',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(18px) saturate(1.3)',
                WebkitBackdropFilter: 'blur(18px) saturate(1.3)',
                border: '1.5px solid rgba(255,255,255,0.13)',
                boxShadow: '0 8px 32px 0 rgba(31,38,135,0.18)',
                padding: '2.5rem 2rem'
              }}
            >
              <div className="flex flex-col gap-5">
                <div className="flex items-center mb-2 pl-2 pr-4 pt-2">
                  <div className="w-16 h-16 flex items-center justify-center mr-6 transition-transform duration-300">
                    <service.icon size={32} className="text-white drop-shadow-lg" />
                  </div>
                  <h3 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-md pl-1">
                    {t(`services.${service.key}.title`)}
                  </h3>
                </div>
                <p className="text-lg text-[var(--color-text-muted)] leading-relaxed mt-2 px-5 pb-2" style={{ lineHeight: 1.8 }}>
                  {t(`services.${service.key}.description`)}
                </p>
              </div>
              {/* Subtle border highlight on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-emerald-400/30 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
