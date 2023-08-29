import { Button } from "@/components/ui/button";
import PageHeader from "@/components/ui/page-header";
import { Plus } from "lucide-react";
import { OrganizersClient } from "./components/client";
import prismadb from "@/lib/prismadb";
import { fetchOrganizers } from "@/lib/actions/organizer.actions";
import AddButton from "@/components/ui/add-button";

export default async function OrganizersPage() {
  const organizers = await fetchOrganizers();

  const formattedOrganizers = organizers.map((organizer) => ({
    id: organizer.id,
    name: organizer.name,
    url: organizer.url,
    addressId: organizer.addressId,
    fullAddress: organizer.address
      ? `${organizer.address.street} ${organizer.address.number} | ${organizer.address.zip} ${organizer.address.city} (${organizer.address.country}/${organizer.address.state})`
      : "Keine Adresse hinterlegt",
    createdAt: new Date(organizer.createdAt).toLocaleDateString(),
  }));

  return (
    <section className="w-full px-16 py-20">
      <PageHeader title="Organizers" subtitle="Übersicht aller Veranstalter">
        <AddButton destination="competitions/organizers" name="Veranstalter" />
      </PageHeader>
      <OrganizersClient data={formattedOrganizers} />
    </section>
  );
}
