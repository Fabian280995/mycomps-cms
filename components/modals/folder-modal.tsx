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
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const FolderValidation = z.object({
  name: z.string().min(3).max(30),
});

const FolderModal = ({ isOpen, onClose }: Props) => {
  const [loading, setLoading] = React.useState(false);

  const title = "Create a new Folder";
  const action = "Create";

  const router = useRouter();

  const form = useForm<z.infer<typeof FolderValidation>>({
    resolver: zodResolver(FolderValidation),
    defaultValues: {
      name: "",
    },
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const onSubmit = async (data: z.infer<typeof FolderValidation>) => {
    try {
      setLoading(true);
      await axios.post(`/api/folders`, data);
      router.refresh();
      window.location.reload();
      toast.success("Folder saved successfully.");
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
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ordername</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Ordner ..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="pt-6 space-x-2 flex items-center justify-end w-full">
            <Button
              disabled={loading}
              variant="outline"
              onClick={handleClose}
              type="button"
            >
              Cancel
            </Button>
            <Button
              disabled={loading}
              className="bg-teal-600 hover:bg-teal-900"
              type="submit"
            >
              {loading && (
                <div className="mr-2">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </div>
              )}
              {action}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default FolderModal;
