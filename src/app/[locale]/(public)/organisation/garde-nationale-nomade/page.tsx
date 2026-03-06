import Link from 'next/link';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { ChevronRight, Shield, Users, Siren, Map, Briefcase, Landmark } from 'lucide-react';

export const dynamic = 'force-dynamic';

type LocaleText = {
  fr: string;
  ar: string;
};

type ServiceItem = {
  nom: LocaleText;
  description: LocaleText;
};

type GardeNationaleNomadeData = {
  directeur: {
    nom: string;
    titre: string;
    photo: string;
  };
  missions: LocaleText[];
  fonctions: LocaleText[];
  services: ServiceItem[];
};

const gardeNationaleNomade: GardeNationaleNomadeData = {
  directeur: {
    nom: 'Le General de Division Bourma Hemchi Tchougoubou Kossei',
    titre: 'Directeur General de la Garde Nationale et Nomade du Tchad (GNNT)',
    photo: '/images/garde-nationale-nomade/photo-dg-gnnt.jpg',
  },
  missions: [
    {
      fr: 'Protection des autorites politiques et administratives.',
      ar: 'حماية السلطات السياسية والادارية.',
    },
    {
      fr: 'Protection des edifices publics.',
      ar: 'حماية المباني العمومية.',
    },
    {
      fr: "Maintien de l'ordre en milieu rural et nomade.",
      ar: 'حفظ النظام في الوسط الريفي والبدوي.',
    },
    {
      fr: "Garde et surveillance des maisons d'arret.",
      ar: 'حراسة ومراقبة دور التوقيف.',
    },
    {
      fr: 'Appui aux autres forces de securite selon les besoins operationnels.',
      ar: 'دعم باقي قوات الامن حسب الحاجات العملياتية.',
    },
  ],
  fonctions: [
    {
      fr: 'Assurer une presence permanente de securite dans les zones rurales et nomades du territoire national.',
      ar: 'ضمان حضور امني دائم في المناطق الريفية والبدوية على التراب الوطني.',
    },
    {
      fr: 'Proteger les institutions, les autorites et les infrastructures publiques strategiques.',
      ar: 'حماية المؤسسات والسلطات والبنى العمومية الاستراتيجية.',
    },
    {
      fr: "Participer aux operations de maintien et de retablissement de l'ordre public en coordination interforces.",
      ar: 'المشاركة في عمليات حفظ وارجاع النظام العام بتنسيق مشترك بين القوات.',
    },
    {
      fr: "Contribuer a la surete penitentiaire par la garde et la surveillance des maisons d'arret.",
      ar: 'المساهمة في امن المؤسسات السجنية عبر حراسة ومراقبة دور التوقيف.',
    },
  ],
  services: [
    {
      nom: {
        fr: 'Direction de la Protection des Autorites',
        ar: 'ادارة حماية السلطات',
      },
      description: {
        fr: 'Organisation des dispositifs de protection rapprochee et statique des autorites publiques.',
        ar: 'تنظيم ترتيبات الحماية القريبة والثابتة للسلطات العمومية.',
      },
    },
    {
      nom: {
        fr: 'Direction des Unites Territoriales Rurales et Nomades',
        ar: 'ادارة الوحدات الترابية الريفية والبدوية',
      },
      description: {
        fr: 'Coordination des unites de terrain et couverture securitaire des zones eloignees.',
        ar: 'تنسيق الوحدات الميدانية وتغطية امنية للمناطق البعيدة.',
      },
    },
    {
      nom: {
        fr: 'Direction de la Garde Penitentiaire',
        ar: 'ادارة الحراسة السجنية',
      },
      description: {
        fr: "Gestion de la garde et de la surveillance des maisons d'arret et appui a la securite penitentiaire.",
        ar: 'تدبير حراسة ومراقبة دور التوقيف ودعم الامن السجني.',
      },
    },
  ],
};

const gnntMeta = {
  logo: '/images/garde-nationale-nomade/logo-gnnt.jpg',
  description: {
    fr: "La Garde Nationale et Nomade du Tchad (GNNT) est une force de securite chargee de la protection du territoire, du maintien de l'ordre public et de la securite interieure, notamment dans les zones rurales et nomades.",
    ar: 'الحرس الوطني والبدوي التشادي قوة امنية مكلفة بحماية التراب الوطني وحفظ النظام العام والامن الداخلي، خاصة في المناطق الريفية والبدوية.',
  } as LocaleText,
  directeurDescription: {
    fr: 'Le Directeur General veille a la conduite strategique des missions, a la coordination des unites et au renforcement continu du service public de securite en milieu rural et nomade.',
    ar: 'يسهر المدير العام على التوجيه الاستراتيجي للمهام وتنسيق الوحدات وتعزيز خدمة الامن العمومي باستمرار في الوسط الريفي والبدوي.',
  } as LocaleText,
};

const missionIcons = [Shield, Users, Siren, Map, Shield];

