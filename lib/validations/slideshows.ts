import * as z from "zod";

export const SlideshowValidation = z.object({
  name: z.string().min(3).max(30),
});

export const SlideValidation = z.object({
  title: z.string().min(3).max(30),
  description: z.string().max(1000).optional(),
  imageId: z.string().min(3),
});
