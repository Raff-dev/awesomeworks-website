import { ChevronDown, Globe, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'pl' ? 'en' : 'pl');
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const showMenu = !isScrolled || isHovered;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Notch indicator - visible when scrolled and not hovered */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '140px',
          height: '32px',
          background: 'transparent',
          borderRadius: '0 0 16px 16px',
          opacity: isScrolled && !isHovered ? 1 : 0,
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '4px',
        }}
      >
        {/* Notch indicator line */}
        <div
          style={{
            width: '120px',
            height: '4px',
            background: 'rgba(99, 102, 241, 0.6)',
            borderRadius: '4px',
          }}
        />

        {/* Chevron indicator */}
        <ChevronDown size={16} color="rgba(99, 102, 241, 0.8)" style={{ animation: 'bounce 2s infinite', marginTop: '2px' }} />
      </div>

      {/* Main menu container */}
      <div
        style={{
          maxWidth: '80rem',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          opacity: showMenu ? 1 : 0,
          transform: showMenu ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'all 0.3s ease',
          pointerEvents: showMenu ? 'auto' : 'none',
          background: isScrolled && isHovered ? 'rgba(15, 15, 26, 0.9)' : 'transparent',
          backdropFilter: isScrolled && isHovered ? 'blur(10px)' : 'none',
          borderRadius: isScrolled && isHovered ? '0 0 16px 16px' : '0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '4rem' }}>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scrollTo('services')}
              className="nav-item text-white font-semibold"
            >
              {t('nav.services')}
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="nav-item text-white font-semibold"
            >
              {t('nav.about')}
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="nav-item text-white font-semibold"
            >
              {t('nav.contact')}
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="nav-item flex items-center gap-1 text-white font-semibold"
            >
              <Globe size={18} />
              <span className="uppercase">{i18n.language}</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-[var(--color-text-muted)]"
            >
              <Globe size={18} />
              <span className="uppercase text-sm font-medium">{i18n.language}</span>
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-[var(--color-background)]">
          <div className="px-4 py-4 space-y-3">
            <button
              onClick={() => scrollTo('services')}
              className="block w-full text-left py-2 text-white font-semibold"
            >
              {t('nav.services')}
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="block w-full text-left py-2 text-white font-semibold"
            >
              {t('nav.about')}
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="block w-full text-left py-2 text-white font-semibold"
            >
              {t('nav.contact')}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
