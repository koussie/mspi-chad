import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import { CheckCircle, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();

  const { data: content } = await supabase
    .from('page_contents')
    .select()
    .eq('slug', 'about')
    .maybeSingle();

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
              {t('about.breadcrumb.home')}
            </Link>
            <ChevronRight className={`w-4 h-4 ${locale === 'ar' ? 'rotate-180' : ''}`} />
            <span className="text-blue-200">{t('about.breadcrumb.current')}</span>
          </div>

          <div className="text-center">
            <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase tracking-wide leading-tight drop-shadow-2xl mb-4">
              {t('about.title')}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
              {t('about.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className={locale === 'ar' ? 'order-2 md:order-1' : 'order-1'}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight uppercase tracking-wide text-slate-900">
                {t('about.welcome.title')}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-10">
                {t('about.welcome.intro')}
              </p>
              <div className="bg-gray-50 rounded-lg p-8 border-l-4 border-amber-600">
                <h3 className="text-2xl font-bold mb-6 uppercase tracking-wide text-slate-900">
                  {t('about.welcome.mandateTitle')}
                </h3>
                <ul className="space-y-4">
                  <li className="flex gap-3 items-start">
                    <CheckCircle className="w-6 h-6 text-stone-700 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 leading-relaxed">
                      {t('about.welcome.mandate.security')}
                    </span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <CheckCircle className="w-6 h-6 text-stone-700 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 leading-relaxed">
                      {t('about.welcome.mandate.order')}
                    </span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <CheckCircle className="w-6 h-6 text-stone-700 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 leading-relaxed">
                      {t('about.welcome.mandate.migration')}
                    </span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <CheckCircle className="w-6 h-6 text-stone-700 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 leading-relaxed">
                      {t('about.welcome.mandate.borders')}
                    </span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <CheckCircle className="w-6 h-6 text-stone-700 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 leading-relaxed">
                      {t('about.welcome.mandate.coordination')}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className={locale === 'ar' ? 'order-1 md:order-2' : 'order-2'}>
              <div className="relative h-[400px] md:h-[600px] rounded-xl overflow-hidden shadow-2xl group">
                <Image
                  src="/images/facade-ministere.jpg"
                  alt={locale === 'fr'
                    ? 'Façade du Ministère de la Sécurité Publique et de l\'Immigration du Tchad'
                    : 'واجهة وزارة الأمن العام والهجرة في تشاد'}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {content && (
            <div className="prose prose-lg max-w-none">
              <p className="text-xl leading-relaxed text-gray-700">
                {locale === 'fr' ? content.content_fr : content.content_ar}
              </p>
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 mx-auto mb-6 bg-stone-800 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 uppercase tracking-wide">{t('about.mission')}</h3>
              <p className="text-gray-700 leading-relaxed">
                {locale === 'fr'
                  ? 'Assurer la sécurité des citoyens et la protection du territoire national'
                  : 'ضمان أمن المواطنين وحماية الإقليم الوطني'}
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 mx-auto mb-6 bg-stone-800 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 uppercase tracking-wide">{t('about.vision')}</h3>
              <p className="text-gray-700 leading-relaxed">
                {locale === 'fr'
                  ? 'Un Tchad sûr et prospère pour tous les citoyens'
                  : 'تشاد آمنة ومزدهرة لجميع المواطنين'}
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 mx-auto mb-6 bg-stone-800 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 uppercase tracking-wide">{t('about.values')}</h3>
              <p className="text-gray-700 leading-relaxed">
                {locale === 'fr'
                  ? 'Intégrité, professionnalisme et service à la nation'
                  : 'النزاهة والاحترافية والخدمة للأمة'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 uppercase tracking-wide text-center">
            {locale === 'fr' ? 'Le Ministre' : 'الوزير'}
          </h2>

          <div className="bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-100">
            <div className="md:flex">
              <div className="md:w-1/3">
                <img
                  src="/476099709_122207124110083693_75483258553399130_n.jpg"
                  alt="Général Ali Ahmat Akhabach"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-2/3 p-8 md:p-12">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  {locale === 'fr'
                    ? 'Général Ali Ahmat Akhabach'
                    : 'الجنرال علي أحمد أخباش'}
                </h3>
                <p className="text-amber-700 font-semibold mb-6 uppercase tracking-wide">
                  {locale === 'fr'
                    ? 'Ministre de la Sécurité Publique et de l\'Immigration'
                    : 'وزير الأمن العام والهجرة'}
                </p>

                {locale === 'fr' ? (
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                      Par Décret N°0995/PR/PM/2024 du 12 octobre 2024, portant nomination de deux membres du gouvernement,
                      le Général Ali Ahmat Akhabach est nommé à la tête du département de la Sécurité Publique et de l'immigration.
                    </p>
                    <p>
                      Taille imposante, sourire en coin voire effacé pour certains, courtois, calme et rigoureux,
                      la nomination du Général de Corps d'armée Ali Ahmat Akabach, à la tête du département de la
                      Sécurité Publique et de l'immigration est le fruit d'un travail acharné abattu depuis belle lurette.
                    </p>
                    <p>
                      Né le 26 Avril 1975 dans une famille modeste, ses études primaires et secondaires sont couronnées de succès.
                      Après son Baccalauréat, il va opter pour la carrière militaire. En 1996, il va gagner une bourse militaire
                      et s'envolera pour l'Irak où il participera à une formation de taille.
                    </p>
                    <p>
                      De retour au pays, il sera très vite sollicité par le Feu Maréchal du Tchad Idriss Déby Itno pour occuper
                      des grandes responsabilités au sein de l'Armée Nationale Tchadienne. Parallèlement, il poursuit ses études
                      supérieures en s'inscrivant à l'Université de Khartoum avec une Licence en Science Politique, Master en
                      Études Stratégiques et un autre Master en Relation Internationale, Négociation et l'Administration des Affaires.
                    </p>
                    <p>
                      Six ans auprès du Feu Maréchal du Tchad en tant que Conseiller spécial, il est affecté en Koweït comme
                      le tout Premier Ambassadeur du Tchad. Il y fait six ans et ses actions ont permis de consolider la
                      coopération entre ces deux pays.
                    </p>
                    <p>
                      Rappelé au pays, Ali Ahmat Akhabach va servir en qualité d'un grand Officier toujours sollicité pour
                      ses expériences au Ministère de la Défense Nationale. Cet homme épris de paix et d'unité nationale est
                      nommé en Septembre 2021, Coordonnateur de la cellule d'appui et d'insertion des militaires démobilisés.
                    </p>
                    <p>
                      Le 15 Octobre 2021, le Président du Conseil Militaire de Transition, Mahamat Idriss Déby Itno,
                      Président de la République lui confie une lourde responsabilité qu'est la gestion de la Province du Moyen-Chari.
                      Du haut de ses nouvelles fonctions de Gouverneur de la Province du Moyen-Chari, le Général de Division
                      Ali Ahmat Akabach ne s'enlace jamais pour restaurer l'autorité de l'État, le respect de la hiérarchie
                      et traduire dans les faits, la politique du Gouvernement de Transition couronnée de la question de la paix
                      et de la cohabitation pacifique.
                    </p>
                    <p>
                      Soldat loyal, il sera sollicité à l'état-major général des armées. 2ème adjoint au CEMGA puis 1er adjoint
                      au CEMGA, une nouvelle aventure se dessine. Les plus Hautes Autorités, convaincues de son dynamisme,
                      de sa technicité, il est nommé Ministre de la Sécurité Publique et de l'immigration en remplacement
                      du Contrôleur Général Mahamat Charfadine Margui.
                    </p>
                  </div>
                ) : (
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4" dir="rtl">
                    <p>
                      بموجب المرسوم رقم 0995/PR/PM/2024 المؤرخ في 12 أكتوبر 2024، بشأن تعيين عضوين في الحكومة،
                      تم تعيين الجنرال علي أحمد أخباش على رأس وزارة الأمن العام والهجرة.
                    </p>
                    <p>
                      ولد في 26 أبريل 1975 في عائلة متواضعة، وكللت دراساته الابتدائية والثانوية بالنجاح.
                      بعد حصوله على شهادة البكالوريا، اختار المسار العسكري. في عام 1996، حصل على منحة عسكرية
                      وسافر إلى العراق حيث شارك في تدريب كبير.
                    </p>
                    <p>
                      عند عودته إلى البلاد، تم استدعاؤه بسرعة من قبل المشير الراحل لتشاد إدريس ديبي إتنو
                      لتولي مسؤوليات كبيرة داخل الجيش الوطني التشادي. وبالتوازي، واصل دراسته العليا بالالتحاق
                      بجامعة الخرطوم حيث حصل على الإجازة في العلوم السياسية، والماجستير في الدراسات الاستراتيجية
                      وماجستير آخر في العلاقات الدولية والتفاوض وإدارة الأعمال.
                    </p>
                    <p>
                      قضى ست سنوات بجانب المشير الراحل لتشاد كمستشار خاص، ثم تم تعيينه في الكويت كأول سفير
                      لتشاد. قضى هناك ست سنوات وساهمت أعماله في توطيد التعاون بين البلدين.
                    </p>
                    <p>
                      بعد عودته إلى البلاد، خدم علي أحمد أخباش كضابط كبير يُستدعى دائمًا لخبرته في وزارة الدفاع الوطني.
                      هذا الرجل المحب للسلام والوحدة الوطنية تم تعيينه في سبتمبر 2021 منسقًا لخلية دعم وإدماج
                      العسكريين المسرحين.
                    </p>
                    <p>
                      في 15 أكتوبر 2021، عهد إليه رئيس المجلس العسكري الانتقالي، محمد إدريس ديبي إتنو،
                      رئيس الجمهورية، بمسؤولية ثقيلة تتمثل في إدارة إقليم موين شاري. من موقعه الجديد كحاكم
                      لإقليم موين شاري، عمل الجنرال علي أحمد أخباش على استعادة سلطة الدولة واحترام التسلسل
                      الهرمي وترجمة سياسة الحكومة الانتقالية المتوجة بمسألة السلام والتعايش السلمي إلى واقع.
                    </p>
                    <p>
                      جندي مخلص، تم استدعاؤه إلى الأركان العامة للجيوش. نائب ثانٍ لرئيس الأركان ثم نائب أول
                      لرئيس الأركان، بدأت مغامرة جديدة. اقتناعًا من أعلى السلطات بديناميكيته وكفاءته التقنية،
                      تم تعيينه وزيرًا للأمن العام والهجرة خلفًا للمراقب العام محمد شرف الدين مرقي.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
