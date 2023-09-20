import UsersList from "@/components/dashboard/users-list";
import SidebarToggle from "@/components/sidebar/sidebar-toggle";
import PageHeader from "@/components/ui/page-header";
import { fetchUsers } from "@/lib/actions/user.actions";

export default async function DashboardPage() {
  const users = await fetchUsers();
  return (
    <main className="w-full px-16 py-20">
      <PageHeader title="Dashboard" />
      <UsersList users={users} />
      <SidebarToggle />
    </main>
  );
}
