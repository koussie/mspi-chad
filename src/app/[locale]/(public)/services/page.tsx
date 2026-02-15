import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ServicesPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <div>
      <section className="bg-black text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wide">
            {t('services.title')}
          </h1>
          <p className="text-xl mt-4 text-gray-300">{t('services.subtitle')}</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* SECTION TEMPORAIREMENT DÉSACTIVÉE POUR MVP – À RÉACTIVER PLUS TARD */}
          <div className="bg-gray-50 border border-gray-200 p-8 md:p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 uppercase tracking-wide">
              {t('services.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-8">
              {locale === 'fr'
                ? 'Cette section sera disponible prochainement.'
                : 'سيكون هذا القسم متاحًا قريبًا.'}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-block px-6 py-3 bg-amber-700 text-white font-semibold uppercase tracking-wide hover:bg-amber-800 transition-colors"
            >
              {locale === 'fr' ? 'Nous contacter' : 'اتصل بنا'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
