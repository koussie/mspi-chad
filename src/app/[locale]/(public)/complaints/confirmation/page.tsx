import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ConfirmationPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ ref?: string; pin?: string }>;
}) {
  const { locale } = await params;
  unstable_setRequestLocale(locale);
  const t = await getTranslations();

  const { ref, pin } = await searchParams;

  return (
    <div>
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-8">
            <CheckCircle className="w-20 h-20 text-green-600" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-6 uppercase tracking-wide">
            {t('complaints.confirmation.title')}
          </h1>

          <p className="text-lg text-gray-700 mb-12 leading-relaxed">
            {t('complaints.confirmation.message')}
          </p>

          <div className="bg-gray-100 p-8 mb-8 text-left">
            <div className="mb-6">
              <div className="text-sm font-semibold uppercase tracking-wide mb-2 text-gray-600">
                {t('complaints.confirmation.reference')}
              </div>
              <div className="text-2xl font-bold text-black font-mono">{ref}</div>
            </div>

            <div className="mb-6">
              <div className="text-sm font-semibold uppercase tracking-wide mb-2 text-gray-600">
                {t('complaints.confirmation.pin')}
              </div>
              <div className="text-2xl font-bold text-black font-mono">{pin}</div>
            </div>

            <div className="p-4 bg-institutional-blue/10 border-l-4 border-institutional-blue">
              <p className="text-sm text-gray-700">
                {t('complaints.confirmation.pinSent')}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <Link
              href={`/${locale}/complaints/track`}
              className="block px-8 py-4 bg-institutional-blue text-white font-semibold uppercase tracking-wide hover:bg-institutional-blue-dark transition-colors"
            >
              {t('complaints.confirmation.trackLink')}
            </Link>

            <Link
              href={`/${locale}`}
              className="block px-8 py-4 bg-gray-200 text-black font-semibold uppercase tracking-wide hover:bg-gray-300 transition-colors"
            >
              {t('nav.home')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
