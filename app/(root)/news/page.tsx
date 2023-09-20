import { fetchPublishedSlideshows } from "@/lib/actions/slideshows.actions";
import NewsClient from "./components/client";

export default async function NewsPage() {
  const publishedSlideshows = await fetchPublishedSlideshows();

  return <NewsClient publishedSlideshows={publishedSlideshows} />;
}
