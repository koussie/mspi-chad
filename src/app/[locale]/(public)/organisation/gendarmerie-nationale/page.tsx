import Link from 'next/link';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { ChevronRight, Shield, Users, Siren, Scale, Briefcase, Landmark } from 'lucide-react';

export const dynamic = 'force-dynamic';

type LocaleText = {
  fr: string;
  ar: string;
};

type ServiceItem = {
  nom: LocaleText;
  description: LocaleText;
};

type GendarmerieNationaleData = {
  directeur: {
    nom: string;
    titre: string;
    photo: string;
  };
  missions: LocaleText[];
  fonctions: LocaleText[];
  services: ServiceItem[];
  logo: string;
  description: LocaleText;
  directeurDescription: LocaleText;
};

const gendarmerieNationale: GendarmerieNationaleData = {
  directeur: {
    nom: 'General de division Djiddo Mahamat Haggar',
    titre: 'Directeur General de la Gendarmerie Nationale',
    photo: '/images/gendarmerie-nationale/photo-dg-gendarmerie.jpg',
  },
  missions: [
    {
      fr: 'Maintien de la securite dans les zones rurales',
      ar: 'الحفاظ على الامن في المناطق الريفية',
    },
    {
      fr: 'Protection des populations et des biens',
      ar: 'حماية السكان والممتلكات',
    },
    {
      fr: "Maintien et retablissement de l'ordre public",
      ar: 'حفظ النظام العام واعادته عند الاضطراب',
    },
    {
      fr: 'Lutte contre la criminalite et la delinquance',
      ar: 'مكافحة الجريمة والانحراف',
    },
  ],
  fonctions: [
    {
      fr: 'Assurer la securite publique sur le territoire national avec un maillage prioritaire en milieu rural.',
      ar: 'ضمان الامن العام على التراب الوطني مع انتشار اولوي في الوسط الريفي.',
    },
    {
      fr: 'Executer les missions de police administrative et judiciaire en appui aux autorites competentes.',
      ar: 'تنفيذ مهام الشرطة الادارية والقضائية دعما للسلطات المختصة.',
    },
    {
      fr: 'Contribuer a la prevention des troubles et a la protection des institutions et des infrastructures sensibles.',
      ar: 'المساهمة في الوقاية من الاضطرابات وحماية المؤسسات والبنى التحتية الحساسة.',
    },
    {
      fr: 'Coordonner les actions avec les autres forces de defense et de securite pour une reponse integree.',
      ar: 'تنسيق العمل مع باقي قوات الدفاع والامن لضمان استجابة متكاملة.',
    },
  ],
  services: [
    {
      nom: {
        fr: 'Commandement Territorial',
        ar: 'القيادة الترابية',
      },
      description: {
        fr: 'Pilotage des unites territoriales et coordination des interventions de proximite.',
        ar: 'ادارة الوحدات الترابية وتنسيق التدخلات الميدانية القريبة.',
      },
    },
    {
      nom: {
        fr: 'Police Judiciaire de la Gendarmerie',
        ar: 'الشرطة القضائية للدرك',
      },
      description: {
        fr: 'Enquetes, recherche des infractions et appui aux autorites judiciaires.',
        ar: 'التحقيقات والبحث عن الجرائم ودعم السلطات القضائية.',
      },
    },
    {
      nom: {
        fr: 'Unites d Intervention et de Maintien de l Ordre',
        ar: 'وحدات التدخل وحفظ النظام',
      },
      description: {
        fr: "Intervention rapide lors des crises et retablissement de l'ordre public.",
        ar: 'تدخل سريع اثناء الازمات واعادة النظام العام.',
      },
    },
  ],
  logo: '/images/gendarmerie-nationale/logo-gendarmerie.jpg',
  description: {
    fr: 'La Gendarmerie Nationale est une force de securite publique chargee d assurer la protection des populations, le maintien de l ordre et la securite sur l ensemble du territoire national, notamment dans les zones rurales.',
    ar: 'الدرك الوطني قوة امن عمومي مكلفة بحماية السكان وحفظ النظام وتامين كامل التراب الوطني، خصوصا في المناطق الريفية.',
  },
  directeurDescription: {
    fr: 'Le Directeur General assure la conduite strategique, la coordination operationnelle des unites et le renforcement continu de la presence de la Gendarmerie Nationale au service des citoyens.',
    ar: 'يشرف المدير العام على التوجيه الاستراتيجي والتنسيق العملياتي للوحدات وتعزيز حضور الدرك الوطني باستمرار لخدمة المواطنين.',
  },
};

const missionIcons = [Shield, Users, Siren, Scale];

export default async function GendarmerieNationalePage({
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
            <span className="text-blue-200">{isAr ? 'الدرك الوطني' : 'Gendarmerie Nationale'}</span>
          </div>

          <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-center">
            <div className={isAr ? 'text-right' : 'text-left'}>
              <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-wide leading-tight mb-4">
                {isAr ? 'الدرك الوطني' : 'Gendarmerie Nationale'}
              </h1>
              <p className="text-lg md:text-xl text-blue-100 max-w-3xl">
                {isAr ? gendarmerieNationale.description.ar : gendarmerieNationale.description.fr}
              </p>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-xl p-4">
              <img
                src={gendarmerieNationale.logo}
                alt={isAr ? 'الشعار الرسمي للدرك الوطني' : 'Logo institutionnel de la Gendarmerie Nationale'}
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
                    src={gendarmerieNationale.directeur.photo}
                    alt={
                      isAr
                        ? `صورة ${gendarmerieNationale.directeur.titre} ${gendarmerieNationale.directeur.nom}`
                        : `Photo de ${gendarmerieNationale.directeur.titre} ${gendarmerieNationale.directeur.nom}`
                    }
                    className="w-full h-72 object-cover rounded-lg shadow-sm"
                  />
                </div>
                <div className={isAr ? 'text-right' : 'text-left'}>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{gendarmerieNationale.directeur.nom}</h3>
                  <p className="text-amber-700 font-semibold uppercase tracking-wide mb-4">{gendarmerieNationale.directeur.titre}</p>
                  <p className="text-gray-700 leading-relaxed">
                    {isAr ? gendarmerieNationale.directeurDescription.ar : gendarmerieNationale.directeurDescription.fr}
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
              {gendarmerieNationale.missions.map((mission, index) => {
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
              {gendarmerieNationale.fonctions.map((fonction, index) => (
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
              {gendarmerieNationale.services.map((service) => (
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
