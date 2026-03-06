import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { getAllNews } from '@/data/news';

export const dynamic = 'force-dynamic';

export default async function NewsPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();
  const isAr = locale === 'ar';
  const news = getAllNews();

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
          <div className={`flex items-center gap-2 text-sm mb-6 ${isAr ? 'justify-center flex-row-reverse' : 'justify-center'}`}>
            <Link href={`/${locale}`} className="hover:text-amber-300 transition-colors">
              {t('about.breadcrumb.home')}
            </Link>
            <ChevronRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
            <span className="text-amber-200">{t('news.title')}</span>
          </div>

          <div className="text-center">
            <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase tracking-wide leading-tight drop-shadow-2xl mb-4">
              {t('news.title')}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
              {t('news.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <article
                key={item.id}
                dir={isAr ? 'rtl' : 'ltr'}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <Link href={`/${locale}/actualites/${item.slug}`} aria-label={isAr ? `قراءة الخبر: ${item.title.ar}` : `Lire l'actualité : ${item.title.fr}`}>
                  <div className="aspect-video overflow-hidden bg-gray-200 relative">
                    <Image
                      src={item.coverImage || '/images/facade-ministere.jpg'}
                      alt={isAr ? item.title.ar : item.title.fr}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </Link>
                <div className={`p-6 ${isAr ? 'text-right' : 'text-left'}`}>
                  <div className="text-xs uppercase tracking-wide text-amber-700 font-semibold mb-3">
                    {new Date(item.date).toLocaleDateString(isAr ? 'ar-TN' : 'fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                  <h2 className="text-xl font-bold mb-3 text-slate-900 line-clamp-2">{isAr ? item.title.ar : item.title.fr}</h2>
                  <p className="text-gray-700 leading-relaxed line-clamp-3 mb-5">{isAr ? item.excerpt.ar : item.excerpt.fr}</p>
                  <Link
                    href={`/${locale}/actualites/${item.slug}`}
                    className="inline-flex items-center text-amber-700 hover:text-amber-800 font-semibold transition-colors"
                  >
                    {t('news.readMore')}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
