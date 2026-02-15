'use client';

import { useEffect, useMemo, useState } from 'react';
import { Play, X } from 'lucide-react';

type MediaVideoCardProps = {
  locale: string;
  video: {
    id: string;
    title_fr: string;
    title_ar: string;
    description_fr?: string | null;
    description_ar?: string | null;
    youtube_url?: string | null;
    youtube_id?: string | null;
    thumbnail?: string | null;
    published_at?: string | null;
  };
  showTitle?: boolean;
  showDate?: boolean;
  descriptionMode?: 'clamp' | 'details' | 'none';
};

function extractYoutubeId(url?: string | null): string | null {
  if (!url) return null;

  if (url.includes('youtu.be/')) {
    const [, id] = url.split('youtu.be/');
    return id?.split('?')[0] || null;
  }

  const match = url.match(/[?&]v=([^&]+)/);
  if (match && match[1]) return match[1];

  return null;
}

export default function MediaVideoCard({
  locale,
  video,
  showTitle = true,
  showDate = true,
  descriptionMode = 'clamp',
}: MediaVideoCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const youtubeId = useMemo(
    () => video.youtube_id || extractYoutubeId(video.youtube_url),
    [video.youtube_id, video.youtube_url]
  );

  const thumbnail =
    video.thumbnail ||
    (youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : null);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const title = locale === 'fr' ? video.title_fr : video.title_ar;
  const description = locale === 'fr' ? video.description_fr : video.description_ar;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        dir={locale === 'ar' ? 'rtl' : 'ltr'}
        className={`group w-full bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 ${
          locale === 'ar' ? 'text-right' : 'text-left'
        }`}
      >
        <div className="aspect-video bg-slate-900 flex items-center justify-center relative overflow-hidden">
          {thumbnail ? (
            <>
              <img
                src={thumbnail}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                loading="lazy"
                decoding="async"
              />
              <div className="relative z-10 w-14 h-14 bg-amber-700/90 rounded-full flex items-center justify-center group-hover:bg-amber-600 transition-colors">
                <Play className={`w-7 h-7 text-white ${locale === 'ar' ? 'mr-0.5' : 'ml-0.5'}`} />
              </div>
            </>
          ) : (
            <div className="w-14 h-14 bg-amber-700/90 rounded-full flex items-center justify-center">
              <Play className={`w-7 h-7 text-white ${locale === 'ar' ? 'mr-0.5' : 'ml-0.5'}`} />
            </div>
          )}
        </div>
        <div className="p-6">
          {showTitle && (
            <h3 className="text-lg font-bold mb-2 text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-2">
              {title}
            </h3>
          )}
          {description && descriptionMode === 'clamp' && (
            <p className="text-gray-700 text-sm mb-3 line-clamp-2">{description}</p>
          )}
          {description && descriptionMode === 'details' && (
            <details className="mb-3">
              <summary className="text-sm font-semibold text-amber-700 cursor-pointer">
                {locale === 'fr' ? 'Description' : 'الوصف'}
              </summary>
              <p className={`text-gray-700 text-sm mt-2 leading-relaxed ${locale === 'ar' ? 'text-right' : 'text-left'}`}>{description}</p>
            </details>
          )}
          {showDate && video.published_at && (
            <div className="text-xs text-amber-700 font-semibold uppercase tracking-wide">
              {new Date(video.published_at).toLocaleDateString(
                locale === 'fr' ? 'fr-FR' : 'ar-TN',
                { year: 'numeric', month: 'long', day: 'numeric' }
              )}
            </div>
          )}
        </div>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 p-4 md:p-8 flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl bg-black rounded-lg overflow-hidden"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className={`absolute top-3 z-10 bg-black/70 text-white p-2 rounded-full hover:bg-black ${
                locale === 'ar' ? 'left-3' : 'right-3'
              }`}
              aria-label={locale === 'fr' ? 'Fermer la vidéo' : 'إغلاق الفيديو'}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-video w-full bg-black">
              {youtubeId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                  title={title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
                  {locale === 'fr'
                    ? 'Identifiant YouTube manquant pour cette vidéo.'
                    : 'معرّف YouTube غير متوفر لهذا الفيديو.'}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
