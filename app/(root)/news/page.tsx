import PageHeader from "@/components/ui/page-header";
import { fetchPublishedSlideshows } from "@/lib/actions/slideshows.actions";
import NewsClient from "./components/client";

export default async function NewsPage() {
  const publishedSlideshows = await fetchPublishedSlideshows();

  return (
    <section className="w-full px-16 py-8 mb-16">
      <PageHeader
        title="News"
        subtitle="Übersicht über den gesamten News-Bereich..."
      />
      <NewsClient publishedSlideshows={publishedSlideshows} />
    </section>
  );
}
