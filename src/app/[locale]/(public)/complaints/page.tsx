import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import ComplaintForm from './ComplaintForm';

export const dynamic = 'force-dynamic';

export default async function ComplaintsPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <div>
      <section className="bg-black text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wide">
            {t('complaints.title')}
          </h1>
          <p className="text-xl mt-4 text-gray-300">{t('complaints.subtitle')}</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 p-6 bg-gray-100 border-l-4 border-institutional-blue">
            <p className="text-sm leading-relaxed">
              {locale === 'fr'
                ? 'Utilisez ce formulaire pour soumettre une réclamation, un signalement ou une demande d\'information. Vous recevrez un code de référence et un code PIN pour suivre votre demande.'
                : 'استخدم هذا النموذج لتقديم شكوى أو بلاغ أو طلب معلومات. ستتلقى رمز مرجع ورمز تعريف لتتبع طلبك.'}
            </p>
          </div>

          <div className="mb-8">
            <Link
              href={`/${locale}/complaints/track`}
              className="text-institutional-blue font-semibold hover:underline"
            >
              {t('complaints.track.title')} →
            </Link>
          </div>

          <ComplaintForm locale={locale} />
        </div>
      </section>
    </div>
  );
}
