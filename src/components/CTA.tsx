import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function CTA() {
  const { t } = useTranslation();

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg opacity-10" />
      <div className="absolute top-0 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-[var(--color-primary)] rounded-full filter blur-[128px] opacity-30" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-[var(--color-secondary)] rounded-full filter blur-[128px] opacity-30" />

      <div style={{ maxWidth: '56rem', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }} className="px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
          {t('cta.title')}
        </h2>
        <p className="text-lg text-[var(--color-text-muted)] mb-10 max-w-2xl mx-auto">
          {t('cta.subtitle')}
        </p>
        <button
          onClick={() => scrollTo('contact')}
          className="btn-primary text-lg flex items-center gap-2 mx-auto"
        >
          {t('cta.button')}
          <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
}
