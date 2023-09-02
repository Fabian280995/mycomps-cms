import { fetchSport } from "@/lib/actions/sport.actions";
import React from "react";
import SportForm from "./components/sport-form";

const SportPage = async ({ params }: { params: { sportId: string } }) => {
  const sport = await fetchSport(params.sportId);

  return (
    <section className="w-full overflow-y-auto">
      <div className=" max-w-3xl my-24 mx-auto overflow-y-auto">
        <SportForm initialData={sport} />
      </div>
    </section>
  );
};

export default SportPage;
