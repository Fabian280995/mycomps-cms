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
import { Loader, SaveAll } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { SportsCategory } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ImagePicker from "../ui/image-picker";

const SportValidation = z.object({
  name: z.string().min(3).max(30),
  category: z.nativeEnum(SportsCategory),
  imageId: z.string().optional(),
});

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SportModal = ({ isOpen, onClose }: Props) => {
  const [loading, setLoading] = React.useState(false);

  const title = "Erstelle eine neue Sportart!";
  const action = "Speichern";

  const router = useRouter();

  const form = useForm<z.infer<typeof SportValidation>>({
    resolver: zodResolver(SportValidation),
    defaultValues: {
      name: "",
      category: "STRENGTH",
      imageId: "",
    },
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const onSubmit = async (data: z.infer<typeof SportValidation>) => {
    try {
      setLoading(true);
      await axios.post(`/api/sports`, data);
      router.refresh();
      toast.success("Sport saved successfully.");
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
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categorie</FormLabel>
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
                        placeholder="Wähle eine Kategorie ..."
                      ></SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.keys(SportsCategory).map((item) => (
                      <SelectItem key={item} value={item} className="truncate">
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageId"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Wähle ein passendes Bild aus!</FormLabel>
                  <FormControl>
                    {loading ? (
                      <div className="p-2">
                        <Loader className="w-6 h-6 animate-spin" />
                      </div>
                    ) : (
                      <ImagePicker
                        selectedImageId={field.value || ""}
                        onSelectImage={field.onChange}
                        defaultFolder="icons"
                      />
                    )}
                  </FormControl>
                </FormItem>
              );
            }}
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

export default SportModal;
