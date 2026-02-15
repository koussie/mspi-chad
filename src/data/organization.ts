export type OrganizationUnit = {
  id: string;
  name_fr: string;
  name_ar: string;
  type: 'minister' | 'secretariat' | 'inspection' | 'cabinet' | 'direction' | 'agency' | 'advisor';
  parent?: string;
  order?: number;
};

export const organizationData: OrganizationUnit[] = [
  {
    id: 'minister',
    name_fr: 'Le Ministre',
    name_ar: 'الوزير',
    type: 'minister'
  },
  {
    id: 'secretariat',
    name_fr: 'Secrétariat Général',
    name_ar: 'الأمانة العامة',
    type: 'secretariat',
    parent: 'minister',
    order: 1
  },
  {
    id: 'inspection',
    name_fr: 'Inspection Générale',
    name_ar: 'المفتشية العامة',
    type: 'inspection',
    parent: 'minister',
    order: 2
  },
  {
    id: 'cabinet',
    name_fr: 'Cabinets',
    name_ar: 'الديوان',
    type: 'cabinet',
    parent: 'minister',
    order: 3
  },
  {
    id: 'dir_general',
    name_fr: 'Direction Générale',
    name_ar: 'المديرية العامة',
    type: 'direction',
    parent: 'secretariat',
    order: 1
  },
  {
    id: 'dir_legislation',
    name_fr: 'Direction de la Législation',
    name_ar: 'إدارة التشريع',
    type: 'direction',
    parent: 'secretariat',
    order: 2
  },
  {
    id: 'dir_archives',
    name_fr: 'Direction des Archives',
    name_ar: 'إدارة المحفوظات',
    type: 'direction',
    parent: 'secretariat',
    order: 3
  },
  {
    id: 'dir_finance',
    name_fr: 'Direction des Affaires Financières et de la Logistique',
    name_ar: 'إدارة الشؤون المالية واللوجستية',
    type: 'direction',
    parent: 'secretariat',
    order: 4
  },
  {
    id: 'dir_cooperation',
    name_fr: 'Direction de la Coopération',
    name_ar: 'إدارة التعاون',
    type: 'direction',
    parent: 'secretariat',
    order: 5
  },
  {
    id: 'garde_nationale',
    name_fr: 'Garde Nationale et Nomade du Tchad',
    name_ar: 'الحرس الوطني والبدوي لتشاد',
    type: 'direction',
    parent: 'secretariat',
    order: 6
  },
  {
    id: 'dir_police',
    name_fr: 'Direction Générale de la Police Nationale et de la Gendarmerie Nationale',
    name_ar: 'المديرية العامة للشرطة الوطنية والدرك الوطني',
    type: 'direction',
    parent: 'secretariat',
    order: 7
  },
  {
    id: 'centre_police',
    name_fr: 'Centre d\'Enregistrement des Données Policières',
    name_ar: 'مركز تسجيل البيانات الشرطية',
    type: 'direction',
    parent: 'secretariat',
    order: 8
  },
  {
    id: 'anats',
    name_fr: 'Agence Nationale de Titre Sécurisé (ANATS)',
    name_ar: 'الوكالة الوطنية للعناوين الآمنة',
    type: 'agency',
    parent: 'secretariat',
    order: 9
  },
  {
    id: 'ansice',
    name_fr: 'Agence Nationale de la Sécurité Informatique et de Certification Électronique',
    name_ar: 'الوكالة الوطنية لأمن المعلومات والشهادات الإلكترونية',
    type: 'agency',
    parent: 'secretariat',
    order: 10
  },
  {
    id: 'advisors',
    name_fr: 'Les Conseillers',
    name_ar: 'المستشارون',
    type: 'advisor',
    parent: 'cabinet',
    order: 1
  },
  {
    id: 'advisor_security',
    name_fr: 'Conseiller à la Sécurité',
    name_ar: 'مستشار الأمن',
    type: 'advisor',
    parent: 'cabinet',
    order: 2
  },
  {
    id: 'advisor_immigration',
    name_fr: 'Conseiller à l\'Immigration',
    name_ar: 'مستشار الهجرة',
    type: 'advisor',
    parent: 'cabinet',
    order: 3
  },
  {
    id: 'advisor_cooperation',
    name_fr: 'Conseiller à la Coopération Extérieure',
    name_ar: 'مستشار التعاون الخارجي',
    type: 'advisor',
    parent: 'cabinet',
    order: 4
  },
  {
    id: 'advisor_legal',
    name_fr: 'Conseiller Juridique',
    name_ar: 'المستشار القانوني',
    type: 'advisor',
    parent: 'cabinet',
    order: 5
  }
];

export type CabinetMember = {
  name: string;
  position_fr: string;
  position_ar: string;
  photo?: string;
};

export const cabinetMembers: CabinetMember[] = [
  {
    name: "Général Ali Ahmat Akhabach",
    position_fr: "Ministre de la Sécurité Publique et de l'Immigration",
    position_ar: "وزير الأمن العام والهجرة",
    photo: "/476099709_122207124110083693_75483258553399130_n.jpg"
  }
];

export type Department = {
  id: string;
  name_fr: string;
  name_ar: string;
  description_fr: string;
  description_ar: string;
  icon?: string;
};

export const departments: Department[] = [
  {
    id: 'police',
    name_fr: 'Police Nationale',
    name_ar: 'الشرطة الوطنية',
    description_fr: 'Maintien de l\'ordre et sécurité publique',
    description_ar: 'حفظ النظام والأمن العام'
  },
  {
    id: 'gendarmerie',
    name_fr: 'Gendarmerie Nationale',
    name_ar: 'الدرك الوطني',
    description_fr: 'Sécurité publique et ordre militaire',
    description_ar: 'الأمن العام والنظام العسكري'
  },
  {
    id: 'immigration',
    name_fr: 'Direction de l\'Immigration',
    name_ar: 'إدارة الهجرة',
    description_fr: 'Gestion des flux migratoires et contrôles frontaliers',
    description_ar: 'إدارة تدفقات الهجرة ومراقبة الحدود'
  },
  {
    id: 'garde',
    name_fr: 'Garde Nationale',
    name_ar: 'الحرس الوطني',
    description_fr: 'Protection du territoire et sécurité intérieure',
    description_ar: 'حماية الإقليم والأمن الداخلي'
  },
  {
    id: 'anats',
    name_fr: 'ANATS',
    name_ar: 'الوكالة الوطنية',
    description_fr: 'Délivrance de documents sécurisés',
    description_ar: 'إصدار الوثائق الآمنة'
  }
];
