import { Clock, DollarSign, Shield, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const benefits = [
  { key: 'time', icon: Clock },
  { key: 'cost', icon: DollarSign },
  { key: 'scale', icon: TrendingUp },
  { key: 'quality', icon: Shield },
];

export function Benefits() {
  const { t } = useTranslation();

  return (
    <section style={{ paddingTop: '8rem', paddingBottom: '8rem' }} className="relative">
      <div style={{ maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '1rem', paddingRight: '1rem' }} className="relative z-10">
        {/* Section header */}
        <div className="text-center mb-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 pb-2" style={{ paddingBottom: '2.5rem' }}>
            {t('benefits.title')}
          </h2>
        </div>

        {/* Benefits - Cards on mobile, grid on desktop */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {benefits.map((benefit) => (
            <div
              key={benefit.key}
              className="text-center p-4 sm:p-6 lg:p-8"
            >
              <div style={{ width: '4rem', height: '4rem', marginLeft: 'auto', marginRight: 'auto', borderRadius: '1rem', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <benefit.icon size={32} color="var(--color-primary)" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.75rem', color: 'white' }}>
                {t(`benefits.${benefit.key}.title`)}
              </h3>
              <p style={{ color: 'var(--color-text-muted)' }}>
                {t(`benefits.${benefit.key}.description`)}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile Card View */}
        <div className="flex flex-col gap-4 sm:hidden" style={{ marginRight: '1rem' }}>
          {benefits.map((benefit) => (
            <div
              key={benefit.key}
              className="flex items-start gap-4 p-4"
            >
              <div style={{ width: '3rem', height: '3rem', flexShrink: 0, borderRadius: '0.75rem', background: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <benefit.icon size={24} color="var(--color-primary)" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.25rem', color: 'white' }}>
                  {t(`benefits.${benefit.key}.title`)}
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  {t(`benefits.${benefit.key}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
