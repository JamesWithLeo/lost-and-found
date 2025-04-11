"use server";

import { insertClaims } from "@/db/drizzle";
import { ownershipSchema } from "@/lib/ownershipActionSchema";

export async function postFileOwnership(
  formData: FormData,
  userId: string,
  itemId: string,
  proof: string[],
) {
  const validatedFields = ownershipSchema.safeParse({
    caption: formData.get("caption"),
    desc: formData.get("desc"),
    distinctFeature: formData.get("distinctFeature"),
  });
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return;
  }
  console.log(validatedFields.data);
  console.log(userId);
  console.log(itemId);
  const { caption, desc, distinctFeature } = { ...validatedFields.data };

  const insertedClaims = await insertClaims({
    caption,
    desc,
    distinctFeature,
    itemId,
    userId,
    itemProof: proof,
  });
  console.log(insertedClaims);
}
