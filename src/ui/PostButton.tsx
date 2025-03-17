"use client";

import Link from "next/link";
import { Anonymous_Pro } from "next/font/google";
import { useSearchParams } from "next/navigation";

const anony = Anonymous_Pro({ weight: ["400", "700"], subsets: ["latin"] });

export default function PostButton() {
  const searchParams = useSearchParams();

  const itemName = searchParams.get("itemName");
  const color = searchParams.get("color");
  const category = searchParams.get("category");
  const brandModel = searchParams.get("brandModel");
  const location = searchParams.get("location");
  const caption = searchParams.get("caption");
  const desc = searchParams.get("desc");
  const timeDate = searchParams.get("timeDate");
  const params = new URLSearchParams({
    itemName: itemName ?? "",
    color: color ?? "",
    category: category ?? "",
    brandModel: brandModel ?? "",
    location: location ?? "",
    timeDate: (timeDate && new Date(timeDate).toString()) ?? "",
    caption: caption ?? "",
    desc: desc ?? "",
  }).toString();

  return (
    <span className={`flex ${anony.className} items-center gap-1 text-sm`}>
      <h1>Not in result?</h1>
      <Link
        href={`/my-item?${params}`}
        className="text-primary cursor-pointer rounded border border-gray-300 bg-white px-2 py-1"
      >
        {" "}
        Post{" "}
      </Link>
      <h1>it instead</h1>
    </span>
  );
}
