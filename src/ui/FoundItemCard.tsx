import { items } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { Anonymous_Pro, Inria_Sans } from "next/font/google";
import Link from "next/link";
const anony = Anonymous_Pro({ weight: ["400", "700"], subsets: ["latin"] });
const inria = Inria_Sans({ weight: ["300", "400", "700"], subsets: ["latin"] });

export default function FoundItemCard({
  i,
  href,
  view,
}: {
  i: InferSelectModel<typeof items>;
  href: string;
  view: "grid" | "list";
}) {
  let bg;
  let bgDark;
  if (i.itemStatus === "pending") {
    bg = " bg-orange-200 ";
    bgDark = " bg-orange-400 ";
  }
  return (
    <Link
      href={href}
      className={`${bg} grid ${view === "grid" ? "h-40 grid-cols-1" : "h-20 grid-cols-3 grid-rows-1"} w-full gap-2 rounded-lg border border-gray-200 p-4`}
    >
      <div className="w-full">
        <span
          className={`flex w-full justify-between ${view === "grid" ? "flex-row items-center" : "flex-col items-start"}`}
        >
          <h1 className="text-sm font-medium">{i.itemName}</h1>
          {view === "grid" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M181.66,133.66l-80,80A8,8,0,0,1,88,208V48a8,8,0,0,1,13.66-5.66l80,80A8,8,0,0,1,181.66,133.66Z"></path>
            </svg>
          ) : (
            <h1
              className={`text-xs sm:text-sm ${bgDark} ${inria.className} w-max rounded-full px-4 text-white`}
            >
              {i.itemStatus
                .toLowerCase()
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </h1>
          )}
        </span>
      </div>
      <div
        className={`col-span-2 flex w-full justify-between ${view === "grid" ? "flex-col" : "flex-row"}`}
      >
        <h1 className={`text-sm ${anony.className}`}>
          {new Date(i.timeDate).toLocaleString()}
        </h1>
        <h1 className={`text-sm ${anony.className}`}>
          {i.claimantCount} {i.type === "found" ? "Claimants" : "leads"}
        </h1>
        {view === "grid" ? (
          <h1
            className={`text-sm ${bgDark} ${inria.className} w-max rounded-full px-4 text-white`}
          >
            {i.itemStatus
              .toLowerCase()
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </h1>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M181.66,133.66l-80,80A8,8,0,0,1,88,208V48a8,8,0,0,1,13.66-5.66l80,80A8,8,0,0,1,181.66,133.66Z"></path>
          </svg>
        )}
      </div>
    </Link>
  );
}
