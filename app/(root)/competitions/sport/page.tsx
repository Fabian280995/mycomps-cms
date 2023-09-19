import PageHeader from "@/components/ui/page-header";
import { fetchSportsWithImage } from "@/lib/actions/sport.actions";
import { SportsClient } from "./components/client";
import AddButton from "@/components/ui/add-button";
import ClientContainer from "../components/client-container";

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
    <ClientContainer>
      <SportsClient data={formattedSports} />
    </ClientContainer>
  );
}
