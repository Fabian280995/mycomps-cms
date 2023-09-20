"use client";

import React from "react";
import { Modal } from "../ui/modal";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SaveAll } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AddressValidation } from "@/lib/validations/addresses";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddressModal = ({ isOpen, onClose }: Props) => {
  const [loading, setLoading] = React.useState(false);

  const title = "Erstelle eine neue Adresse!";
  const action = "Speichern";

  const router = useRouter();

  const form = useForm<z.infer<typeof AddressValidation>>({
    resolver: zodResolver(AddressValidation),
    defaultValues: {
      country: "Germany",
      state: "",
      street: "",
      number: "",
      zip: "",
      city: "",
    },
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const onSubmit = async (data: z.infer<typeof AddressValidation>) => {
    try {
      setLoading(true);
      await axios.post(`/api/addresses`, data);
      router.refresh();
      toast.success("Address saved successfully.");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      handleClose();
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={title}>
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

export default AddressModal;
