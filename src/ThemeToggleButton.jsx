import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ThemeToggleButton({ theme, onToggle, variant = 'hero' }) {
  const { t } = useTranslation();
  const isDark = theme === 'dark';
  const label = isDark ? t('hero.themeLight') : t('hero.themeDark');

  const heroClass =
    'inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 p-2 text-white hover:bg-white/20 transition no-print';
  const bodyClass =
    'inline-flex items-center justify-center rounded-lg border border-line bg-card p-2 text-ink hover:bg-slate-50 dark:hover:bg-slate-800 transition shadow-sm no-print';

  return (
    <button
      type="button"
      onClick={onToggle}
      className={variant === 'hero' ? heroClass : bodyClass}
      aria-label={label}
      title={label}
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
