import { useTranslation } from 'react-i18next';

export function Hero() {
  const { t } = useTranslation();

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Particles background */}
      <div className="hero-particles">
        <div className="hero-particle" style={{ top: '18%', left: '22%', width: '12px', height: '12px', background: 'rgba(99,102,241,0.18)', animation: 'particle-float-ellipse 7s linear infinite' }} />
        <div className="hero-particle" style={{ top: '60%', left: '30%', width: '8px', height: '8px', background: 'rgba(16,185,129,0.18)', animation: 'particle-float-infinity 9s linear infinite', animationDelay: '2s' }} />
        <div className="hero-particle" style={{ top: '40%', left: '70%', width: '10px', height: '10px', background: 'rgba(99,102,241,0.12)', animation: 'particle-float-ellipse 8s linear infinite', animationDelay: '1.5s' }} />
        <div className="hero-particle" style={{ top: '75%', left: '60%', width: '7px', height: '7px', background: 'rgba(16,185,129,0.12)', animation: 'particle-float-infinity 10s linear infinite', animationDelay: '3s' }} />
        <div className="hero-particle" style={{ top: '30%', left: '80%', width: '6px', height: '6px', background: 'rgba(255,255,255,0.10)', animation: 'particle-float-ellipse 11s linear infinite', animationDelay: '4s' }} />
        {/* More particles */}
        <div className="hero-particle" style={{ top: '12%', left: '55%', width: '9px', height: '9px', background: 'rgba(99,102,241,0.14)', animation: 'particle-float-infinity 12s linear infinite', animationDelay: '0.5s' }} />
        <div className="hero-particle" style={{ top: '82%', left: '18%', width: '11px', height: '11px', background: 'rgba(16,185,129,0.16)', animation: 'particle-float-ellipse 10s linear infinite', animationDelay: '2.5s' }} />
        <div className="hero-particle" style={{ top: '50%', left: '12%', width: '7px', height: '7px', background: 'rgba(255,255,255,0.08)', animation: 'particle-float-infinity 13s linear infinite', animationDelay: '1s' }} />
        <div className="hero-particle" style={{ top: '25%', left: '42%', width: '5px', height: '5px', background: 'rgba(99,102,241,0.12)', animation: 'particle-float-ellipse 9s linear infinite', animationDelay: '3.5s' }} />
        <div className="hero-particle" style={{ top: '68%', left: '85%', width: '8px', height: '8px', background: 'rgba(16,185,129,0.14)', animation: 'particle-float-infinity 11s linear infinite', animationDelay: '0s' }} />
        <div className="hero-particle" style={{ top: '90%', left: '45%', width: '6px', height: '6px', background: 'rgba(99,102,241,0.10)', animation: 'particle-float-ellipse 14s linear infinite', animationDelay: '4.5s' }} />
        <div className="hero-particle" style={{ top: '8%', left: '75%', width: '10px', height: '10px', background: 'rgba(16,185,129,0.12)', animation: 'particle-float-infinity 8s linear infinite', animationDelay: '1.8s' }} />
        <div className="hero-particle" style={{ top: '45%', left: '92%', width: '5px', height: '5px', background: 'rgba(255,255,255,0.09)', animation: 'particle-float-ellipse 15s linear infinite', animationDelay: '2.2s' }} />
        <div className="hero-particle" style={{ top: '55%', left: '5%', width: '8px', height: '8px', background: 'rgba(99,102,241,0.11)', animation: 'particle-float-infinity 10s linear infinite', animationDelay: '3.8s' }} />
      </div>
      {/* Background gradient effects - radial gradients for smoothness */}
      <div
        className="absolute top-[15%] left-0 w-[42rem] h-[42rem] rounded-full animate-float"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, rgba(99,102,241,0.12) 30%, transparent 80%)",
          filter: 'blur(120px)'
        }}
      />
      <div
        className="absolute bottom-[15%] right-0 w-[42rem] h-[42rem] rounded-full animate-float"
        style={{
          background: "radial-gradient(circle, rgba(16,185,129,0.18) 0%, rgba(16,185,129,0.12) 30%, transparent 80%)",
          filter: 'blur(120px)',
          animationDelay: '3s'
        }}
      />

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Main heading */}
        <h1 style={{ marginBottom: '2rem' }} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
          {t('hero.title')}{' '}
          <span className="gradient-text">{t('hero.titleHighlight')}</span>
        </h1>

        {/* Subtitle */}
        <p style={{ textAlign: 'center', maxWidth: '42rem', marginLeft: 'auto', marginRight: 'auto', marginBottom: '3rem' }} className="text-lg sm:text-xl text-[var(--color-text-muted)] px-4">
          {t('hero.subtitle')}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <button onClick={() => scrollTo('contact')} className="btn-primary text-lg">
            {t('hero.cta')}
          </button>
          <button onClick={() => scrollTo('services')} className="btn-secondary text-lg">
            {t('hero.ctaSecondary')}
          </button>
        </div>
      </div>
    </section>
  );
}
