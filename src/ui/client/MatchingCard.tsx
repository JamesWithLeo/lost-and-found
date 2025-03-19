import { items } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { Anonymous_Pro, Inter_Tight } from "next/font/google";
const anony = Anonymous_Pro({ weight: ["400", "700"], subsets: ["latin"] });
const inter = Inter_Tight({ weight: ["100", "200"], subsets: ["latin"] });

export default async function MatchingCard(
  item: InferSelectModel<typeof items>,
) {
  return (
    <section className="grid h-full max-h-96 w-full max-w-96 grid-rows-[8fr_2fr] gap-1.5 rounded bg-white">
      <div className="h-full w-full cursor-pointer bg-gray-100"></div>
      <div className="h-full w-full cursor-pointer bg-gray-100 p-1.5">
        <h1 className={`${anony.className} `}>{item.itemName}</h1>
        <h1 className={`${inter.className} text-xs`}>
          Claimant: {item.claimantCount}
        </h1>
        <h1 className={`${inter.className} text-xs`}>{item.location}</h1>
      </div>
    </section>
  );
}
