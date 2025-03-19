"use server";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
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
    console.error("saveUserSetup doesn't recieved userId");
  } else {
    const validatedFields = schema.safeParse({
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      gender: formData.get("gender") as string,
      birthDate: formData.get("birthDate") as string,
    });
    if (!validatedFields.success) {
      // to do : return some error message
    }

    try {
      await db
        .update(users)
        .set({
          firstName: validatedFields.data?.firstName,
          lastName: validatedFields.data?.lastName,
          gender: validatedFields.data?.gender,
          birthDate: validatedFields.data?.birthDate,
        })
        .where(eq(users.id, userId));
      redirect("/");
    } catch (error) {
      console.error(error);
    }
  }
}
