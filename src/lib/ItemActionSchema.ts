import { z } from "zod";

export const postSearchSchema = z.object({
  itemName: z
    .string()
    .min(2, "Item name must be at least 2 characters long ")
    .max(256)
    .trim(),
  color: z.string().min(2).max(256).optional().nullable(),
  brandModel: z.string().min(2).max(256).optional().optional().nullable(),
  location: z
    .string()
    .min(2)
    .max(256)
    .regex(/^[a-zA-Z0-9\s,.-]*$/, "Invalid location format"),
  timeDate: z.coerce
    .date()
    .max(new Date(), { message: "Date and time must not be in the future" }),
  category: z.enum([
    "animals",
    "accessory",
    "clothing",
    "bags & wallet",
    "documents",
    "electronics",
    "food & beverages",
    "pets & person",
    "miscellaneous",
    "furniture",
    "toys & games",
    "health & beauty",
    "home appliances",
    "sports & outdoors",
    "automotive",
    "books & stationery",
    "jewelry",
    "art & collectibles",
    "tools & equipment",
    "garden supplies",
  ]),
  caption: z.string().min(10).max(256),
  desc: z.string().optional().nullable(),
  // itemProof: z.string(),
});

export const quickSearchSchema = z.object({
  itemName: z
    .string()
    .min(2, "Item name must be at leat 2 characters long ")
    .max(256)
    .trim(),
  color: z
    .string()
    .min(2)
    .max(256)
    .optional()
    .transform((value) => (value === "" ? null : value)),
  brandModel: z
    .string()
    .min(2)
    .max(256)
    .optional()
    .transform((value) => (value === "" ? null : value)),
  location: z
    .string()
    .min(2)
    .max(256)
    .regex(/^[a-zA-Z0-9\s,.-]*$/, "Invalid location format"),
  timeDate: z.coerce
    .date()
    .max(new Date(), { message: "Date and time must not be in the future" }),
  category: z.enum([
    "animals",
    "accessory",
    "clothing",
    "bags & wallet",
    "documents",
    "electronics",
    "food & beverages",
    "pets & person",
    "miscellaneous",
    "furniture",
    "toys & games",
    "health & beauty",
    "home appliances",
    "sports & outdoors",
    "automotive",
    "books & stationery",
    "jewelry",
    "art & collectibles",
    "tools & equipment",
    "garden supplies",
  ]),
});

export type FormSchema = z.infer<typeof postSearchSchema>;
