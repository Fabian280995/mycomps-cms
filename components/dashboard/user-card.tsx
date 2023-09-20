import { User } from "@prisma/client";
import { color } from "framer-motion";
import {
  CircuitBoard,
  Code2,
  Mail,
  Puzzle,
  User2,
  User as UserIcon,
} from "lucide-react";
import React from "react";

interface Props {
  user: User;
}

const colorByRole = {
  user: "rgb(248, 113, 113)",
  admin: "rgb(96, 165, 250)",
  developer: "rgb(74, 222, 128)",
};

const iconByRole = {
  user: <Puzzle className="w-5 h-5 min-w-[1.5rem] text-red-400" />,
  admin: <CircuitBoard className="w-5 h-5 min-w-[1.5rem] text-blue-400" />,
  developer: <Code2 className="w-5 h-5 min-w-[1.5rem] text-green-400" />,
};

const UserCard = ({ user }: Props) => {
  const { firstName, lastName, email } = user;

  return (
    <div className="px-4 py-3 flex flex-col gap-2 bg-white shadow-sm rounded-md w-full">
      <div className="flex gap-2 items-center w-full">
        <span
          className="p-2 rounded-full"
          style={{
            backgroundColor:
              colorByRole[
                user.role.toString().toLowerCase() as
                  | "user"
                  | "admin"
                  | "developer"
              ],
          }}
        >
          <User2 className="w-6 h-6 text-gray-900" />
        </span>
        <h4 className="text-lg font-semibold truncate">
          {firstName + " "}
          {lastName && lastName}
        </h4>
      </div>
      <div className="flex flex-col w-full">
        <div className="w-full flex items-center gap-2 text-gray-500">
          <Mail className="w-5 h-5 min-w-[1.5rem]" />
          <p className=" truncate">{email}</p>
        </div>
        <div className="w-full flex items-center gap-2 text-gray-500">
          {
            iconByRole[
              user.role.toLowerCase() as "user" | "admin" | "developer"
            ]
          }
          <p className=" truncate">
            {user.role[0].toString() +
              user.role.toString().slice(1).toLowerCase()}
          </p>
        </div>
        <p className="text-gray-400 text-sm truncate self-end">
          {user.createdAt.toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
