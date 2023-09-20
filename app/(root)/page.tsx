import UsersList from "@/components/dashboard/users-list";
import SidebarToggle from "@/components/sidebar/sidebar-toggle";
import ClientContainer from "@/components/ui/client-container";
import PageHeader from "@/components/ui/page-header";
import { fetchUsers } from "@/lib/actions/user.actions";

export default async function DashboardPage() {
  const users = await fetchUsers();
  return (
    <ClientContainer>
      <PageHeader title="Dashboard" />
      <UsersList users={users} />
      <SidebarToggle />
    </ClientContainer>
  );
}
