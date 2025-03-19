import { items } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { Anonymous_Pro, Inria_Sans } from "next/font/google";
import Link from "next/link";
const anony = Anonymous_Pro({ weight: ["400", "700"], subsets: ["latin"] });
const inria = Inria_Sans({ weight: ["300", "400", "700"], subsets: ["latin"] });

export default function FoundItemCard({
  i,
  href,
}: {
  i: InferSelectModel<typeof items>;
  href: string;
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
      className={`flex-col ${bg} flex h-40 w-full gap-2 rounded-lg border border-gray-200 p-4`}
    >
      <div>
        <span className="flex items-center justify-between">
          <h1 className="font-medium">{i.itemName}</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M181.66,133.66l-80,80A8,8,0,0,1,88,208V48a8,8,0,0,1,13.66-5.66l80,80A8,8,0,0,1,181.66,133.66Z"></path>
          </svg>
        </span>
      </div>
      <div className="flex flex-col">
        <h1 className={`text-sm ${anony.className}`}>
          {new Date(i.timeDate).toLocaleString()}
        </h1>
        <h1 className={`text-sm ${anony.className}`}>
          {i.claimantCount} {i.type === "found" ? "Claimants" : "leads"}
        </h1>
        <h1
          className={`text-sm ${bgDark} ${inria.className} w-max rounded-full px-4 text-white`}
        >
          {i.itemStatus
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </h1>
      </div>
    </Link>
  );
}
