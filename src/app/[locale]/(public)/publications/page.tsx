import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { ChevronRight, FileText } from 'lucide-react';
import PublicationCard from '@/components/PublicationCard';
import { publications } from '@/data/publications';

export const dynamic = 'force-dynamic';

export default async function PublicationsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();

  const publicationTranslations = {
    readMore: t('publications.readMore')
  };

  return (
    <div>
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-32 md:py-40 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.08] bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/logo-complet-tchad.jpg)',
            backgroundSize: '600px',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center gap-2 text-sm mb-6 ${locale === 'ar' ? 'justify-center flex-row-reverse' : 'justify-center'}`}>
            <Link href={`/${locale}`} className="hover:text-blue-300 transition-colors">
              {t('publications.breadcrumb.home')}
            </Link>
            <ChevronRight className={`w-4 h-4 ${locale === 'ar' ? 'rotate-180' : ''}`} />
            <span className="text-blue-200">{t('publications.breadcrumb.current')}</span>
          </div>

          <div className="text-center">
            <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase tracking-wide leading-tight drop-shadow-2xl mb-4">
              {t('publications.title')}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
              {t('publications.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-8 h-8 text-amber-700" />
              <div>
                <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wide text-slate-900">
                  {t('publications.featured.publications')}
                </h2>
              </div>
            </div>

            {publications.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8">
                {publications.map((publication) => (
                  <PublicationCard
                    key={publication.id}
                    publication={publication}
                    locale={locale}
                    translations={publicationTranslations}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-12 text-center border border-gray-100">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">{t('publications.noPublications')}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
