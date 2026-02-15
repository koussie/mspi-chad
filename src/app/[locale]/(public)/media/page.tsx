import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Play, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import MediaGalleryImage from '@/components/MediaGalleryImage';
import MediaVideoCard from '@/components/MediaVideoCard';
import { mvpMediaPhotos } from '@/data/media';
import { officialVideoDescriptionsByYoutubeId } from '@/data/video-descriptions';

export const dynamic = 'force-dynamic';

export default async function MediaPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();

  const [albumsResult, videosResult] = await Promise.all([
    supabase
      .from('media_albums')
      .select()
      .order('created_at', { ascending: false }),
    supabase
      .from('media_videos')
      .select()
      .order('published_at', { ascending: false }),
  ]);

  const albums = albumsResult.data || [];
  const videos = videosResult.data || [];
  const albumPhotos = albums.flatMap((album) => {
    const images = album.images && Array.isArray(album.images) ? album.images : [];

    if (images.length > 0) {
      return images.map((image: string, index: number) => ({
        src: image,
        altFr: `${album.title_fr} - Photo ${index + 1}`,
        altAr: `${album.title_ar} - صورة ${index + 1}`,
      }));
    }

    if (album.cover_image) {
      return [
        {
          src: album.cover_image as string,
          altFr: `${album.title_fr} - Photo`,
          altAr: `${album.title_ar} - صورة`,
        },
      ];
    }

    return [];
  });

  const allGalleryPhotos = [...albumPhotos, ...mvpMediaPhotos];

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
            <span className="text-amber-200">{t('media.title')}</span>
          </div>

          <div className="text-center">
            <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase tracking-wide leading-tight drop-shadow-2xl mb-4">
              {t('media.title')}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
              {locale === 'fr'
                ? 'Découvrez nos albums photos et vidéos officielles'
                : 'اكتشف ألبوماتنا ومقاطع الفيديو الرسمية'}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 uppercase tracking-wide text-slate-900 flex items-center gap-3">
            <ImageIcon className="w-8 h-8 text-amber-700" />
            <span>{locale === 'fr' ? 'GALERIES PHOTOS' : t('media.photos')}</span>
          </h2>

          {allGalleryPhotos.length > 0 ? (
            <div className="mb-16">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {allGalleryPhotos.map((photo, index) => (
                  <div
                    key={`${photo.src}-${index}`}
                    className="group aspect-video overflow-hidden rounded-lg shadow-sm bg-gray-200 border border-gray-100"
                  >
                    <MediaGalleryImage
                      src={photo.src}
                      alt={locale === 'fr' ? photo.altFr : photo.altAr}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">
                {locale === 'fr' ? 'Aucun album photo disponible.' : 'لا توجد ألبومات صور متاحة.'}
              </p>
            </div>
          )}

          <h2 className="text-3xl md:text-4xl font-bold mb-12 mt-20 uppercase tracking-wide text-slate-900 flex items-center gap-3">
            <Play className="w-8 h-8 text-amber-700" />
            <span>{t('media.videos')}</span>
          </h2>

          {videos && videos.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video) => (
                <MediaVideoCard
                  key={video.id}
                  locale={locale}
                  video={{
                    ...video,
                    description_fr:
                      video.description_fr ||
                      (video.youtube_id
                        ? officialVideoDescriptionsByYoutubeId[video.youtube_id]?.fr
                        : undefined),
                    description_ar:
                      video.description_ar ||
                      (video.youtube_id
                        ? officialVideoDescriptionsByYoutubeId[video.youtube_id]?.ar
                        : undefined),
                  }}
                  descriptionMode="details"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">
                {locale === 'fr' ? 'Aucune vidéo disponible.' : 'لا توجد مقاطع فيديو متاحة.'}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
