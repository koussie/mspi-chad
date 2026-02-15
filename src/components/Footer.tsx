'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations();

  const quickLinks = [
    { name: t('nav.home'), href: `/${locale}` },
    { name: t('nav.about'), href: `/${locale}/about` },
    { name: t('nav.organization'), href: `/${locale}/organization` },
    // SECTION TEMPORAIREMENT DÉSACTIVÉE POUR MVP – À RÉACTIVER PLUS TARD
    { name: t('nav.news'), href: `/${locale}/news` },
    { name: t('nav.media'), href: `/${locale}/media` },
    { name: t('nav.publications'), href: `/${locale}/publications` },
    { name: t('nav.contact'), href: `/${locale}/contact` },
  ];

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-12">
          <div>
            <h3 className="font-bold mb-6 text-sm uppercase tracking-wide">
              {t('common.republic')}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('common.siteTitle')}
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-6 text-sm uppercase tracking-wide">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-6 text-sm uppercase tracking-wide">
              {t('contact.title')}
            </h3>
            <div className="space-y-3 text-sm">
              <p className="text-gray-400">
                {locale === 'fr'
                  ? 'Avenue Charles de Gaulle\nN\'Djamena, Tchad'
                  : 'شارع شارل ديغول\nنجامينا، تشاد'}
              </p>
              <p className="text-gray-400">+235 22 52 XX XX</p>
              <p className="text-gray-400">contact@mspi.gov.td</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-500 text-sm">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
