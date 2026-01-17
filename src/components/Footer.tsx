import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-1 border-t border-[var(--color-primary)]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <div className="text-sm text-[var(--color-text-muted)]">
            © {currentYear} Awesome Works. {t('footer.rights')}.
          </div>
        </div>
      </div>
    </footer>
  );
}
