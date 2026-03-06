import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar } from 'lucide-react';
import { getNewsBySlugOrId } from '@/data/news';

export const dynamic = 'force-dynamic';

function extractYoutubeId(url: string): string | null {
  if (url.includes('youtu.be/')) {
    const [, id] = url.split('youtu.be/');
    return id?.split('?')[0] || null;
  }

  const match = url.match(/[?&]v=([^&]+)/);
  return match?.[1] || null;
}

export default async function NewsDetailPage({
  params: { locale, id },
}: {
  params: { locale: string; id: string };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();
  const isAr = locale === 'ar';

  const news = getNewsBySlugOrId(id);

  if (!news) {
    notFound();
  }

  const youtubeId = news.video?.type === 'youtube' ? extractYoutubeId(news.video.url) : null;

  return (
    <div>
      <section className="py-16 md:py-24 bg-white" dir={isAr ? 'rtl' : 'ltr'}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}/actualites`}
            className={`inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 font-semibold mb-8 transition-colors ${isAr ? 'flex-row-reverse' : ''}`}
          >
            <ArrowLeft className={`w-5 h-5 ${isAr ? 'rotate-180' : ''}`} />
            <span>{t('news.backToNews')}</span>
          </Link>

          <div className="aspect-video w-full overflow-hidden rounded-xl shadow-xl mb-8 relative bg-gray-100">
            <Image
              src={news.coverImage || '/images/facade-ministere.jpg'}
              alt={isAr ? news.title.ar : news.title.fr}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </div>

          <div className={`flex items-center gap-3 text-sm text-amber-700 font-semibold uppercase tracking-wide mb-6 ${isAr ? 'flex-row-reverse' : ''}`}>
            <Calendar className="w-5 h-5" />
            <span>
              {new Date(news.date).toLocaleDateString(isAr ? 'ar-TN' : 'fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>

          <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-slate-900 leading-tight ${isAr ? 'text-right' : 'text-left'}`}>
            {isAr ? news.title.ar : news.title.fr}
          </h1>

          <div
            className={`prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12 ${isAr ? 'text-right' : 'text-left'}`}
            style={{ whiteSpace: 'pre-line' }}
          >
            {isAr ? news.content.ar : news.content.fr}
          </div>

          {news.video && (
            <section className="mb-12" aria-labelledby="news-video-title">
              <h2 id="news-video-title" className={`text-2xl md:text-3xl font-bold mb-6 text-slate-900 ${isAr ? 'text-right' : 'text-left'}`}>
                {t('news.video')}
              </h2>

              {news.video.type === 'youtube' && youtubeId ? (
                <div className="aspect-video w-full overflow-hidden rounded-xl border border-gray-200 shadow-lg bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    title={isAr ? news.title.ar : news.title.fr}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              ) : news.video.type === 'mp4' ? (
                <video
                  controls
                  preload="metadata"
                  className="w-full rounded-xl border border-gray-200 shadow-lg bg-black"
                  poster={news.video.thumbnail}
                >
                  <source src={news.video.url} type="video/mp4" />
                  {isAr ? 'متصفحك لا يدعم تشغيل الفيديو.' : "Votre navigateur ne prend pas en charge la lecture video."}
                </video>
              ) : null}
            </section>
          )}

          {news.gallery && news.gallery.length > 0 && (
            <section aria-labelledby="news-gallery-title">
              <h2 id="news-gallery-title" className={`text-2xl md:text-3xl font-bold mb-6 text-slate-900 ${isAr ? 'text-right' : 'text-left'}`}>
                {t('news.gallery')}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {news.gallery.map((image, index) => (
                  <div key={`${image}-${index}`} className="aspect-video overflow-hidden rounded-lg shadow-lg bg-gray-200 relative">
                    <Image
                      src={image}
                      alt={`${isAr ? 'صورة' : 'Photo'} ${index + 1}`}
                      fill
                      loading="lazy"
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>

      <section className="py-12 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href={`/${locale}/actualites`}
            className="inline-block px-8 py-4 bg-slate-900 text-white font-semibold uppercase tracking-wide hover:bg-slate-800 transition-colors rounded-lg shadow-lg"
          >
            {t('news.latestNews')}
          </Link>
        </div>
      </section>
    </div>
  );
}
