"use client";
import React, { use, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Address, Location } from "@prisma/client";
import { toast } from "react-hot-toast";
import axios from "axios";
import { SaveAll, Trash } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import { LocationValidation } from "@/lib/validations/locations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddressModal from "@/components/modals/address-modal";

interface Props {
  initialData: Location | null;
  addresses: Address[];
}

const LocationForm: React.FC<Props> = ({ initialData, addresses }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Location" : "New Location";
  const description = initialData
    ? "Bearbeite folgende Location oder lösche sie."
    : "Erstelle eine neue Location";
  const toastMessage = initialData
    ? "Location updated successfully."
    : "Location created successfully.";
  const action = initialData ? "Save Changes" : "Create";

  const form = useForm<z.infer<typeof LocationValidation>>({
    resolver: zodResolver(LocationValidation),
    defaultValues: initialData
      ? {
          ...initialData,
          addressId: initialData.addressId || "",
        }
      : {
          name: "",
          addressId: addresses[0]?.id || "",
          url: "",
        },
  });

  const onSubmit = async (data: z.infer<typeof LocationValidation>) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/locations/${params.locationId}`, data);
      } else {
        await axios.post(`/api/locations`, data);
      }
      router.refresh();
      router.back();
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/locations/${params.locationId}`);
      router.refresh();
      router.push(`/locations`);
      toast.success("Location deleted successfully.");
    } catch (error) {
      toast.error(
        "Something went wrong. Please make sure to delete all Competitions using this Location before."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md px-10 py-12 mx-2">
      <AddressModal
        isOpen={addressModalOpen}
        onClose={() => setAddressModalOpen(false)}
      />
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete()}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <div className="">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="text-gray-500">{description}</p>
        </div>
        {initialData && (
          <Button
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
            disabled={loading}
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>
      <hr className="my-4" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Name der Sportart ..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="addressId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adresse</FormLabel>
                <Select
                  disabled={loading}
                  value={field.value}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Wähle eine Adresse ..."
                      ></SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {addresses.map((item) => (
                      <SelectItem
                        key={item.id}
                        value={item.id}
                        className="truncate"
                      >
                        {item.street} {item.number} | {item.zip} {item.city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  <Button
                    type="button"
                    variant="link"
                    size="sm"
                    onClick={() => setAddressModalOpen(true)}
                  >
                    Erstelle eine neue Adresse
                  </Button>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Link zur Location (Bsp. Google) ..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              size="lg"
              disabled={loading}
              className="self-end"
              type="submit"
            >
              <SaveAll className="w-4 h-4 mr-2" />
              {action}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LocationForm;
