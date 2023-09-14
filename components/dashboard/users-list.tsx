import React from "react";
import UserCard from "./user-card";
import { User } from "@prisma/client";
import { Users2 } from "lucide-react";

interface Props {
  users: User[];
}

const UsersList = ({ users }: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <Users2 className="w-8 h-8 text-gray-900" />
        <h2 className="text-2xl font-semibold">Mitarbeiter</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UsersList;
