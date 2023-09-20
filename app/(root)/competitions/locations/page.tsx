import { Button } from "@/components/ui/button";
import PageHeader from "@/components/ui/page-header";
import prismadb from "@/lib/prismadb";
import { Plus } from "lucide-react";
import { LocationsClient } from "./components/client";
import { fetchLocations } from "@/lib/actions/location.actions";
import AddButton from "@/components/ui/add-button";
import ClientContainer from "../../../../components/ui/client-container";

export default async function LocationsPage() {
  const locations = await fetchLocations();

  const formattedLocations = locations.map((location) => ({
    id: location.id,
    name: location.name,
    url: location.url,
    addressId: location.addressId,
    fullAddress: location.address
      ? `${location.address.street} ${location.address.number} | ${location.address.zip} ${location.address.city} (${location.address.country}/${location.address.state})`
      : "Keine Adresse hinterlegt",
    createdAt: new Date(location.createdAt).toLocaleDateString(),
  }));

  return <LocationsClient data={formattedLocations} />;
}
