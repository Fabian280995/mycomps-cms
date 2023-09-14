import { User } from "@prisma/client";
import { Mail, Puzzle, User2, User as UserIcon } from "lucide-react";
import React from "react";

interface Props {
  user: User;
}

function getRandomPastelColor(): string {
  // Eine Liste von schönen Pastellfarben
  const pastelColors = [
    "#FFB6C1", // LightPink
    "#FFA07A", // LightSalmon
    "#87CEEB", // SkyBlue
    "#98FB98", // PaleGreen
    "#FFD700", // Gold
    "#9370DB", // MediumPurple
    "#F08080", // LightCoral
    "#20B2AA", // LightSeaGreen
  ];

  // Eine zufällige Farbe aus der Liste auswählen
  const randomIndex = Math.floor(Math.random() * pastelColors.length);
  return pastelColors[randomIndex];
}

const UserCard = ({ user }: Props) => {
  const { firstName, lastName, email } = user;

  return (
    <div className="px-4 py-3 flex flex-col gap-2 bg-white shadow-sm rounded-md w-full">
      <div className="flex gap-2 items-center w-full">
        <span
          className="p-2 rounded-full"
          style={{ backgroundColor: getRandomPastelColor() }}
        >
          <User2 className="w-6 h-6 text-gray-900" />
        </span>
        <h4 className="text-lg font-semibold truncate">
          {firstName + " "}
          {lastName && lastName}
        </h4>
      </div>
      <div className="flex flex-col px-2 w-full">
        <p className="text-gray-700 truncate">
          <Mail className="w-4 h-4 inline-block mr-2" />
          {email}
        </p>
        <p className="text-gray-700 truncate">
          <Puzzle className="w-4 h-4 inline-block mr-2" />
          {user.role[0] + user.role.slice(1).toLowerCase()}
        </p>
        <p className="text-gray-400 text-sm truncate self-end">
          {user.createdAt.toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
