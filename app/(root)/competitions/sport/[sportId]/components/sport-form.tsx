"use client";
import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sport } from "@prisma/client";
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
import { SportValidation } from "@/lib/validations/sports";

interface Props {
  initialData: Sport | null;
}

const SportForm: React.FC<Props> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Sport" : "New Sport";
  const description = initialData
    ? "Bearbeite folgende Sportart oder lösche sie."
    : "Erstelle eine neue Sportart";
  const toastMessage = initialData
    ? "Sport updated successfully."
    : "Sport created successfully.";
  const action = initialData ? "Save Changes" : "Create";

  const form = useForm<z.infer<typeof SportValidation>>({
    resolver: zodResolver(SportValidation),
    defaultValues: initialData || {
      name: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof SportValidation>) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/sports/${params.sportId}`, data);
      } else {
        await axios.post(`/api/sports`, data);
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
      await axios.delete(`/api/sports/${params.sportId}`);
      router.refresh();
      router.push("/sport");
      toast.success("Sport deleted successfully.");
    } catch (error) {
      toast.error(
        "Something went wrong. Please try make sure to first delete all competitions using this Sport."
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

export default SportForm;
