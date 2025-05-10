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
  claimantCount,
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
  claimantCount: number;
}) {
  const router = useRouter();
  return (
    <section className="grid h-full max-h-96 w-full max-w-96 grid-rows-[8fr_2fr] gap-1.5 rounded border bg-white p-1">
      {item.itemProof && item.itemProof[0] ? (
        <div className="h-full w-full overflow-hidden bg-gray-100">
          <Image
            src={item.itemProof[0]}
            alt={`matching-${item.itemName}`}
            width={100}
            height={100}
            quality={100}
            loading="lazy"
            style={{ objectFit: "fill", objectPosition: "center" }}
            className="h-full w-full"
          />
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M223.68,66.15,135.68,18a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,32l80.34,44-29.77,16.3-80.35-44ZM128,120,47.66,76l33.9-18.56,80.34,44ZM40,90l80,43.78v85.79L40,175.82Zm176,85.78h0l-80,43.79V133.82l32-17.51V152a8,8,0,0,0,16,0V107.55L216,90v85.77Z"></path>
          </svg>
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
        <h1 className={`${inter.className} text-xs`}>
          Claimant: {claimantCount}
        </h1>
        <h1 className={`${inter.className} text-xs`}>{item.location}</h1>
      </div>
    </section>
  );
}
