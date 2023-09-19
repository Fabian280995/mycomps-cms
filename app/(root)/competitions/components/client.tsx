"use client";
import AddButton from "@/components/ui/add-button";
import { CompetitionColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sport } from "@prisma/client";

interface Props {
  data: CompetitionColumn[];
}

export const CompetitionsClient: React.FC<Props> = ({ data }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [sports, setSports] = useState<Sport[] | null>(null);

  useEffect(() => {
    const fetchSports = async () => {
      const response = await fetch("/api/sports");
      const data = await response.json();
      setSports(data);
    };

    fetchSports();
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey="name"
      AddNewButton={() => (
        <AddButton destination="competitions" name="Wettkampf" />
      )}
      Filter={({ table }) => {
        const searchKey = "sport";
        if (!sports) return null;
        return (
          <Select
            onValueChange={(value) => {
              console.log(value);
              return table.getColumn(searchKey)?.setFilterValue(value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Alle Sportarten" />
            </SelectTrigger>
            <SelectContent>
              {sports.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      }}
    />
  );
};
