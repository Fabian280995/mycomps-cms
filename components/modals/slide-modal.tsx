"use client";
import { Slide } from "@prisma/client";
import React, { useEffect } from "react";
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
import { Loader, Loader2 } from "lucide-react";
import { SlideValidation } from "@/lib/validations/slideshows";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Textarea } from "../ui/textarea";
import ImagePicker from "../ui/image-picker";
import axios from "axios";
import { toast } from "react-hot-toast";
import { SlideWithImage } from "../slideshows/slide-card";

interface Props {
  initialData: Slide | null;
  isOpen: boolean;
  onClose: () => void;
  onChange: (slide: SlideWithImage) => void;
  slideshowId: string;
}

const SlideModal = ({
  initialData,
  isOpen,
  onClose,
  onChange,
  slideshowId,
}: Props) => {
  const [loading, setLoading] = React.useState(false);

  const title = initialData ? "Edit the Slide" : "Create a new Slide";
  const action = initialData ? "Edit" : "Create";

  const router = useRouter();

  const form = useForm<z.infer<typeof SlideValidation>>({
    resolver: zodResolver(SlideValidation),
    defaultValues: initialData
      ? {
          title: initialData.title,
          description: initialData.description || "",
          imageId: initialData.imageId,
        }
      : {
          title: "",
          description: "",
          imageId: "",
        },
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  useEffect(() => {
    if (initialData) {
      form.reset({
        title: initialData.title,
        description: initialData.description || "",
        imageId: initialData.imageId,
      });
    } else {
      form.reset({
        title: "",
        description: "",
        imageId: "",
      });
    }
  }, [initialData]);

  const onSubmit = async (data: z.infer<typeof SlideValidation>) => {
    const submitData = {
      ...data,
      slideshowId,
    };
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/slides/${initialData.id}`, data);
      } else {
        const response = await axios.post(`/api/slides`, submitData);
        onChange(response.data);
      }
      router.refresh();
      toast.success("Slide saved successfully.");
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
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titel</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Titel des Slides ..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Beschreibung</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={loading}
                    placeholder="Beschreibung des Slides ..."
                    {...field}
                    rows={3}
                  />
                </FormControl>
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
                  <FormLabel>Bild</FormLabel>
                  <FormControl>
                    {loading ? (
                      <div className="p-2">
                        <Loader className="w-6 h-6 animate-spin" />
                      </div>
                    ) : (
                      <ImagePicker
                        selectedImageId={field.value}
                        onSelectImage={field.onChange}
                      />
                    )}
                  </FormControl>
                </FormItem>
              );
            }}
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

export default SlideModal;
