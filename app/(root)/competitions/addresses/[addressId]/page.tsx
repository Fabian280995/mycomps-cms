import { fetchSport } from "@/lib/actions/sport.actions";
import React from "react";
import SportForm from "./components/address-form";
import AddressForm from "./components/address-form";
import { fetchAddress } from "@/lib/actions/addresses.actions";

const AddressPage = async ({ params }: { params: { addressId: string } }) => {
  const address = await fetchAddress(params.addressId);

  return (
    <div className="w-full mt-20 max-w-3xl mx-auto">
      <AddressForm initialData={address} />
    </div>
  );
};

export default AddressPage;
