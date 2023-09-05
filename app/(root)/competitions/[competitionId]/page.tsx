import { fetchCompetition } from "@/lib/actions/competition.actions";
import { fetchLocations } from "@/lib/actions/location.actions";
import React from "react";
import CompetitionForm from "./components/competition-form";
import { fetchOrganizers } from "@/lib/actions/organizer.actions";
import { fetchSports } from "@/lib/actions/sport.actions";

const CompetitionPage = async ({
  params,
}: {
  params: { competitionId: string };
}) => {
  const competition = await fetchCompetition(params.competitionId);
  const locations = await fetchLocations();
  const organizers = await fetchOrganizers();
  const sports = await fetchSports();

  return (
    <div className="w-full flex-1 overflow-y-auto">
      <CompetitionForm
        initialData={competition}
        locations={locations}
        organizers={organizers}
        sports={sports}
      />
    </div>
  );
};

export default CompetitionPage;
