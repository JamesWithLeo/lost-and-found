import { z } from "zod";

export const CATEGORIES = [
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
];

const truncateToMinute = (date: Date) => {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
  );
};

const now = truncateToMinute(new Date());

export const postItemSchema = z.object({
  itemName: z
    .string()
    .min(2, "Item name must be at least 2 characters long")
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
    .max(now, { message: "Date and time must not be in the future" }),
  category: z.enum(["unknown", ...CATEGORIES]),
  caption: z.string().min(10).max(256),
  desc: z.string().optional().nullable(),
});

export const quickSearchSchema = z.object({
  itemName: z
    .string()
    .min(2, "Item name must be at leat 2 characters long ")
    .max(256)
    .trim(),
  color: z
    .string()
    .max(256)
    .optional()
    .nullable()
    .transform((value) => (value === "" ? null : value)),
  brandModel: z
    .string()
    .max(256)
    .optional()
    .nullable()
    .transform((value) => (value === "" ? null : value)),
  location: z
    .string()
    .max(256)
    .regex(/^[a-zA-Z0-9\s,.-]*$/, "Invalid location format")
    .nullable()
    .optional(),
  timeDate: z.date().nullable().optional(),
  category: z.enum(["unknown", ...CATEGORIES]),
});

export type FormSchema = z.infer<typeof postItemSchema>;
