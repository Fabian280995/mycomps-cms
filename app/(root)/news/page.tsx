import PageHeader from "@/components/ui/page-header";
import { fetchPublishedSlideshows } from "@/lib/actions/slideshows.actions";
import NewsClient from "./components/client";
import ClientContainer from "@/components/ui/client-container";

export default async function NewsPage() {
  const publishedSlideshows = await fetchPublishedSlideshows();

  return (
    <ClientContainer>
      <PageHeader
        title="News"
        subtitle="Übersicht über den gesamten News-Bereich..."
      />
      <NewsClient publishedSlideshows={publishedSlideshows} />
    </ClientContainer>
  );
}
