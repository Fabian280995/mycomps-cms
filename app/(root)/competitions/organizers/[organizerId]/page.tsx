import React from "react";

import { fetchAddresses } from "@/lib/actions/addresses.actions";
import { fetchLocation } from "@/lib/actions/location.actions";

import OrganizerForm from "./components/organizer-form";
import { fetchOrganizer } from "@/lib/actions/organizer.actions";

const OrganizerPage = async ({
  params,
}: {
  params: { organizerId: string };
}) => {
  const organizer = await fetchOrganizer(params.organizerId);
  const addresses = await fetchAddresses();

  return <OrganizerForm initialData={organizer} addresses={addresses} />;
};

export default OrganizerPage;
