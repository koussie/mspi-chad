export type NewsVideo = {
  type: 'youtube' | 'mp4';
  url: string;
  thumbnail?: string;
};

export type NewsItem = {
  id: string;
  slug: string;
  title: {
    fr: string;
    ar: string;
  };
  excerpt: {
    fr: string;
    ar: string;
  };
  content: {
    fr: string;
    ar: string;
  };
  date: string;
  coverImage: string;
  gallery?: string[];
  video?: NewsVideo;
};

export const newsItems: NewsItem[] = [
  {
    id: 'news-cooperation-onu-securite-2025-03-28',
    slug: 'cooperation-tchad-agences-onusiennes-securite-refugies',
    title: {
      fr: 'Securite : la cooperation entre le Tchad et les agences onusiennes au coeur de l’entrevue',
      ar: 'الأمن: التعاون بين تشاد ووكالات الامم المتحدة في صلب المباحثات',
    },
    excerpt: {
      fr: "Le Ministre de la Securite Publique et de l'Immigration a recu le representant resident du Systeme des Nations unies pour renforcer la securisation des camps de refugies et la cooperation avec les agences onusiennes.",
      ar: 'استقبل وزير الامن العام والهجرة المنسق المقيم لمنظومة الامم المتحدة بهدف تعزيز تامين مخيمات اللاجئين وتقوية التعاون مع وكالات الامم المتحدة.',
    },
    content: {
      fr: "Le vendredi 28 mars 2025, le Ministre de la Securite Publique et de l'Immigration a recu en audience le representant resident du Systeme des Nations unies au Tchad, M. Francois Batalingaya.\n\nLes echanges ont principalement porte sur la securisation des camps de refugies a l'Est du pays, ainsi que sur le renforcement de la cooperation entre le Tchad et les agences onusiennes.\n\nDans un climat de cordialite, le Ministre de la Securite Publique et de l'Immigration, le General de Corps d'Armee Ali Ahmat Aghabache, entoure de ses proches collaborateurs, a longuement echange avec la delegation des Nations unies. Face aux defis securitaires croissants dans la sous-region, le Tchad reaffirme son engagement a garantir la protection des milliers de refugies presentes sur son territoire, en particulier dans la bande frontaliere orientale.\n\nLe Ministre a souligne les efforts continus du Gouvernement dans ce domaine et a reaffirme la volonte des autorites de travailler en etroite collaboration avec les partenaires internationaux.",
      ar: 'يوم الجمعة 28 مارس 2025، استقبل وزير الامن العام والهجرة المنسق المقيم لمنظومة الامم المتحدة في تشاد، السيد فرنسوا باتالينغايا.\n\nوتركزت المباحثات على تامين مخيمات اللاجئين في شرق البلاد، وعلى تعزيز التعاون بين تشاد ووكالات الامم المتحدة.\n\nوفي اجواء اتسمت بالودية، اجرى وزير الامن العام والهجرة، الفريق علي احمد اغاباش، محادثات مطولة مع وفد الامم المتحدة بحضور اقرب مساعديه. وامام التحديات الامنية المتزايدة في المنطقة دون الاقليمية، تؤكد تشاد التزامها بضمان حماية الاف اللاجئين الموجودين على اراضيها، خصوصا في الشريط الحدودي الشرقي.\n\nكما ابرز الوزير الجهود المتواصلة التي تبذلها الحكومة في هذا المجال، مجددا ارادة السلطات في العمل بتنسيق وثيق مع الشركاء الدوليين.',
    },
    date: '2025-03-28',
    coverImage: '/uploads/news/actu-3/486991309_122216991164083693_4275138477036728894_n.jpg',
    gallery: [
      '/uploads/news/actu-3/487215457_122216991122083693_1706397366602004589_n.jpg',
      '/uploads/news/actu-3/487457984_122216991206083693_7891498410414958827_n.jpg',
    ],
  },
  {
    id: 'news-oim-frontieres-2025-03-05',
    slug: 'securisation-frontieres-oim-engagement-gouvernement',
    title: {
      fr: "Securisation des frontieres : l'OIM salue l'engagement du Gouvernement",
      ar: 'تأمين الحدود: المنظمة الدولية للهجرة تشيد بالتزام الحكومة',
    },
    excerpt: {
      fr: "Le Ministre de la Securite Publique et de l'Immigration a recu le representant de l'OIM pour renforcer la cooperation sur la gestion et la securisation des frontieres.",
      ar: 'استقبل وزير الامن العام والهجرة ممثل المنظمة الدولية للهجرة لتعزيز التعاون في مجال ادارة الحدود وتامينها.',
    },
    content: {
      fr: "A la suite d'une mission de terrain, le Ministre de la Securite Publique et de l'Immigration, le General de Corps d'Armee Ali Ahmat Aghabache, a recu en audience, le mercredi 5 mars 2025, le representant de l'Organisation Internationale pour les Migrations (OIM), M. Pascal Reyntjens.\n\nLes echanges ont porte sur la gestion et la securisation des frontieres, un enjeu majeur pour la stabilite nationale. Le Ministre a reaffirme l'engagement du Gouvernement en faveur d'un controle migratoire efficace, conciliant fermete et respect des droits humains.\n\nLe representant de l'OIM a salue les efforts du ministere et a souligne l'importance d'une cooperation internationale renforcee. Cette dynamique traduit la volonte des autorites de consolider un partenariat strategique dans la gestion des questions migratoires.",
      ar: 'على اثر مهمة ميدانية، استقبل وزير الامن العام والهجرة، الفريق علي احمد اغاباش، يوم الاربعاء 5 مارس 2025، ممثل المنظمة الدولية للهجرة السيد باسكال رينتجنز.\n\nوتناولت المباحثات قضايا ادارة الحدود وتامينها، وهي مسالة اساسية لاستقرار البلاد. وقد جدد الوزير التزام الحكومة بتحقيق ضبط فعال للهجرة، يجمع بين الحزم واحترام حقوق الانسان.\n\nمن جهته، اشاد ممثل المنظمة الدولية للهجرة بجهود الوزارة، واكد اهمية تعزيز التعاون الدولي. وتعكس هذه الخطوات حرص السلطات على ترسيخ شراكة استراتيجية في معالجة قضايا الهجرة.',
    },
    date: '2025-03-05',
    coverImage: '/uploads/news/actu-1/489986178_122219253230083693_6342548112300143937_n.jpg',
    gallery: [
      '/uploads/news/actu-1/489685550_122219253320083693_2768513298661076118_n.jpg',
      '/uploads/news/actu-1/489947335_122219253458083693_5249097592622261868_n.jpg',
      '/uploads/news/actu-1/490472690_122219253500083693_3723702235706970782_n.jpg',
    ],
  },
  {
    id: 'news-visite-isip-2025-02-05',
    slug: 'visite-ministre-unite-speciale-intervention-police-isip',
    title: {
      fr: "Visite du Ministre a l'Unite Speciale d'Intervention de la Police (ISIP)",
      ar: 'زيارة الوزير الى الوحدة الخاصة لتدخل الشرطة (ISIP)',
    },
    excerpt: {
      fr: "Le Ministre a effectue une visite a l'ISIP de Diguel pour evaluer les retards observes et renforcer le controle general des agents de securite interieure.",
      ar: 'قام الوزير بزيارة الى وحدة ISIP في ديغويل لتقييم التأخر المسجل وتعزيز الرقابة العامة على اعوان الامن الداخلي.',
    },
    content: {
      fr: "Le mercredi 5 fevrier 2025, le Ministre de la Securite Publique et de l'Immigration, le General de Corps d'Armee Ali Ahmat Aghabache, a effectue une visite a l'Unite Speciale d'Intervention de la Police (ISIP), situee dans le quartier de Diguel, dans le 8e arrondissement de la capitale.\n\nCette descente visait a mieux comprendre les raisons des retards observes parmi certaines forces de securite interieure dans le cadre du controle general des agents.\n\nA travers cette mission, le ministere reaffirme sa volonte de renforcer la discipline operationnelle, l'efficacite des unites et la qualite du service public de securite.",
      ar: 'يوم الاربعاء 5 فبراير 2025، قام وزير الامن العام والهجرة، الفريق علي احمد اغاباش، بزيارة الى الوحدة الخاصة لتدخل الشرطة (ISIP) الواقعة بحي ديغويل في الدائرة الثامنة من العاصمة.\n\nوهدفت هذه الزيارة الى فهم اسباب التأخر المسجل لدى بعض قوى الامن الداخلي في ما يتعلق بالرقابة العامة على الاعوان.\n\nومن خلال هذه المهمة، تؤكد الوزارة ارادتها في تعزيز الانضباط العملياتي ورفع فعالية الوحدات وتحسين جودة خدمة الامن العمومي.',
    },
    date: '2025-02-05',
    coverImage: '/uploads/news/actu-2/481215825_122212625468083693_1072192809345388500_n.jpg',
    gallery: [
      '/uploads/news/actu-2/481265596_122212625426083693_6755958357807468099_n.jpg',
      '/uploads/news/actu-2/481463758_122212625510083693_2600334700598701272_n.jpg',
      '/uploads/news/actu-2/481697477_122212624646083693_6739922095213653959_n.jpg',
    ],
    video: {
      type: 'mp4',
      url: '/uploads/news/videos/video-publication-1.mp4',
      thumbnail: '/uploads/news/actu-2/481215825_122212625468083693_1072192809345388500_n.jpg',
    },
  },
];

export function getAllNews(): NewsItem[] {
  return [...newsItems].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return newsItems.find((item) => item.slug === slug);
}

export function getNewsBySlugOrId(value: string): NewsItem | undefined {
  return newsItems.find((item) => item.slug === value || item.id === value);
}
