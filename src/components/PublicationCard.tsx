import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight } from 'lucide-react';
import { Publication } from '@/data/publications';

type PublicationCardProps = {
  publication: Publication;
  locale: string;
  translations: {
    readMore: string;
  };
};

export default function PublicationCard({ publication, locale, translations }: PublicationCardProps) {
  const title = locale === 'fr' ? publication.title_fr : publication.title_ar;
  const excerpt = locale === 'fr' ? publication.excerpt_fr : publication.excerpt_ar;
  const category = locale === 'fr' ? publication.category_fr : publication.category_ar;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (locale === 'fr') {
      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } else {
      return date.toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  };

  return (
    <Link href={`/${locale}/publications/${publication.slug}`}>
      <div className="group bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
        <div className="relative h-64 bg-gray-200 overflow-hidden">
          <Image
            src={publication.coverImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute top-4 left-4">
            <span className="inline-block bg-institutional-blue text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide">
              {category}
            </span>
          </div>
        </div>

        <div className={`p-6 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
          <div className={`flex items-center gap-2 text-sm text-gray-500 mb-3 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
            <Calendar className="w-4 h-4" />
            <time dateTime={publication.date}>{formatDate(publication.date)}</time>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-amber-700 transition-colors">
            {title}
          </h3>

          <p className="text-gray-600 leading-relaxed line-clamp-3 mb-4">
            {excerpt}
          </p>

          <div className={`flex items-center gap-2 text-amber-700 font-semibold text-sm ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
            <span>{translations.readMore}</span>
            <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${locale === 'ar' ? 'rotate-180' : ''}`} />
          </div>
        </div>
      </div>
    </Link>
  );
}