export default async function GardeNationaleNomadePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();
  const isAr = locale === 'ar';

  return (
    <div>
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24 md:py-32 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.08] bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/logo-complet-tchad.jpg)',
            backgroundSize: '600px',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center gap-2 text-sm mb-6 ${isAr ? 'justify-center flex-row-reverse' : 'justify-center'}`}>
            <Link href={`/${locale}`} className="hover:text-blue-300 transition-colors">
              {isAr ? 'الرئيسية' : 'Accueil'}
            </Link>
            <ChevronRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
            <Link href={`/${locale}/organization#directions-services`} className="hover:text-blue-300 transition-colors">
              {t('organization.departments.title')}
            </Link>
            <ChevronRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
            <span className="text-blue-200">{isAr ? 'الحرس الوطني والبدوي التشادي' : 'Garde Nationale et Nomade du Tchad'}</span>
          </div>

          <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-center">
            <div className={isAr ? 'text-right' : 'text-left'}>
              <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-wide leading-tight mb-4">
                {isAr ? 'الحرس الوطني والبدوي التشادي' : 'Garde Nationale et Nomade du Tchad'}
              </h1>
              <p className="text-lg md:text-xl text-blue-100 max-w-3xl">
                {isAr ? gnntMeta.description.ar : gnntMeta.description.fr}
              </p>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-xl p-4">
              <img
                src={gnntMeta.logo}
                alt={isAr ? 'الشعار الرسمي للحرس الوطني والبدوي التشادي' : 'Logo institutionnel de la GNNT'}
                className="w-full h-56 md:h-64 object-contain rounded-lg bg-white/90 p-4"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <section aria-labelledby="dg-title">
            <h2
              id="dg-title"
              className={`text-3xl md:text-4xl font-bold uppercase tracking-wide text-slate-900 mb-8 ${isAr ? 'text-right' : 'text-left'}`}
            >
              {isAr ? 'المدير العام' : 'Directeur General'}
            </h2>
            <article className="bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8">
              <div className="grid md:grid-cols-[260px_1fr] gap-8 items-center">
                <div className="w-full max-w-[260px] mx-auto">
                  <img
                    src={gardeNationaleNomade.directeur.photo}
                    alt={
                      isAr
                        ? `صورة ${gardeNationaleNomade.directeur.titre} ${gardeNationaleNomade.directeur.nom}`
                        : `Photo de ${gardeNationaleNomade.directeur.titre} ${gardeNationaleNomade.directeur.nom}`
                    }
                    className="w-full h-72 object-cover rounded-lg shadow-sm"
                  />
                </div>
                <div className={isAr ? 'text-right' : 'text-left'}>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{gardeNationaleNomade.directeur.nom}</h3>
                  <p className="text-amber-700 font-semibold uppercase tracking-wide mb-4">{gardeNationaleNomade.directeur.titre}</p>
                  <p className="text-gray-700 leading-relaxed">{isAr ? gnntMeta.directeurDescription.ar : gnntMeta.directeurDescription.fr}</p>
                </div>
              </div>
            </article>
          </section>

          <section aria-labelledby="missions-title">
            <h2
              id="missions-title"
              className={`text-3xl md:text-4xl font-bold uppercase tracking-wide text-slate-900 mb-8 ${isAr ? 'text-right' : 'text-left'}`}
            >
              {isAr ? 'المهام الرئيسية' : 'Missions principales'}
            </h2>
            <ul className="grid md:grid-cols-2 gap-5" aria-label={isAr ? 'قائمة المهام الرئيسية' : 'Liste des missions principales'}>
              {gardeNationaleNomade.missions.map((mission, index) => {
                const Icon = missionIcons[index % missionIcons.length];

                return (
                  <li key={`${index}-${mission.fr}`} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-start gap-3">
                    <Icon className="w-5 h-5 text-amber-700 mt-1 shrink-0" aria-hidden="true" />
                    <span className={`text-gray-800 leading-relaxed ${isAr ? 'text-right' : 'text-left'}`}>
                      {isAr ? mission.ar : mission.fr}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>

          <section aria-labelledby="fonctions-title">
            <h2
              id="fonctions-title"
              className={`text-3xl md:text-4xl font-bold uppercase tracking-wide text-slate-900 mb-8 ${isAr ? 'text-right' : 'text-left'}`}
            >
              {isAr ? 'الوظائف' : 'Fonctions'}
            </h2>
            <ul className="space-y-4" aria-label={isAr ? 'قائمة الوظائف' : 'Liste des fonctions'}>
              {gardeNationaleNomade.fonctions.map((fonction, index) => (
                <li key={`${index}-${fonction.fr}`} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-start gap-3">
                  <Briefcase className="w-5 h-5 text-amber-700 mt-1 shrink-0" aria-hidden="true" />
                  <span className={`text-gray-800 leading-relaxed ${isAr ? 'text-right' : 'text-left'}`}>
                    {isAr ? fonction.ar : fonction.fr}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="services-title">
            <h2
              id="services-title"
              className={`text-3xl md:text-4xl font-bold uppercase tracking-wide text-slate-900 mb-8 ${isAr ? 'text-right' : 'text-left'}`}
            >
              {isAr ? 'الخدمات' : 'Services'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gardeNationaleNomade.services.map((service) => (
                <article key={service.nom.fr} className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <Landmark className="w-5 h-5 text-amber-700 mt-1 shrink-0" aria-hidden="true" />
                    <h3 className={`text-lg font-bold text-slate-900 ${isAr ? 'text-right' : 'text-left'}`}>
                      {isAr ? service.nom.ar : service.nom.fr}
                    </h3>
                  </div>
                  <p className={`text-gray-700 leading-relaxed ${isAr ? 'text-right' : 'text-left'}`}>
                    {isAr ? service.description.ar : service.description.fr}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
