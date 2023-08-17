import * as z from "zod";

export const AddressValidation = z.object({
  street: z.string().min(3).max(30),
  number: z.string().min(1).max(10),
  zip: z.string().min(3).max(10),
  city: z.string().min(3).max(30),
  state: z.string().min(3).max(30),
  country: z.string().min(3).max(30),
});
