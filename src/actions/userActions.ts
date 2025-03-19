"use server";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(256, "First name must not exceed 256 characters"),
  lastName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(256, "First name must not exceed 256 characters"),
  gender: z.enum(["male", "female"]).nullable(),
  birthDate: z.string().refine((date) => {
    const birthDate = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const isOldEnough =
      age > 11 ||
      (age === 11 &&
        today >= new Date(birthDate.setFullYear(today.getFullYear())));
    return isOldEnough;
  }, "User must be at least 11 years old"),
});

export async function saveUserSetup(
  userId: string | undefined,
  formData: FormData,
) {
  if (!userId) {
    console.error("saveUserSetup didn't receive userId");
    return;
  }

  const validatedFields = schema.safeParse({
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    gender: formData.get("gender") as string,
    birthDate: formData.get("birthDate") as string,
  });

  if (!validatedFields.success) {
    console.error(validatedFields.error.flatten().formErrors);
    return;
  }

  const updateData = Object.fromEntries(
    Object.entries(validatedFields.data).filter(([, v]) => v !== undefined),
  );

  if (Object.keys(updateData).length === 0) {
    console.error("No valid fields to update");
    return;
  }

  await db
    .update(users)
    .set(updateData)
    .where(eq(users.id, userId))
    .returning();
  revalidatePath("/");
  redirect("/");
}
