import Link from 'next/link';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { ChevronRight, ShieldCheck, Users, Siren, Building2, Briefcase, Landmark } from 'lucide-react';

export const dynamic = 'force-dynamic';

type LocaleText = {
  fr: string;
  ar: string;
};

type PoliceNationaleData = {
  directeur: {
    nom: string;
    titre: string;
    photo: string;
  };
  imageInstitutionnelle: string;
  description: LocaleText;
  directeurTexte: LocaleText;
  missions: LocaleText[];
  fonctions: LocaleText[];
  services: Array<{
    nom: LocaleText;
    description: LocaleText;
  }>;
};

// Donnees temporaires en attendant l'injection depuis une source metier.
const policeNationale: PoliceNationaleData = {
  directeur: {
    nom: 'TOUGOUD DIGO MAIDE',
    titre: 'Contrôleur Général de Police',
    photo: '/images/police-nationale/photo-dg-police.jpg'
  },
  imageInstitutionnelle: '/images/police-nationale/logo-police.jpg',
  description: {
    fr: "Assurer la sécurité publique et le maintien de l'ordre sur l'ensemble du territoire national.",
    ar: 'ضمان الامن العام وحفظ النظام في كامل التراب الوطني.'
  },
  directeurTexte: {
    fr: "La Direction Générale de la Police Nationale coordonne les opérations, encadre les unités territoriales et veille à l'application rigoureuse des lois de la République.",
    ar: 'تنسق المديرية العامة للشرطة الوطنية العمليات وتؤطر الوحدات الترابية وتسهر على التطبيق الصارم لقوانين الجمهورية.'
  },
  missions: [
    {
      fr: "Maintien de l'ordre public",
      ar: 'حفظ النظام العام'
    },
    {
      fr: 'Protection des personnes et des biens',
      ar: 'حماية الاشخاص والممتلكات'
    },
    {
      fr: 'Lutte contre la criminalite',
      ar: 'مكافحة الجريمة'
    },
    {
      fr: 'Sécurité urbaine',
      ar: 'الأمن الحضري'
    }
  ],
  fonctions: [
    {
      fr: 'Planifier et conduire les opérations de police sur le territoire national.',
      ar: 'تخطيط وقيادة عمليات الشرطة على المستوى الوطني.'
    },
    {
      fr: 'Assurer la coordination avec les autres forces de sécurité et les autorités administratives.',
      ar: 'ضمان التنسيق مع باقي قوات الامن والسلطات الادارية.'
    },
    {
      fr: 'Superviser la prévention, le renseignement criminel et les interventions spécialisées.',
      ar: 'الاشراف على الوقاية والاستخبار الجنائي والتدخلات المتخصصة.'
    },
    {
      fr: 'Renforcer la proximité avec les citoyens et la qualité du service public de sécurité.',
      ar: 'تعزيز القرب من المواطنين وجودة خدمة الامن العام.'
    }
  ],
  services: [
    {
      nom: {
        fr: 'Direction de la Securite Publique',
        ar: 'ادارة الامن العام'
      },
      description: {
        fr: 'Coordonne la police de proximité, la surveillance générale et les interventions quotidiennes.',
        ar: 'تنسق شرطة القرب والمراقبة العامة والتدخلات اليومية.'
      }
    },
    {
      nom: {
        fr: 'Direction de la Police Judiciaire',
        ar: 'ادارة الشرطة القضائية'
      },
      description: {
        fr: 'Mène les enquêtes, lutte contre la criminalité organisée et appuie les magistrats compétents.',
        ar: 'تجري التحقيقات وتكافح الجريمة المنظمة وتدعم السلطات القضائية المختصة.'
      }
    },
    {
      nom: {
        fr: 'Direction des Renseignements et de l’Analyse',
        ar: 'ادارة الاستعلام والتحليل'
      },
      description: {
        fr: 'Collecte et analyse les informations utiles à la prévention des menaces sécuritaires.',
        ar: 'تجمع وتحلل المعلومات اللازمة للوقاية من التهديدات الامنية.'
      }
    }
  ]
};

const missionIcons = [ShieldCheck, Users, Siren, Building2];

export default async function PoliceNationalePage({
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
            <Link href={`/${locale}/organization`} className="hover:text-blue-300 transition-colors">
              {t('organization.departments.title')}
            </Link>
            <ChevronRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
            <span className="text-blue-200">{isAr ? 'الشرطة الوطنية' : 'Police Nationale'}</span>
          </div>

          <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-center">
            <div className={isAr ? 'text-right' : 'text-left'}>
              <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-wide leading-tight mb-4">
                {isAr ? 'الشرطة الوطنية' : 'Police Nationale'}
              </h1>
              <p className="text-lg md:text-xl text-blue-100 max-w-3xl">
                {isAr ? policeNationale.description.ar : policeNationale.description.fr}
              </p>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-xl p-4">
              <img
                src={policeNationale.imageInstitutionnelle}
                alt={isAr ? 'الشعار الرسمي للشرطة الوطنية' : 'Logo institutionnel de la Police Nationale'}
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
              {isAr ? 'المدير العام' : 'Directeur Général'}
            </h2>
            <article className="bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8">
              <div className="grid md:grid-cols-[260px_1fr] gap-8 items-center">
                <div className="w-full max-w-[260px] mx-auto">
                  <img
                    src={policeNationale.directeur.photo}
                    alt={
                      isAr
                        ? `صورة ${policeNationale.directeur.titre} ${policeNationale.directeur.nom}`
                        : `Photo de ${policeNationale.directeur.titre} ${policeNationale.directeur.nom}`
                    }
                    className="w-full h-72 object-cover rounded-lg shadow-sm"
                  />
                </div>
                <div className={isAr ? 'text-right' : 'text-left'}>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{policeNationale.directeur.nom}</h3>
                  <p className="text-amber-700 font-semibold uppercase tracking-wide mb-4">{policeNationale.directeur.titre}</p>
                  <p className="text-gray-700 leading-relaxed">
                    {isAr ? policeNationale.directeurTexte.ar : policeNationale.directeurTexte.fr}
                  </p>
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
              {policeNationale.missions.map((mission, index) => {
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
              {policeNationale.fonctions.map((fonction, index) => (
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
              {policeNationale.services.map((service) => (
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
