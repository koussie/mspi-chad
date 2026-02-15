import 'server-only';
import { getRequestConfig } from 'next-intl/server';
import { locales, type Locale } from '../i18n';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale: Locale | undefined;

  try {
    locale = (await requestLocale) as Locale | undefined;
  } catch {
    locale = undefined;
  }

  if (!locale || !locales.includes(locale)) {
    locale = 'fr';
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
