import React from "react";

import { fetchAddresses } from "@/lib/actions/addresses.actions";
import { fetchLocation } from "@/lib/actions/location.actions";

import LocationForm from "./components/location-form";
import ClientContainer from "@/components/ui/client-container";

const LocationPage = async ({ params }: { params: { locationId: string } }) => {
  const location = await fetchLocation(params.locationId);
  const addresses = await fetchAddresses();

  return <LocationForm initialData={location} addresses={addresses} />;
};

export default LocationPage;
