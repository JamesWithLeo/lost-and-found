import { authOptions } from "@/authOptions";
import { findMatchingItems, getItem } from "@/db/drizzle";
import MatchingCard from "@/ui/client/MatchingCard";
import { getServerSession } from "next-auth";
import { Anonymous_Pro } from "next/font/google";
import { Inter_Tight } from "next/font/google";
import Link from "next/link";

const inter = Inter_Tight({
  weight: ["100", "200", "300"],
  subsets: ["latin"],
});
const anony = Anonymous_Pro({ weight: ["400", "700"], subsets: ["latin"] });

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const session = await getServerSession(authOptions);
  const { data: item } = await getItem(id);

  if (!item) {
    return <h1>Item not found.</h1>;
  }
  const matchingItems = await findMatchingItems({
    id: item.id,
    userId: session?.user.id,
    itemName: item.itemName,
    location: item.location,
    category: item.category,
    timeDate: item.timeDate,
    color: item.color,
  });

  return (
    <main className="flex w-full flex-col items-center px-14">
      <div className="grid h-full min-h-dvh w-full max-w-[1440px] grid-cols-[40%_60%]">
        <div
          className={`${inter.className} flex h-full w-full max-w-xl flex-col gap-2 border-x border-gray-200 p-2`}
        >
          <span className="flex items-center gap-6 text-sm text-gray-600">
            <Link href={"/"} className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 256 256"
                strokeLinecap="round"
              >
                <path d="M224,120v96a8,8,0,0,1-8,8H160a8,8,0,0,1-8-8V164a4,4,0,0,0-4-4H108a4,4,0,0,0-4,4v52a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V120a16,16,0,0,1,4.69-11.31l80-80a16,16,0,0,1,22.62,0l80,80A16,16,0,0,1,224,120Z"></path>
              </svg>
            </Link>
            /<Link href="/my-item">My Items</Link>/{" "}
            <Link href={`/my-item/${id}`}>{item.itemName}</Link>
          </span>

          <span className="flex flex-col items-baseline gap-2">
            <h1 className={`${anony.className} text-2xl`}>{item?.itemName}</h1>
            <h1 className={`${anony.className} text-xs`}>Id: {id}</h1>
          </span>
          <h1 className={`${anony.className} text-xs`}>
            Category:{item?.category}
          </h1>
          <h1>
            last seen: {item?.location} at
            {item?.timeDate && new Date(item.timeDate).toLocaleString()}
          </h1>
          <h1>color: {item?.color}</h1>

          <div className="grid h-64 w-full grid-cols-3 grid-rows-2 gap-2">
            <div className="col-span-2 row-span-2 w-full bg-gray-100"></div>
            <div className="w-full bg-gray-100"></div>
            <div className="w-full bg-gray-100"></div>
          </div>
          <h1>Description :{item?.desc}</h1>
        </div>
        <div className="grid w-full grid-cols-2 border-r border-gray-200 p-2">
          <ul>
            {matchingItems && matchingItems.length > 0 ? (
              matchingItems.map((match) => (
                <MatchingCard {...match} key={`${match.id}-matching-item`} />
              ))
            ) : (
              <p>No matching items found.</p>
            )}
          </ul>
        </div>
      </div>
    </main>
  );
}
