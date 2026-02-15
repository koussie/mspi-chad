import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ChevronRight, Calendar, ArrowLeft, Tag } from 'lucide-react';
import { publications } from '@/data/publications';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return publications.map((pub) => ({
    slug: pub.slug,
  }));
}

export default async function PublicationDetailPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();

  const publication = publications.find(p => p.slug === slug);

  if (!publication) {
    notFound();
  }

  const title = locale === 'fr' ? publication.title_fr : publication.title_ar;
  const content = locale === 'fr' ? publication.content_fr : publication.content_ar;
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

  const contentParagraphs = content.split('\n\n');

  return (
    <div>
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 md:py-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.08] bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/logo-complet-tchad.jpg)',
            backgroundSize: '600px',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center gap-2 text-sm mb-6 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
            <Link href={`/${locale}`} className="hover:text-blue-300 transition-colors">
              {t('publications.breadcrumb.home')}
            </Link>
            <ChevronRight className={`w-4 h-4 ${locale === 'ar' ? 'rotate-180' : ''}`} />
            <Link href={`/${locale}/publications`} className="hover:text-blue-300 transition-colors">
              {t('publications.breadcrumb.current')}
            </Link>
            <ChevronRight className={`w-4 h-4 ${locale === 'ar' ? 'rotate-180' : ''}`} />
            <span className="text-blue-200 truncate">{title}</span>
          </div>

          <Link
            href={`/${locale}/publications`}
            className={`inline-flex items-center gap-2 text-blue-200 hover:text-blue-100 transition-colors mb-6 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}
          >
            <ArrowLeft className={`w-5 h-5 ${locale === 'ar' ? 'rotate-180' : ''}`} />
            <span>{t('publications.backToList')}</span>
          </Link>

          <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
            {title}
          </h1>

          <div className={`flex flex-wrap items-center gap-6 text-sm ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-2 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
              <Calendar className="w-5 h-5 text-blue-200" />
              <time dateTime={publication.date} className="text-blue-100">
                {formatDate(publication.date)}
              </time>
            </div>
            <div className={`flex items-center gap-2 ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
              <Tag className="w-5 h-5 text-blue-200" />
              <span className="text-blue-100">{category}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <div className="relative h-96 bg-gray-200">
              <Image
                src={publication.coverImage}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
            </div>

            <div className={`p-8 md:p-12 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
              <div className={`prose prose-lg max-w-none ${locale === 'ar' ? 'prose-rtl' : ''}`}>
                {contentParagraphs.map((paragraph, index) => {
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-amber-700">
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  }
                  return (
                    <p key={index} className="text-gray-700 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </div>
          </article>

          <div className="mt-8 text-center">
            <Link
              href={`/${locale}/publications`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-institutional-blue text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              <ArrowLeft className={`w-5 h-5 ${locale === 'ar' ? 'rotate-180' : ''}`} />
              <span>{t('publications.backToList')}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
