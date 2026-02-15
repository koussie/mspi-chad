import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import OrganizationChart from '@/components/OrganizationChart';
import FormerMinistersTable from '@/components/FormerMinistersTable';
import { departments, cabinetMembers } from '@/data/organization';

export const dynamic = 'force-dynamic';

export default async function OrganizationPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();

  const formerMinistersTranslations = {
    title: t('organization.formerMinisters.title'),
    subtitle: t('organization.formerMinisters.subtitle'),
    search: t('organization.formerMinisters.search'),
    searchPlaceholder: t('organization.formerMinisters.searchPlaceholder'),
    yearFilter: t('organization.formerMinisters.yearFilter'),
    sort: t('organization.formerMinisters.sort'),
    sortRecent: t('organization.formerMinisters.sortRecent'),
    sortOldest: t('organization.formerMinisters.sortOldest'),
    sortNameAZ: t('organization.formerMinisters.sortNameAZ'),
    reset: t('organization.formerMinisters.reset'),
    name: t('organization.formerMinisters.name'),
    period: t('organization.formerMinisters.period'),
    note: t('organization.formerMinisters.note'),
    noResults: t('organization.formerMinisters.noResults'),
    present: t('organization.formerMinisters.present')
  };

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
            <Link href={`/${locale}`} className="hover:text-blue-300 transition-colors">
              {locale === 'fr' ? 'Accueil' : 'الرئيسية'}
            </Link>
            <ChevronRight className={`w-4 h-4 ${locale === 'ar' ? 'rotate-180' : ''}`} />
            <span className="text-blue-200">{locale === 'fr' ? 'Organisation' : 'الهيكل التنظيمي'}</span>
          </div>

          <div className="text-center">
            <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase tracking-wide leading-tight drop-shadow-2xl mb-4">
              {t('organization.title')}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
              {t('organization.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8 mb-12 border border-gray-100">
            <p className={`text-lg text-gray-700 leading-relaxed ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
              {t('organization.intro')}
            </p>
          </div>

          <div className="mb-20">
            <h2 className={`text-3xl md:text-4xl font-bold uppercase tracking-wide text-slate-900 mb-8 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
              {t('organization.chart.title')}
            </h2>
            <OrganizationChart locale={locale} />
          </div>

          <div className="mb-20">
            <h2 className={`text-3xl md:text-4xl font-bold uppercase tracking-wide text-slate-900 mb-8 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
              {t('organization.cabinet.title')}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cabinetMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
                  {member.photo && (
                    <div className="h-48 bg-gray-200 overflow-hidden">
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className={`text-xl font-bold mb-2 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                      {member.name}
                    </h3>
                    <p className={`text-sm text-amber-700 font-semibold uppercase tracking-wide ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                      {locale === 'fr' ? member.position_fr : member.position_ar}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-20">
            <h2 className={`text-3xl md:text-4xl font-bold uppercase tracking-wide text-slate-900 mb-8 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
              {t('organization.departments.title')}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {departments.map((dept) => (
                <div
                  key={dept.id}
                  className="bg-white rounded-xl shadow-md p-6 border-l-4 border-amber-600 hover:shadow-lg transition-shadow"
                >
                  <h3 className={`text-xl font-bold mb-3 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                    {locale === 'fr' ? dept.name_fr : dept.name_ar}
                  </h3>
                  <p className={`text-gray-700 leading-relaxed ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                    {locale === 'fr' ? dept.description_fr : dept.description_ar}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className={`text-3xl md:text-4xl font-bold uppercase tracking-wide text-slate-900 mb-8 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
              {locale === 'fr' ? 'ANCIENS MINISTRES' : 'الوزراء السابقون'}
            </h2>
            <FormerMinistersTable locale={locale} translations={formerMinistersTranslations} />
          </div>
        </div>
      </section>
    </div>
  );
}
