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
      variant="default"
      onClick={() => router.push(`/${destination}/new`)}
    >
      <Plus className="h-6 w-6 mr-2" />
      {name} hinzufügen
    </Button>
  );
};

export default AddButton;
