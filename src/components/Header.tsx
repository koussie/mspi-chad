'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Menu, X, Search } from 'lucide-react';

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navigation = [
    { name: t('nav.home'), href: `/${locale}` },
    { name: t('nav.about'), href: `/${locale}/about` },
    { name: t('nav.organization'), href: `/${locale}/organization` },
    // SECTION TEMPORAIREMENT DÉSACTIVÉE POUR MVP – À RÉACTIVER PLUS TARD
    { name: t('nav.news'), href: `/${locale}/news` },
    { name: t('nav.media'), href: `/${locale}/media` },
    { name: t('nav.publications'), href: `/${locale}/publications` },
    { name: t('nav.contact'), href: `/${locale}/contact` },
  ];

  const isActive = (path: string) => {
    if (path === `/${locale}`) {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname?.startsWith(path);
  };

  const otherLocale = locale === 'fr' ? 'ar' : 'fr';
  const currentPath = pathname?.replace(`/${locale}`, '') || '';

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:py-6">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-3 md:gap-4 hover:opacity-80 transition-opacity"
          >
            <div className="w-12 h-12 md:w-20 md:h-20 flex items-center justify-center flex-shrink-0">
              <img
                src="/387843849_122093620574083693_4933449769166332159_n.jpg"
                alt="Ministère de la Sécurité Publique et de l'Immigration"
                className="w-full h-full object-contain"
              />
            </div>
            <div className={locale === 'ar' ? 'text-right' : ''}>
              <div className="font-bold text-xs md:text-sm text-black leading-tight uppercase tracking-wide">
                {t('common.siteTitle')}
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-4 md:gap-6">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-600 hover:text-black transition-colors"
              aria-label={t('common.search')}
            >
              <Search className="w-5 h-5" />
            </button>

            <nav className="hidden lg:flex items-center gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-semibold uppercase tracking-wide transition-colors ${
                    isActive(item.href)
                      ? 'text-black border-b-2 border-black pb-1'
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <Link
              href={`/${otherLocale}${currentPath}`}
              className="text-sm font-semibold uppercase tracking-wide text-gray-600 hover:text-black transition-colors"
            >
              {locale === 'fr' ? 'AR' : 'FR'}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-black"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-gray-200 bg-gray-50 py-4 px-4">
          <div className="max-w-7xl mx-auto">
            <input
              type="text"
              placeholder={t('common.search')}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black"
              autoFocus
            />
          </div>
        </div>
      )}

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <nav className="px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 text-sm font-semibold uppercase tracking-wide transition-colors ${
                  isActive(item.href)
                    ? 'text-black bg-gray-100'
                    : 'text-gray-600 hover:text-black hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
