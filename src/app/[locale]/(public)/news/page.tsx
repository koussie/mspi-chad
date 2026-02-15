import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export default async function NewsPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();

  const { data: news } = await supabase
    .from('news')
    .select()
    .eq('status', 'PUBLISHED')
    .order('published_at', { ascending: false });

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
            <Link href={`/${locale}`} className="hover:text-amber-300 transition-colors">
              {t('about.breadcrumb.home')}
            </Link>
            <ChevronRight className={`w-4 h-4 ${locale === 'ar' ? 'rotate-180' : ''}`} />
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
          {news && news.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item) => (
                <Link
                  key={item.id}
                  href={`/${locale}/news/${item.id}`}
                  className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  {item.cover_image && (
                    <div className="aspect-video overflow-hidden bg-gray-200">
                      <img
                        src={item.cover_image}
                        alt={locale === 'fr' ? item.title_fr : item.title_ar}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="text-xs uppercase tracking-wide text-amber-700 font-semibold mb-3">
                      {item.published_at &&
                        new Date(item.published_at).toLocaleDateString(
                          locale === 'fr' ? 'fr-FR' : 'ar-TN',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }
                        )}
                    </div>
                    <h2 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-2">
                      {locale === 'fr' ? item.title_fr : item.title_ar}
                    </h2>
                    <p className="text-gray-700 leading-relaxed line-clamp-3">
                      {locale === 'fr' ? item.excerpt_fr : item.excerpt_ar}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">
                {locale === 'fr' ? 'Aucune actualité disponible pour le moment.' : 'لا توجد أخبار متاحة في الوقت الحالي.'}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
