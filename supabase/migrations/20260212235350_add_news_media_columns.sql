/*
  # Ajout des colonnes manquantes pour Actualités et Médiathèque

  ## Modifications

  ### Table `news`
    - Ajout de `slug` (text, unique) pour URL-friendly
    - Ajout de `images` (jsonb) pour galerie photos
    - Ajout de `youtube_video_id` (text, nullable) pour vidéos YouTube

  ### Table `media_albums`
    - Ajout de `images` (jsonb) pour stocker les images de l'album

  ### Table `media_videos`
    - Ajout de `description_fr` (text, nullable)
    - Ajout de `description_ar` (text, nullable)
    - Ajout de `youtube_id` (text) pour l'ID de la vidéo
    - Ajout de `thumbnail` (text, nullable) pour la miniature

  ## Données
    - Insertion de l'actualité sur la Guinée équatoriale
    - Insertion de l'album photo associé
    - Insertion de la vidéo YouTube associée
*/

-- Ajout des colonnes manquantes à la table news
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'news' AND column_name = 'slug'
  ) THEN
    ALTER TABLE news ADD COLUMN slug text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'news' AND column_name = 'images'
  ) THEN
    ALTER TABLE news ADD COLUMN images jsonb DEFAULT '[]'::jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'news' AND column_name = 'youtube_video_id'
  ) THEN
    ALTER TABLE news ADD COLUMN youtube_video_id text;
  END IF;
END $$;

-- Ajout des colonnes manquantes à media_albums
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'media_albums' AND column_name = 'images'
  ) THEN
    ALTER TABLE media_albums ADD COLUMN images jsonb DEFAULT '[]'::jsonb;
  END IF;
END $$;

-- Ajout des colonnes manquantes à media_videos
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'media_videos' AND column_name = 'description_fr'
  ) THEN
    ALTER TABLE media_videos ADD COLUMN description_fr text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'media_videos' AND column_name = 'description_ar'
  ) THEN
    ALTER TABLE media_videos ADD COLUMN description_ar text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'media_videos' AND column_name = 'youtube_id'
  ) THEN
    ALTER TABLE media_videos ADD COLUMN youtube_id text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'media_videos' AND column_name = 'thumbnail'
  ) THEN
    ALTER TABLE media_videos ADD COLUMN thumbnail text;
  END IF;
END $$;

