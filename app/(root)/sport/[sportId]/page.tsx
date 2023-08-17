import { fetchSport } from "@/lib/actions/sport.actions";
import React from "react";
import SportForm from "./components/sport-form";

const SportPage = async ({ params }: { params: { sportId: string } }) => {
  const sport = await fetchSport(params.sportId);

  return (
    <div className="w-full mt-20 max-w-3xl mx-auto">
      <SportForm initialData={sport} />
    </div>
  );
};

export default SportPage;
