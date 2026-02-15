import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import MediaVideoCard from '@/components/MediaVideoCard';
import { officialVideoDescriptionsByYoutubeId } from '@/data/video-descriptions';

export const dynamic = 'force-dynamic';

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  unstable_setRequestLocale(locale);
  const t = await getTranslations();

  const { data: news } = await supabase
    .from('news')
    .select()
    .eq('id', id)
    .eq('status', 'PUBLISHED')
    .maybeSingle();

  if (!news) {
    notFound();
  }

  const images = news.images ? (Array.isArray(news.images) ? news.images : []) : [];
  const youtubeId = news.youtube_video_id;
  const officialVideoDescription = youtubeId
    ? officialVideoDescriptionsByYoutubeId[youtubeId]?.[locale === 'ar' ? 'ar' : 'fr']
    : undefined;

  return (
    <div>
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}/news`}
            className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 font-semibold mb-8 transition-colors"
          >
            <ArrowLeft className={`w-5 h-5 ${locale === 'ar' ? 'rotate-180' : ''}`} />
            <span>{locale === 'fr' ? 'Retour aux actualités' : 'العودة إلى الأخبار'}</span>
          </Link>

          {news.cover_image && (
            <div className="aspect-video w-full overflow-hidden rounded-xl shadow-xl mb-8">
              <img
                src={news.cover_image}
                alt={locale === 'fr' ? news.title_fr : news.title_ar}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className={`flex items-center gap-3 text-sm text-amber-700 font-semibold uppercase tracking-wide mb-6 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
            <Calendar className="w-5 h-5" />
            <span>
              {news.published_at &&
                new Date(news.published_at).toLocaleDateString(
                  locale === 'fr' ? 'fr-FR' : 'ar-TN',
                  {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }
                )}
            </span>
          </div>

          <h1
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-slate-900 leading-tight ${locale === 'ar' ? 'text-right' : 'text-left'}`}
          >
            {locale === 'fr' ? news.title_fr : news.title_ar}
          </h1>

          <div
            className={`prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12 ${locale === 'ar' ? 'text-right' : 'text-left'}`}
            style={{ whiteSpace: 'pre-line' }}
          >
            {locale === 'fr' ? news.content_fr : news.content_ar}
          </div>

          {youtubeId && (
            <div className="mb-12">
              <h2 className={`text-2xl md:text-3xl font-bold mb-6 text-slate-900 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                {t('news.officialVisitTitle')}
              </h2>
              <div className="max-w-3xl">
                <MediaVideoCard
                  locale={locale}
                  video={{
                    id: news.id,
                    title_fr: news.title_fr,
                    title_ar: news.title_ar,
                    youtube_id: youtubeId,
                    published_at: news.published_at,
                  }}
                  showTitle={false}
                  showDate={false}
                  descriptionMode="none"
                />
              </div>
              {officialVideoDescription && (
                <p
                  dir={locale === 'ar' ? 'rtl' : 'ltr'}
                  className={`mt-6 text-gray-700 leading-relaxed ${locale === 'ar' ? 'text-right' : 'text-left'}`}
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {officialVideoDescription}
                </p>
              )}
            </div>
          )}

          {images && images.length > 1 && (
            <div>
              <h2 className={`text-2xl md:text-3xl font-bold mb-6 text-slate-900 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                {locale === 'fr' ? 'Galerie photos' : 'معرض الصور'}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {images.map((image: string, index: number) => (
                  <div
                    key={index}
                    className="aspect-video overflow-hidden rounded-lg shadow-lg bg-gray-200"
                  >
                    <img
                      src={image}
                      alt={`${locale === 'fr' ? 'Photo' : 'صورة'} ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-12 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href={`/${locale}/news`}
            className="inline-block px-8 py-4 bg-slate-900 text-white font-semibold uppercase tracking-wide hover:bg-slate-800 transition-colors rounded-lg shadow-lg"
          >
            {locale === 'fr' ? 'Voir toutes les actualités' : 'عرض جميع الأخبار'}
          </Link>
        </div>
      </section>
    </div>
  );
}
