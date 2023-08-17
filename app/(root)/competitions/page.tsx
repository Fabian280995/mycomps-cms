import { Button } from "@/components/ui/button";
import PageHeader from "@/components/ui/page-header";
import prismadb from "@/lib/prismadb";
import { Plus } from "lucide-react";
import { CompetitionsClient } from "./components/client";
import { fetchCompetitions } from "@/lib/actions/competition.actions";
import { redirect } from "next/navigation";
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
    sportId: competition.sportId,
    sportName: competition.sport.name,
    locationId: competition.locationId,
    locationName: competition.location.name,
    organizerId: competition.organizerId,
    organizerName: competition.organizer.name,
    createdAt: new Date(competition.createdAt).toLocaleDateString(),
  }));
  return (
    <section className="w-full px-16 py-20">
      <PageHeader title="Competitions" subtitle="Übersicht aller Wttkämpfe">
        <AddButton destination="competitions" name="Wettkampf" />
      </PageHeader>
      <CompetitionsClient data={formattedCompetitions} />
    </section>
  );
}
