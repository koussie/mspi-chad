import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n';

export default createMiddleware({
  locales,
  defaultLocale: 'fr',
  localePrefix: 'always',
});

export const config = {
  matcher: [
    '/',
    '/(fr|ar)/:path*',
    '/((?!_next|_vercel|api|.*\\..*).*)',
  ],
};
