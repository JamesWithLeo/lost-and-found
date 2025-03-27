"use server";

import { insertItem } from "@/db/drizzle";
import { postSearchSchema, quickSearchSchema } from "@/lib/ItemActionSchema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import cloudinary from "../db/cloudinary";

export async function postSearchItems(
  userId: string | undefined,
  base64Images: string[],
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
    itemProof: formData.get("itemProof"),
  });
  const uploadedProofs = await Promise.all(
    base64Images.map((image) => cloudinary.v2.uploader.upload(image)),
  );
  const imageUrls = uploadedProofs.map((res) => res.secure_url);

  if (!validatedFields.success) {
    console.log(validatedFields.error);
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
      itemProof: imageUrls,
    });
    console.log("inserted item", insertedItem);
    redirect(`/my-item/${insertedItem.id}`);
  }
}
export async function postFoundItems(
  userId: string | undefined,
  base64Images: string[],
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
    itemProof: formData.get("itemProof") as string,
  });
  const uploadedProofs = await Promise.all(
    base64Images.map((image) => cloudinary.v2.uploader.upload(image)),
  );
  const imageUrls = uploadedProofs.map((res) => res.secure_url);

  if (!validatedFields.success) {
    console.log(validatedFields.error.message);
  } else {
    const { data } = validatedFields;
    console.log(data);
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
      itemProof: imageUrls,
    });
    console.log("inserted item", insertedItem);
    redirect(`/found-item/${insertedItem.id}`);
  }
}

export async function quickSearchItems(formData: FormData) {
  console.log("date:", formData.get("timeDate"));
  const date = formData.get("timeDate");
  const validatedFields = quickSearchSchema.safeParse({
    itemName: formData.get("itemName") as string,
    color: formData.get("color") as string,
    location: formData.get("location") as string,
    timeDate: date ? new Date(date as string) : null,
    category: formData.get("category") as string,
  });
  if (!validatedFields.success) {
    console.log(
      "quick search item:",
      validatedFields.error.flatten().fieldErrors,
    );
  } else {
    console.log(validatedFields);
    const { data } = validatedFields;
    const params = new URLSearchParams({
      itemName: data.itemName,
      color: data?.color ?? "",
      category: data.category,
      location: data.location ?? "",
      timeDate: data.timeDate ? new Date(data.timeDate).toString() : "",
    }).toString();
    revalidatePath("/result", "page");

    redirect(`/result?${params}`);
  }
}
