import { fetchSport } from "@/lib/actions/sport.actions";
import React from "react";
import SportForm from "./components/address-form";
import AddressForm from "./components/address-form";
import { fetchAddress } from "@/lib/actions/addresses.actions";
import ClientContainer from "@/components/ui/client-container";

const AddressPage = async ({ params }: { params: { addressId: string } }) => {
  const address = await fetchAddress(params.addressId);

  return <AddressForm initialData={address} />;
};

export default AddressPage;
