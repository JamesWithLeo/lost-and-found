import PostButton from "@/ui/PostButton";
import { Anonymous_Pro } from "next/font/google";
import { Inter_Tight } from "next/font/google";
import { redirect } from "next/navigation";

const anony = Anonymous_Pro({ weight: ["400", "700"], subsets: ["latin"] });
const inter = Inter_Tight({
  weight: ["100", "200", "300"],
  subsets: ["latin"],
});

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | undefined;
  }>;
}) {
  const { itemName, brandModel, location, timeDate, color } =
    await searchParams;
  if (!itemName) {
    redirect("/my-item");
  }

  return (
    <div className="grid max-h-dvh w-full max-w-[1440px] grid-cols-1 flex-col items-center gap-8 bg-slate-50 px-24 py-10">
      <section className="w-full border-gray-400">
        <div className="border-gray-400 p-2">
          <div className="flex justify-between">
            <h1 className={`${anony.className} text-2xl`}>
              Result for: {itemName}
            </h1>
            <PostButton />
          </div>
          <span className={` ${inter.className}`}>
            <h1>Brand: {brandModel ? brandModel : "no brand"}</h1>
            <h1>Color : {color}</h1>
            <span className="flex gap-2">
              <h1>Last seen:</h1>
              <h1>{location} at</h1>
              {timeDate ? new Date(timeDate).toLocaleString() : ""}
            </span>
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 border border-gray-400 p-2">
          <div className="grid h-full w-full grid-cols-1 grid-rows-[239px_80px] flex-col gap-1">
            <div className="h-full w-full bg-gray-100"> </div>
            <div className="h-[80px] w-full bg-gray-100 p-2">
              <h1 className="">Umbrella On the bench</h1>
              <p className="text-xs">Found 1:30 pm · Claimant 1</p>
            </div>
          </div>

          <div className="grid h-full w-full grid-cols-1 grid-rows-[239px_80px] flex-col gap-1">
            <div className="h-full w-full bg-gray-100"> </div>
            <div className="h-[80px] w-full bg-gray-100 p-2">
              <h1 className="">Umbrella On the bench</h1>
              <p className="text-xs">Found 1:30 pm · Claimant 1</p>
            </div>
          </div>

          <div className="grid h-full w-full grid-cols-1 grid-rows-[239px_80px] flex-col gap-1">
            <div className="h-full w-full bg-gray-100"> </div>
            <div className="h-[80px] w-full bg-gray-100 p-2">
              <h1 className="">Umbrella On the bench</h1>
              <p className="text-xs">Found 1:30 pm · Claimant 1</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
