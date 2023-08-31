import PageHeader from "@/components/ui/page-header";
import { fetchSportsWithImage } from "@/lib/actions/sport.actions";
import { SportsClient } from "./components/client";
import AddButton from "@/components/ui/add-button";

export default async function SportPage() {
  const sports = await fetchSportsWithImage();

  const formattedSports = sports.map((sport) => ({
    id: sport.id,
    name: sport.name,
    category: sport.category,
    createdAt: new Date(sport.createdAt).toLocaleDateString(),
    image:
      {
        id: sport.image?.id || "",
        url: sport.image?.url || "",
      } || null,
  }));

  return (
    <section className="w-full flex flex-col px-12 py-8 pb-20 overflow-y-scroll">
      <PageHeader title="Sport" subtitle="Übersicht aller Sportarten">
        <AddButton destination="competitions/sport" name="Sportart" />
      </PageHeader>
      <SportsClient data={formattedSports} />
    </section>
  );
}
