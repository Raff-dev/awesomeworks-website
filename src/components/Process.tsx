import { FileText, HeartHandshake, MessageCircle, Rocket } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const steps = [
  { key: 'step1', icon: MessageCircle },
  { key: 'step2', icon: FileText },
  { key: 'step3', icon: Rocket },
  { key: 'step4', icon: HeartHandshake },
];

export function Process() {
  const { t } = useTranslation();

  return (
    <section style={{ paddingTop: '8rem', paddingBottom: '8rem' }} className="relative">
      <div style={{ maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '1rem', paddingRight: '1rem' }}>
        {/* Section header */}
        <div className="text-center mb-32">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 pb-2" style={{ paddingBottom: '2.5rem' }}>
            {t('process.title')}
          </h2>
        </div>

        {/* Process steps - Timeline on mobile, grid on desktop */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={step.key} style={{ position: 'relative' }}>
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block" style={{ position: 'absolute', top: '2rem', left: '60%', width: '100%', height: '2px', background: 'linear-gradient(to right, var(--color-primary), transparent)' }} />
              )}

              <div className="text-center p-4 sm:p-6">
                {/* Step number */}
                <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ width: '4rem', height: '4rem', borderRadius: '9999px', background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <step.icon size={28} color="white" />
                  </div>
                  <div style={{ position: 'absolute', top: '-0.5rem', right: '-0.5rem', width: '1.75rem', height: '1.75rem', borderRadius: '9999px', backgroundColor: 'var(--color-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', fontWeight: 'bold' }}>
                    {index + 1}
                  </div>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.75rem', color: 'white' }}>
                  {t(`process.${step.key}.title`)}
                </h3>
                <p style={{ color: 'var(--color-text-muted)' }}>
                  {t(`process.${step.key}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Timeline View */}
        <div className="sm:hidden relative" style={{ marginRight: '1.5rem' }}>
          {/* Vertical line */}
          <div style={{ position: 'absolute', left: '1.75rem', top: '1.5rem', bottom: '1.5rem', width: '2px', background: 'linear-gradient(to bottom, var(--color-primary), var(--color-secondary))' }} />
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {steps.map((step, index) => (
              <div key={step.key} className="flex items-start gap-5">
                {/* Icon with number */}
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '9999px', background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, position: 'relative' }}>
                    <step.icon size={22} color="white" />
                  </div>
                  <div style={{ position: 'absolute', top: '-0.4rem', right: '-0.4rem', width: '1.5rem', height: '1.5rem', borderRadius: '9999px', backgroundColor: 'var(--color-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold', zIndex: 11 }}>
                    {index + 1}
                  </div>
                </div>
                
                {/* Content */}
                <div className="pt-2 flex-1" style={{ paddingRight: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'white' }}>
                    {t(`process.${step.key}.title`)}
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {t(`process.${step.key}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
