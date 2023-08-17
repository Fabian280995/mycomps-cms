import * as z from "zod";

export const SportValidation = z.object({
  name: z.string().min(3).max(30),
});
