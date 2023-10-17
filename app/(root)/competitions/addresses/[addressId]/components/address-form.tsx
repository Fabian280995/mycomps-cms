"use client";
import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Address } from "@prisma/client";
import { toast } from "react-hot-toast";
import axios from "axios";
import { SaveAll, Trash } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import { AddressValidation } from "@/lib/validations/addresses";
import PlacesAutocomplete from "@/components/google/places-autocomplete";

interface Props {
  initialData: Address | null;
}

const AddressForm: React.FC<Props> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Address" : "New Address";
  const description = initialData
    ? "Bearbeite folgende Adresse oder lösche sie."
    : "Erstelle eine neue Adresse";
  const toastMessage = initialData
    ? "Address updated successfully."
    : "Address created successfully.";
  const action = initialData ? "Save Changes" : "Create";

  const form = useForm<z.infer<typeof AddressValidation>>({
    resolver: zodResolver(AddressValidation),
    defaultValues: initialData || {
      country: "",
      state: "",
      street: "",
      number: "",
      zip: "",
      city: "",
      lat: 0,
      lng: 0,
    },
  });

  const handleSelectPlace = (result: any) => {
    try {
      form.setValue(
        "country",
        result.address_components.find((c: any) => c.types.includes("country"))
          .long_name
      );
      form.setValue(
        "state",
        result.address_components.find((c: any) =>
          c.types.includes("administrative_area_level_1")
        ).long_name
      );
      form.setValue(
        "street",
        result.address_components.find((c: any) => c.types.includes("route"))
          .long_name
      );
      form.setValue(
        "number",
        result.address_components.find((c: any) =>
          c.types.includes("street_number")
        ).long_name
      );
      form.setValue(
        "zip",
        result.address_components.find((c: any) =>
          c.types.includes("postal_code")
        ).long_name
      );
      form.setValue(
        "city",
        result.address_components.find((c: any) => c.types.includes("locality"))
          .long_name
      );
      form.setValue("lat", result.coordinates.lat);
      form.setValue("lng", result.coordinates.lng);
    } catch (error: any) {
      toast.error(`Missing information: ${error.message}}`);
    }
  };

  const onSubmit = async (data: z.infer<typeof AddressValidation>) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/addresses/${params.addressId}`, data);
      } else {
        await axios.post(`/api/addresses`, data);
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
      await axios.delete(`/api/addresses/${params.addressId}`);
      router.refresh();
      router.push(`/competitions/addresses`);
      toast.success("Address deleted successfully.");
    } catch (error) {
      toast.error(
        "Something went wrong. Please make that you deletet all locations and organizers using this address."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md px-10 py-12 mx-2">
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete()}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <div>
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
      <div className="my-4 w-full">
        <PlacesAutocomplete setSelected={handleSelectPlace} />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Land</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Name des Landes ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bundesland</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Name des Bundeslandes ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-4 w-full">
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Straße</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Name der Straße ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>HausNr.</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-4 w-full">
            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PLZ</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="00000"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className=" flex-1">
                  <FormLabel>Stadt</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Name der Stadt ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="lat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Breitengrad (Latitude)</FormLabel>
                  <FormControl>
                    <Input disabled={true} type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lng"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Längengrad (Longitude)</FormLabel>
                  <FormControl>
                    <Input disabled={true} type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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

export default AddressForm;
