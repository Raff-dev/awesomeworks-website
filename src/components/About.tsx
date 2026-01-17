import { useTranslation } from 'react-i18next';

export function About() {
  const { t } = useTranslation();

  return (
    <section id="about" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }} className="relative py-16 lg:py-0">
      <div style={{ maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Photos */}
          <div className="relative mb-8 lg:mb-0 order-2 lg:order-1 flex justify-center lg:block">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-md">
              <div style={{ position: 'relative', borderRadius: '1.5rem', overflow: 'hidden', aspectRatio: '3/4' }}>
                <img
                  src="/20241017_142110.jpg"
                  alt="Rafał - founder"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ position: 'relative', borderRadius: '1.5rem', overflow: 'hidden', aspectRatio: '3/4', marginTop: '2rem' }}>
                <img
                  src="/IMG_0768.jpg"
                  alt="Rafał - AI consultant"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%', transform: 'scale(1.2)' }}
                />
              </div>
            </div>
          </div>
          {/* Right side - Content */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
              {t('about.heading')}
            </h2>
            {/* Claim/gradient */}
            <div className="mb-6">
              {/* Claim removed as requested */}
            </div>
            {/* About text */}
            <div className="mb-8">
              <p className="text-xl text-white font-medium mb-3 leading-snug">
                {t('about.intro')}
              </p>
              <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
                {t('about.experience')} <span className="gradient-text">Generative AI</span>.<br/>
                {t('about.description')}
              </p>
            </div>
            {/* Signature */}
            <div className="text-right lg:text-right pr-4 sm:pr-0">
              <span style={{ color: 'var(--color-text-muted)', fontStyle: 'italic', fontSize: '1.1rem' }}>
                ~ Rafał Łazicki
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
