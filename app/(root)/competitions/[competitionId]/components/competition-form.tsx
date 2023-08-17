"use client";
import React, { useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Competition, Location, Organizer, Sport } from "@prisma/client";
import { toast } from "react-hot-toast";
import axios from "axios";
import { CalendarIcon, RefreshCcw, SaveAll, Trash, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import { CompetitionValidation } from "@/lib/validations/competitions";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { da } from "date-fns/locale";

interface Props {
  initialData: Competition | null;
  locations: Location[];
  sports: Sport[];
  organizers: Organizer[];
}

const CompetitionForm: React.FC<Props> = ({
  initialData,
  locations,
  sports,
  organizers,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Competition" : "New Competition";
  const description = initialData
    ? "Bearbeite folgenden Wettkampf oder lösche ihn."
    : "Erstelle einen neuen Wettkampf";
  const toastMessage = initialData
    ? "Comp updated successfully."
    : "Comp created successfully.";
  const action = initialData ? "Save Changes" : "Create";

  const form = useForm<z.infer<typeof CompetitionValidation>>({
    resolver: zodResolver(CompetitionValidation),
    defaultValues: initialData
      ? {
          ...initialData,
          endDate: initialData.startDate || null,
          description: initialData.description || "",
        }
      : {
          name: "",
          description: "",
          startDate: new Date(),
          endDate: undefined,
          sportId: sports[0] ? sports[0].id : "",
          locationId: locations[0] ? locations[0].id : "",
          organizerId: organizers[0] ? organizers[0].id : "",
        },
  });

  const onSubmit = async (data: z.infer<typeof CompetitionValidation>) => {
    if (!data.endDate) {
      data.endDate = data.startDate;
      toast(
        "Einstellungen wurden geändert. Bitte überprüfe die Daten nochmals."
      );
    }

    if (data.endDate && data.startDate > data.endDate) {
      form.setValue("endDate", data.startDate);
      toast.error("Das Enddatum darf nicht vor dem Startdatum liegen.");
      return;
    }

    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/competitions/${params.categoryId}`, data);
      } else {
        await axios.post(`/api/competitions`, data);
      }
      router.refresh();
      router.push(`/competitions`);
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
      await axios.delete(`/api/competitions/${params.categoryId}`);
      router.refresh();
      router.push(`/competitions`);
      toast.success("Competition deleted successfully.");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
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
                    placeholder="Name des Wettkampfes ..."
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
                    rows={3}
                    disabled={loading}
                    placeholder="Beschreibe hier kurz um was es bei dem Wettkampf geht ..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-8 items-center md:grid-cols-2 relative">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel className="flex ">
                    Datum
                    <p className="font-light text-xs opacity-30 truncate ml-2">
                      Start des Events
                    </p>
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <div className="flex-1">
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </div>
                          <div className="flex gap-x-2 items-center">
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </div>
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel
                    className={cn(
                      "flex",
                      !form.getValues("startDate")
                        ? "text-transparent"
                        : "text-gray-900"
                    )}
                  >
                    Enddatum
                    <p className="font-light text-xs opacity-30 truncate ml-2">
                      freilassen bei eintägigen Events
                    </p>
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger
                      asChild
                      disabled={!form.getValues("startDate")}
                    >
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "flex w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <div className="flex-1">
                            {!form.getValues(
                              "startDate"
                            ) ? null : field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </div>
                          <div className="flex gap-x-2 items-center">
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50 " />
                            {field.value && (
                              <X
                                className="h-6 w-6 text-red-500"
                                onClick={() => field.onChange(null)}
                              />
                            )}
                          </div>
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < form.getValues("startDate")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <RefreshCcw
              className="absolute -top-2 -right-2 border rounded-md h-6 w-6 p-1
                opacity-50 cursor-pointer hover:bg-gray-200"
              onClick={() => {
                form.setValue("startDate", new Date());
                form.setValue("endDate", undefined);
              }}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="sportId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sportart</FormLabel>
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
                          placeholder="Wähle eine Sportart ..."
                        ></SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sports.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
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
              name="locationId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
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
                          placeholder="Wähle eine Location ..."
                        ></SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {locations.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
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
              name="organizerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Veranstalter</FormLabel>
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
                          placeholder="Wähle einen Veranstalter ..."
                        ></SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {organizers.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

export default CompetitionForm;
