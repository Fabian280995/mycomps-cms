import React from "react";

import { fetchAddresses } from "@/lib/actions/addresses.actions";
import { fetchLocation } from "@/lib/actions/location.actions";

import LocationForm from "./components/location-form";

const LocationPage = async ({ params }: { params: { locationId: string } }) => {
  const location = await fetchLocation(params.locationId);
  const addresses = await fetchAddresses();

  return (
    <div className="w-full mt-20 max-w-3xl mx-auto">
      <LocationForm initialData={location} addresses={addresses} />
    </div>
  );
};

export default LocationPage;
