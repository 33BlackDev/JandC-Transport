export const locales = ['en', 'es', 'fr', 'ht'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  ht: 'Kreyòl Ayisyen',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  es: '🇩🇴',
  fr: '🇫🇷',
  ht: '🇭🇹',
};
