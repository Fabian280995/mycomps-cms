import PageHeader from "@/components/ui/page-header";
import { fetchCompetitions } from "@/lib/actions/competition.actions";
import AddButton from "@/components/ui/add-button";

export default async function NewsPage() {
  return (
    <section className="w-full px-16 py-20">
      <PageHeader
        title="News"
        subtitle="Übersicht über die News der Website"
      ></PageHeader>
    </section>
  );
}
