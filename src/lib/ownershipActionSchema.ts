import { z } from "zod";

export const ownershipSchema = z.object({
  caption: z
    .string()
    .min(2, "caption must be at least 2 characters long")
    .max(255),
  distinctFeature: z.string(),
  desc: z.string(),
});

export type FormSchema = z.infer<typeof ownershipSchema>;
