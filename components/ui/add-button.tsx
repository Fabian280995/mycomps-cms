"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./button";
import { Plus } from "lucide-react";

interface Props {
  destination: string;
  name: string;
}

const AddButton = ({ destination, name }: Props) => {
  const router = useRouter();
  return (
    <Button
      size="icon"
      variant="default"
      onClick={() => router.push(`/${destination}/new`)}
      className="bg-purple-500 hover:bg-purple-700 text-white"
    >
      <Plus className="h-6 w-6" />
      <p className="ml-2 hidden md:visible">{name} hinzufügen</p>
    </Button>
  );
};

export default AddButton;
