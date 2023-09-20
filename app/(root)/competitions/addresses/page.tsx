import { fetchAddresses } from "@/lib/actions/addresses.actions";
import { AddressesClient } from "./components/client";

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

  return <AddressesClient data={formattedAddresses} />;
}
