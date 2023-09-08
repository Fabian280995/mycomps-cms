import PageHeader from "@/components/ui/page-header";
import { CompetitionsClient } from "./components/client";
import { fetchCompetitions } from "@/lib/actions/competition.actions";
import AddButton from "@/components/ui/add-button";

export default async function CompetitionsPage() {
  const competitions = await fetchCompetitions();

  const formattedCompetitions = competitions.map((competition) => ({
    id: competition.id,
    name: competition.name,
    date: `${competition.startDate.toLocaleDateString()} ${
      competition.startDate.getDate() !== competition.endDate.getDate()
        ? ` - ${competition.endDate.toLocaleDateString()}`
        : ""
    }`,
    imageId: competition.logoId as string,
    imageSrc: competition.logo?.url as string,
    sportId: competition.sportId,
    sportName: competition.sport.name,
    locationId: competition.locationId,
    locationName: competition.location.name,
    organizerId: competition.organizerId,
    organizerName: competition.organizer.name,
    createdAt: new Date(competition.createdAt).toLocaleDateString(),
    isPublished: competition.isPublished,
  }));

  return (
    <section className="w-full flex flex-col px-12 py-8 pb-20 overflow-y-scroll">
      <PageHeader title="Competitions" subtitle="Übersicht aller Wttkämpfe">
        <AddButton destination="competitions" name="Wettkampf" />
      </PageHeader>
      <CompetitionsClient data={formattedCompetitions} />
    </section>
  );
}
