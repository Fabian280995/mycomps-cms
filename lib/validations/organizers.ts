import * as z from "zod";

export const OrganizerValidation = z.object({
  name: z.string().min(3).max(30),
  url: z.string().min(3).max(255),
  addressId: z.string().min(4),
});
