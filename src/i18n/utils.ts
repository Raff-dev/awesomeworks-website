import en from "./en.json";
import pl from "./pl.json";

const translations = { en, pl } as const;

export type Locale = keyof typeof translations;
export type TranslationKey = typeof en;

export function t(locale: Locale): TranslationKey {
  return translations[locale];
}

export function getLocaleFromUrl(url: URL): Locale {
  const [, locale] = url.pathname.split("/");
  if (locale === "pl") return "pl";
  return "en";
}

export function getLocalePath(locale: Locale, path: string = "/"): string {
  return `/${locale}${path}`;
}
