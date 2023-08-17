import * as z from "zod";

export const CompetitionValidation = z.object({
  name: z.string().min(3).max(30),
  description: z.string().min(3).max(1000),
  startDate: z.date(),
  endDate: z.date().optional(),
  sportId: z.string().min(4),
  locationId: z.string().min(4),
  organizerId: z.string().min(4),
});
