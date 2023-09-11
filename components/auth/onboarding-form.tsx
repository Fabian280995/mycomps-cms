"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Save } from "lucide-react";
import { createUser } from "@/lib/actions/user.actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  userData: {
    clerkId: string;
    email: string;
    firstName: string;
    lastName: string;
    image: string | null;
  };
}

export const UserInfoValidation = z.object({
  email: z.string().email(),
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
});

const OnboardingForm = ({ userData }: Props) => {
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof UserInfoValidation>>({
    resolver: zodResolver(UserInfoValidation),
    defaultValues: {
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
    },
  });

  const onSubmit = async (data: z.infer<typeof UserInfoValidation>) => {
    try {
      setLoading(true);
      const userInfo = await createUser({
        clerkId: userData.clerkId,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      if (userInfo) {
        toast.success("Deine Informationen wurden erfolgreich erstellt!");
      }
      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full mt-12"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">
                Deine Email-Adresse:
              </FormLabel>
              <FormControl>
                <Input
                  disabled={loading || userData.email !== ""}
                  placeholder="Name des Wettkampfes ..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-end w-full">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Deine Name:</FormLabel>
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
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full">
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
        </div>
        <div className="w-full flex justify-end">
          <Button type="submit" className="bg-teal-500 hover:bg-teal-800">
            <Save size={16} className="mr-2" />
            Speichern
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default OnboardingForm;
