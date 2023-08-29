import { Button } from "@/components/ui/button";
import PageHeader from "@/components/ui/page-header";
import { Plus } from "lucide-react";
import { fetchAddresses } from "@/lib/actions/addresses.actions";
import { AddressesClient } from "./components/client";
import AddButton from "@/components/ui/add-button";

export default async function SportPage() {
  const addresses = await fetchAddresses();

  const formattedAddresses = addresses.map((address) => ({
    id: address.id,
    country: address.country,
    state: address.state,
    street: `${address.street} ${address.number}`,
    city: `${address.zip} ${address.city}`,
    createdAt: new Date(address.createdAt).toLocaleDateString(),
  }));

  return (
    <section className="w-full space-y-4 px-16 py-20">
      <PageHeader title="Addresses" subtitle="Übersicht aller Adressen">
        <AddButton destination="competitions/addresses" name="Adresse" />
      </PageHeader>
      <AddressesClient data={formattedAddresses} />
    </section>
  );
}
