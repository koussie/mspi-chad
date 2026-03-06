import NewsDetailPage, { dynamic } from '../../news/[id]/page';

export { dynamic };

export default async function ActualitesDetailPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  return NewsDetailPage({ params: { locale, id: slug } });
}
