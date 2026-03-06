import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { ArrowRight, Quote } from 'lucide-react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import KeyFiguresSection from '@/components/KeyFiguresSection';
import { getAllNews, type NewsItem } from '@/data/news';

export const dynamic = 'force-dynamic';

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const news = getAllNews().slice(0, 3);

  const [publicationsResult] = await Promise.all([
    supabase
      .from('publications')
      .select()
      .order('published_at', { ascending: false })
      .limit(3),
  ]);

  const publications = publicationsResult.data || [];

  return (
    <HomePageContent
      locale={locale}
      news={news}
      publications={publications}
    />
  );
}

async function HomePageContent({
  locale,
  news,
  publications,
}: {
  locale: string;
  news: NewsItem[];
  publications: any[];
}) {
  const t = await getTranslations();
  const keyFigures = [
    { id: 'directions' as const, label: t('home.keyFigures.directions') },
    { id: 'agents' as const, label: t('home.keyFigures.agents') },
    { id: 'regions' as const, label: t('home.keyFigures.regions') },
    { id: 'service' as const, label: t('home.keyFigures.service') },
  ];

  return (
    <div>
      <section className="relative h-[500px] md:h-[600px] lg:h-[700px] bg-gradient-to-br from-slate-900 via-slate-800 to-stone-900">
        <div
          className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: 'url(/469044790_122196794354083693_3396597538003732815_n.jpg)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight uppercase tracking-wide drop-shadow-lg">
                {t('home.hero.title')}
              </h1>
              <p className="text-xl md:text-2xl text-white/95 font-light leading-relaxed drop-shadow-md">
                {t('home.hero.subtitle')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 uppercase tracking-wide">
              {t('home.news.title')}
            </h2>
            <p className="text-lg md:text-xl text-gray-400">
              {t('home.news.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-0">
            {news.map((item) => (
              <Link
                key={item.id}
                href={`/${locale}/actualites/${item.slug}`}
                className="group relative h-96 overflow-hidden bg-black"
              >
                {item.coverImage && (
                  <>
                    <img
                      src={item.coverImage}
                      alt={locale === 'fr' ? item.title.fr : item.title.ar}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-80 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-lg md:text-xl font-bold mb-2 line-clamp-3">
                    {locale === 'fr' ? item.title.fr : item.title.ar}
                  </h3>
                  <p className="text-sm text-white/80">
                    {new Date(item.date).toLocaleDateString(
                      locale === 'fr' ? 'fr-FR' : 'ar-TN'
                    )}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href={`/${locale}/actualites`}
              className="inline-block px-8 py-4 bg-white text-black font-semibold uppercase tracking-wide hover:bg-gray-100 transition-colors"
            >
              {t('news.latestNews')}
            </Link>
          </div>
        </div>
      </section>

      <KeyFiguresSection title={t('home.keyFigures.title')} figures={keyFigures} />

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
            <div>
              <blockquote
                dir={locale === 'ar' ? 'rtl' : 'ltr'}
                className={`bg-stone-50 border border-stone-200 p-7 md:p-10 ${
                  locale === 'ar' ? 'text-right' : 'text-center md:text-left'
                }`}
              >
                <Quote
                  className={`w-9 h-9 text-amber-700/90 mb-5 ${locale === 'ar' ? 'mr-0 ml-auto' : 'mx-auto md:mx-0'}`}
                  strokeWidth={1.8}
                />
                <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-900 leading-[1.35]">
                  {t('home.ministerQuote.text')}
                </p>
                <footer className={`mt-7 text-sm font-semibold uppercase tracking-wide text-slate-800 ${locale === 'ar' ? 'text-right' : ''}`}>
                  {t('home.ministerQuote.signature')}
                </footer>
              </blockquote>
            </div>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-gray-200 border border-gray-100">
              <Image
                src="/images/mot-ministre.png"
                alt={locale === 'fr' ? 'Photo du Ministre' : 'صورة الوزير'}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 uppercase tracking-wide">
              {t('home.organization.title')}
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              {t('home.organization.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-gray-200">
            <Link
              href={`/${locale}/organization`}
              className="bg-white p-12 md:p-16 hover:bg-gray-50 transition-colors group"
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-black uppercase tracking-wide">
                {t('organization.cabinet.title')}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t('organization.cabinet.subtitle')}
              </p>
              <span className="text-amber-700 font-semibold uppercase text-sm tracking-wider group-hover:underline inline-flex items-center gap-2">
                {t('common.readMore')}
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link
              href={`/${locale}/organization`}
              className="bg-white p-12 md:p-16 hover:bg-gray-50 transition-colors group"
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-black uppercase tracking-wide">
                {t('organization.departments.title')}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t('organization.departments.subtitle')}
              </p>
              <span className="text-amber-700 font-semibold uppercase text-sm tracking-wider group-hover:underline inline-flex items-center gap-2">
                {t('common.readMore')}
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 uppercase tracking-wide">
              {t('home.publications.title')}
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              {t('home.publications.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {publications.map((pub) => (
              <a
                key={pub.id}
                href={pub.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-6 hover:shadow-lg transition-shadow group"
              >
                <div className="text-sm text-gray-500 mb-2 uppercase tracking-wide">
                  {pub.file_type}
                </div>
                <h3 className="text-lg font-bold mb-2 text-black">
                  {locale === 'fr' ? pub.title_fr : pub.title_ar}
                </h3>
                {pub.description_fr && (
                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                    {locale === 'fr' ? pub.description_fr : pub.description_ar}
                  </p>
                )}
                <span className="text-amber-700 font-semibold uppercase text-sm tracking-wider group-hover:underline inline-flex items-center gap-2">
                  {t('publications.download')}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href={`/${locale}/publications`}
              className="inline-block px-8 py-4 bg-black text-white font-semibold uppercase tracking-wide hover:bg-gray-800 transition-colors"
            >
              {t('publications.title')}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 uppercase tracking-wide">
            {t('contact.title')}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            {t('contact.subtitle')}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-block px-8 py-4 bg-amber-600 text-white font-semibold uppercase tracking-wide hover:bg-amber-700 transition-colors rounded-lg shadow-lg"
          >
            {t('contact.title')}
          </Link>
        </div>
      </section>
    </div>
  );
}
