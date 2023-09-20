"use client";

import React, { useEffect } from "react";
import { Modal } from "../ui/modal";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader, SaveAll } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { LocationValidation } from "@/lib/validations/locations";
import { Address } from "@prisma/client";
import AddressModal from "./address-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const LocationModal = ({ isOpen, onClose }: Props) => {
  const [addresses, setAddresses] = React.useState<Address[]>([]);
  const [addressModalOpen, setAddressModalOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [fetchingAddresses, setFetchingAddresses] = React.useState(false);

  const title = "Erstelle eine neue Location!";
  const action = "Speichern";

  const router = useRouter();

  const form = useForm<z.infer<typeof LocationValidation>>({
    resolver: zodResolver(LocationValidation),
    defaultValues: {
      name: "",
      addressId: addresses[0]?.id || "",
      url: "",
    },
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const onSubmit = async (data: z.infer<typeof LocationValidation>) => {
    try {
      setLoading(true);
      await axios.post(`/api/locations`, data);
      router.refresh();
      toast.success("Location saved successfully.");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      handleClose();
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchAddresses = async () => {
      setFetchingAddresses(true);
      try {
        const { data } = await axios.get("/api/addresses");
        setAddresses(data);
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
      } finally {
        setFetchingAddresses(false);
      }
    };
    fetchAddresses();
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={title}>
      <AddressModal
        isOpen={addressModalOpen}
        onClose={() => setAddressModalOpen(false)}
      />
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
          {!fetchingAddresses ? (
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
          ) : (
            <div className="w-full flex items-center justify-center">
              <Loader className="w-10 h-10 animate-spin" />
              Loading...
            </div>
          )}
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
    </Modal>
  );
};

export default LocationModal;
