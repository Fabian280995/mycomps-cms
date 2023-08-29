import { Button } from "@/components/ui/button";
import PageHeader from "@/components/ui/page-header";
import { fetchSports } from "@/lib/actions/sport.actions";
import { Plus } from "lucide-react";
import { SportsClient } from "./components/client";
import AddButton from "@/components/ui/add-button";

export default async function SportPage() {
  const sports = await fetchSports();

  const formattedSports = sports.map((sport) => ({
    id: sport.id,
    name: sport.name,
    createdAt: new Date(sport.createdAt).toLocaleDateString(),
  }));

  return (
    <section className="w-full space-y-4 px-16 py-20">
      <PageHeader title="Sport" subtitle="Übersicht aller Sportarten">
        <AddButton destination="competitions/sport" name="Sportart" />
      </PageHeader>
      <SportsClient data={formattedSports} />
    </section>
  );
}
