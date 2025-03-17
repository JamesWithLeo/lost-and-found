"use server";

import { insertItem } from "@/db/drizzle";
import { postSearchSchema, quickSearchSchema } from "@/lib/ItemActionSchema";
import { redirect } from "next/navigation";

export async function postSearchItems(
  userId: string | undefined,
  formData: FormData,
) {
  if (!userId) {
    throw new Error("User Id is required to perform this action.");
  }
  const validatedFields = postSearchSchema.safeParse({
    itemName: formData.get("itemName") as string,
    color: formData.get("color") as string,
    brandModel: formData.get("brandModel") as string,
    location: formData.get("location") as string,
    timeDate: formData.get("timeDate") as string,
    category: formData.get("category") as string,
    caption: formData.get("caption") as string,
    desc: formData.get("desc") as string,
  });
  if (!validatedFields.success) {
  } else {
    const { data } = validatedFields;
    const insertedItem = await insertItem({
      userId,
      itemName: data.itemName,
      color: data.color,
      brandModel: data.brandModel,
      location: data.location,
      timeDate: data.timeDate,
      category: data.category,
      desc: data.desc,
      caption: data.caption,
      type: "lost",
    });
    console.log("inserted item", insertedItem);
    redirect(`/my-item/ps/${insertedItem.id}`);
  }
}
export async function postFoundItems(
  userId: string | undefined,
  formData: FormData,
) {
  if (!userId) {
    throw new Error("User Id is required to perform this action.");
  }
  const validatedFields = postSearchSchema.safeParse({
    itemName: formData.get("itemName") as string,
    color: formData.get("color") as string,
    brandModel: formData.get("brandModel") as string,
    location: formData.get("location") as string,
    timeDate: formData.get("timeDate") as string,
    category: formData.get("category") as string,
    caption: formData.get("caption") as string,
    desc: formData.get("desc") as string,
  });
  if (!validatedFields.success) {
    console.log(validatedFields.error.message);
  } else {
    const { data } = validatedFields;
    const insertedItem = await insertItem({
      userId,
      itemName: data.itemName,
      color: data.color,
      brandModel: data.brandModel,
      location: data.location,
      timeDate: data.timeDate,
      category: data.category,
      desc: data.desc,
      caption: data.caption,
      type: "found",
    });
    console.log("inserted item", insertedItem);
    redirect(`/found-item/ps/${insertedItem.id}`);
  }
}

export async function quickSearchItems(formData: FormData) {
  const validatedFields = quickSearchSchema.safeParse({
    itemName: formData.get("itemName") as string,
    color: formData.get("color") as string,
    brandModel: formData.get("brandModel") as string,
    location: formData.get("location") as string,
    timeDate: formData.get("timeDate") as string,
    category: formData.get("category") as string,
    caption: formData.get("caption") as string,
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.issues,
    };
  } else {
    console.log(validatedFields);
    const { data } = validatedFields;
    const params = new URLSearchParams({
      itemName: data.itemName,
      color: data?.color ?? "",
      category: data.category,
      brandModel: data?.brandModel ?? "",
      location: data.location,
      timeDate: new Date(data?.timeDate).toString() ?? "",
    }).toString();
    redirect(`/my-item/qs?${params}`);
  }
}
