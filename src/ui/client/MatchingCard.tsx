"use client";

import { items } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { Anonymous_Pro, Inter_Tight } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
const anony = Anonymous_Pro({ weight: ["400", "700"], subsets: ["latin"] });
const inter = Inter_Tight({ weight: ["100", "200"], subsets: ["latin"] });

export default function MatchingCard({
  item,
  user,
  isCurrentUser,
  clickLink,
}: {
  item: InferSelectModel<typeof items>;
  user: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
  } | null;
  isCurrentUser: boolean;
  clickLink: string;
}) {
  const router = useRouter();
  return (
    <section className="grid h-full max-h-96 w-full max-w-96 grid-rows-[8fr_2fr] gap-1.5 rounded border bg-white p-1">
      {item.itemProof && item.itemProof[0] && (
        <div className="h-full w-full overflow-hidden bg-gray-100">
          <Image
            src={item.itemProof[0]}
            alt={`matching-${item.itemName}`}
            width={100}
            height={100}
            className="h-full w-full"
          />
        </div>
      )}
      <div
        className="h-full w-full cursor-pointer bg-gray-100 p-1.5"
        onClick={() => {
          router.push(`${clickLink}${item.id}`);
        }}
      >
        <h1 className={`${anony.className} `}>{item.itemName}</h1>
        <h1 className={`${inter.className} text-xs`}>
          Reported by{" "}
          {isCurrentUser ? "You" : `${user?.firstName} ${user?.lastName}`}
        </h1>
        <h1 className={`${inter.className} text-xs`}>Claimant: 0</h1>
        <h1 className={`${inter.className} text-xs`}>{item.location}</h1>
      </div>
    </section>
  );
}
