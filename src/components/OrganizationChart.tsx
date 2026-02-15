'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

type OrganizationChartProps = {
  locale: string;
};

export default function OrganizationChart({ locale }: OrganizationChartProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['cabinet', 'secretariat', 'inspection']));

  const toggleSection = (id: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedSections(newExpanded);
  };

  const ministerTitle = locale === 'fr' ? 'Ministre' : 'الوزير';

  const sections = [
    {
      id: 'cabinet',
      title_fr: 'Cabinet du Ministre',
      title_ar: 'مكتب الوزير',
      items_fr: [
        'Conseiller Sécurité',
        'Conseiller Immigration',
        'Conseiller Coopération Extérieure',
        'Conseiller Juridique'
      ],
      items_ar: [
        'مستشار الأمن',
        'مستشار الهجرة',
        'مستشار التعاون الخارجي',
        'مستشار قانوني'
      ]
    },
    {
      id: 'secretariat',
      title_fr: 'Secrétariat Général',
      title_ar: 'الأمانة العامة',
      items_fr: [
        'Direction Générale',
        'Direction de la Législation',
        'Direction des Archives',
        'Direction des Affaires Financières et Logistique',
        'Direction de la Coopération',
        'Garde Nationale et Nomade du Tchad',
        'Direction Générale de la Police Nationale et de la Gendarmerie',
        'Centre d\'Enregistrement des Données Policières',
        'ANATS',
        'Agence Nationale de la Sécurité Informatique et Certification Électronique'
      ],
      items_ar: [
        'المديرية العامة',
        'مديرية التشريع',
        'مديرية الأرشيف',
        'مديرية الشؤون المالية واللوجستية',
        'مديرية التعاون',
        'الحرس الوطني والبدو في تشاد',
        'المديرية العامة للشرطة الوطنية والدرك',
        'مركز تسجيل البيانات البوليسية',
        'الوكالة الوطنية للأمن والتصديق الإلكتروني',
        'الوكالة الوطنية للأمن المعلوماتي والتصديق الإلكتروني'
      ]
    },
    {
      id: 'inspection',
      title_fr: 'Inspection Générale',
      title_ar: 'التفتيش العام',
      items_fr: [],
      items_ar: []
    }
  ];

  return (
    <div className="bg-gradient-to-br from-amber-50/30 to-stone-50/50 border border-stone-200/50 p-8 md:p-16 rounded-sm">
      <div className="text-center mb-16">
        <div className="inline-block border-2 border-stone-800 bg-white px-12 py-6 rounded-sm shadow-sm">
          <div className="text-base font-bold text-stone-900 uppercase tracking-widest">
            {ministerTitle}
          </div>
        </div>
      </div>

      <div className="relative mb-12">
        <div className="absolute left-1/2 top-0 w-px h-12 bg-stone-300 -translate-x-1/2 hidden md:block" />
      </div>

      <div className="grid md:grid-cols-3 gap-8 md:gap-12">
        {sections.map((section) => (
          <div key={section.id} className="relative">
            <div className="absolute top-0 left-1/2 w-px h-12 bg-stone-300 -translate-x-1/2 -mt-12 hidden md:block" />

            <div className="bg-white border border-stone-300 rounded-sm shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className={`w-full px-6 py-5 bg-gradient-to-r from-stone-50 to-amber-50/40 border-b border-stone-200 font-bold text-xs uppercase tracking-widest text-stone-900 hover:from-amber-50/60 hover:to-stone-50 transition-all ${locale === 'ar' ? 'text-right' : 'text-left'} md:text-center flex items-center justify-between md:justify-center gap-2`}
              >
                <span className="flex-1 md:flex-none">
                  {locale === 'fr' ? section.title_fr : section.title_ar}
                </span>
                <span className="md:hidden">
                  {expandedSections.has(section.id) ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              <div className={`${expandedSections.has(section.id) ? 'block' : 'hidden'} md:block`}>
                {(locale === 'fr' ? section.items_fr : section.items_ar).length > 0 ? (
                  <div className="divide-y divide-stone-100">
                    {(locale === 'fr' ? section.items_fr : section.items_ar).map((item, index) => (
                      <div
                        key={index}
                        className={`px-5 py-3 text-xs text-stone-700 hover:bg-amber-50/30 transition-colors ${locale === 'ar' ? 'text-right' : 'text-left'}`}
                      >
                        <span className="inline-block w-1.5 h-1.5 bg-amber-600 rounded-full mr-2"></span>
                        {item}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={`px-5 py-4 text-xs text-stone-500 italic ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                    {locale === 'fr' ? 'Bloc institutionnel' : 'كتلة مؤسسية'}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
