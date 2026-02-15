import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AccessibilityBanner from '@/components/AccessibilityBanner';

export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <div dir={dir} className="flex flex-col min-h-screen">
      <Header locale={locale} />
      <main className="flex-grow">{children}</main>
      <AccessibilityBanner locale={locale} note={t('accessibility_note')} />
      <Footer locale={locale} />
    </div>
  );
}