-- Insérer l'actualité sur la Guinée équatoriale
INSERT INTO news (
  id,
  slug,
  title_fr,
  title_ar,
  excerpt_fr,
  excerpt_ar,
  content_fr,
  content_ar,
  cover_image,
  images,
  youtube_video_id,
  status,
  published_at
) VALUES (
  'news-guinee-equatoriale-2025',
  'cooperation-bilaterale-guinee-equatoriale-tchad',
  'Diplomatie : la Coopération bilatérale entre la Guinée équatoriale et le Tchad au cœur d''une entrevue',
  'الدبلوماسية: التعاون الثنائي بين غينيا الاستوائية وتشاد في صميم اجتماع',
  'Ce mardi 08 avril, le ministre de la sécurité publique et de l''immigration le Général du Corps d''Armée Ali Ahmat Aghabache a reçu son Excellence l''Ambassadeur de la Guinée équatoriale, Leandro Ebang Miko Angue, pour une entrevue riche en échanges diplomatiques.',
  'يوم الثلاثاء 8 أبريل، استقبل وزير الأمن العام والهجرة الجنرال علي أحمد أغاباش سعادة سفير غينيا الاستوائية.',
  'Ce mardi 08 avril, le ministre de la sécurité publique et de l''immigration le Général du Corps d''Armée Ali Ahmat Aghabache a reçu son Excellence l''Ambassadeur de la Guinée équatoriale, Leandro Ebang Miko Angue, pour une entrevue riche en échanges diplomatiques entre les deux états frères. Il est porteur d''un message du ministre de la sécurité guinéenne.

Cet entretien, bien que dépourvu de toute proximité géographique entre les deux pays, s''est inscrit dans la continuité d''une histoire partagée et d''une coopération qui se renforce de jour en jour. L''objet principal de la rencontre est porté sur le message de son homologue, le ministre de la sécurité de la Guinée équatoriale. Pour l''ambassadeur, la relation entre ces deux États repose sur des intérêts communs en matière de sécurité et de gestion des flux migratoires. Le ministre de la sécurité publique et de l''immigration, accompagné de ses plus proches collaborateurs, a salué cette démarche en insistant sur la nécessité de renforcer ces relations dans un cadre structuré et mutuellement bénéfique.

L''ambassadeur Ebang Miko Angue, à l''issue de l''entrevue, s''est dit particulièrement impressionné par la disponibilité et l''engagement du ministre de la sécurité publique et de l''Immigration.

Le ton de la rencontre, bien qu''officiel, a fait la part belle à la convivialité, avec des échanges nourris et des perspectives optimistes sur les actions futures.',
  'يوم الثلاثاء 8 أبريل، استقبل وزير الأمن العام والهجرة الجنرال علي أحمد أغاباش سعادة سفير غينيا الاستوائية، ليا ندرو إيبانغ ميكو أنجو، في اجتماع غني بالتبادلات الدبلوماسية بين الدولتين الشقيقتين. وحمل رسالة من وزير أمن غينيا.

جاء هذا اللقاء، على الرغم من عدم القرب الجغرافي بين البلدين، في إطار استمرارية تاريخ مشترك وتعاون يتعزز يومًا بعد يوم. تمحور اللقاء حول رسالة نظيره وزير أمن غينيا الاستوائية.',
  '/uploads/489685550_122219253320083693_2768513298661076118_n.jpg',
  '["/uploads/489685550_122219253320083693_2768513298661076118_n.jpg", "/uploads/489947335_122219253458083693_5249097592622261868_n.jpg", "/uploads/489986178_122219253230083693_6342548112300143937_n.jpg"]'::jsonb,
  'yciL8t4UlNY',
  'PUBLISHED',
  '2025-02-08 10:00:00+00'
);

-- Insérer l'album photo dans la médiathèque
INSERT INTO media_albums (
  id,
  title_fr,
  title_ar,
  description_fr,
  description_ar,
  cover_image,
  images
) VALUES (
  'album-guinee-equatoriale-2025',
  'Rencontre avec l''Ambassadeur de la Guinée équatoriale',
  'لقاء مع سفير غينيا الاستوائية',
  'Photos de l''entrevue entre le Ministre Ali Ahmat Aghabache et l''Ambassadeur Leandro Ebang Miko Angue',
  'صور اللقاء بين الوزير علي أحمد أغاباش والسفير ليا ندرو إيبانغ ميكو أنجو',
  '/uploads/489685550_122219253320083693_2768513298661076118_n.jpg',
  '["/uploads/489685550_122219253320083693_2768513298661076118_n.jpg", "/uploads/489947335_122219253458083693_5249097592622261868_n.jpg", "/uploads/489986178_122219253230083693_6342548112300143937_n.jpg"]'::jsonb
);

-- Insérer la vidéo dans la médiathèque
INSERT INTO media_videos (
  id,
  title_fr,
  title_ar,
  description_fr,
  description_ar,
  youtube_url,
  youtube_id,
  thumbnail,
  published_at
) VALUES (
  'video-guinee-equatoriale-2025',
  'Entrevue diplomatique avec la Guinée équatoriale',
  'لقاء دبلوماسي مع غينيا الاستوائية',
  'Vidéo complète de l''entrevue entre le Ministre de la Sécurité Publique et l''Ambassadeur de la Guinée équatoriale',
  'فيديو كامل للقاء بين وزير الأمن العام وسفير غينيا الاستوائية',
  'https://youtu.be/yciL8t4UlNY',
  'yciL8t4UlNY',
  'https://img.youtube.com/vi/yciL8t4UlNY/maxresdefault.jpg',
  '2025-02-08 10:00:00+00'
);