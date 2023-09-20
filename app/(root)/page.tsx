import UsersList from "@/components/dashboard/users-list";
import SidebarToggle from "@/components/sidebar/sidebar-toggle";
import ClientContainer from "@/components/ui/client-container";
import { fetchUsers } from "@/lib/actions/user.actions";

export default async function DashboardPage() {
  const users = await fetchUsers();
  return (
    <ClientContainer>
      <UsersList users={users} />
      <SidebarToggle />
    </ClientContainer>
  );
}
