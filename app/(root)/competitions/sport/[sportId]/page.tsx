import { fetchSport } from "@/lib/actions/sport.actions";
import React from "react";
import SportForm from "./components/sport-form";

const SportPage = async ({ params }: { params: { sportId: string } }) => {
  const sport = await fetchSport(params.sportId);

  return <SportForm initialData={sport} />;
};

export default SportPage;
