"use client";

import React, { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { toast } from "react-hot-toast";
import axios from "axios";

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
import { useRouter } from "next/navigation";
import { SlideshowValidation } from "@/lib/validations/slideshows";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SlideshowModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof SlideshowValidation>>({
    resolver: zodResolver(SlideshowValidation),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof SlideshowValidation>) => {
    try {
      setLoading(true);
      await axios.post(`/api/slideshows`, data);
      router.refresh();
      toast.success("Location created successfully.");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      handleClose();
      setLoading(false);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Modal title="Create a new Slideshow" isOpen={isOpen} onClose={handleClose}>
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
                    placeholder="Name der Slideshow ..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="pt-6 space-x-2 flex items-center justify-end w-full">
            <Button disabled={loading} variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              disabled={loading}
              className="bg-teal-600 hover:bg-teal-900"
            >
              {loading && (
                <div className="mr-2">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </div>
              )}
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
