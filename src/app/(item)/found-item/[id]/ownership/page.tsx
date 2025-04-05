import { authOptions } from "@/authOptions";
import { getFoundItem, getUserSafe } from "@/db/drizzle";
import FileOwnershipForm from "@/ui/FileOwnershipForm";

import { getServerSession } from "next-auth";

import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const targetId = (await cookies()).get("targetItemId")?.value;
  const session = await getServerSession(authOptions);
  if (!targetId || !session) {
    redirect("/result/"); // todo : add 404
  }
  const { data: item } = await getFoundItem(targetId);
  const samaritan = await getUserSafe(item?.userId);
  const user = await getUserSafe(session?.user.id);
  if (!item || !samaritan || !user) {
    redirect("/result/"); // todo :add 404
  }
  return (
    <div className="grid h-full w-full grid-cols-1 grid-rows-[max-content_1fr] rounded-r-2xl">
      <section className="flex w-max items-center gap-6 py-2 text-sm text-gray-600">
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
        <h1 className="cursor-pointer">/</h1>
        <Link href={`/found-item/${targetId}`}>{item?.itemName}</Link>
        <h1 className="cursor-pointer">/</h1>
        <h1 className="cursor-pointer">Ownership</h1>
      </section>
      <div className="sticky top-16 flex h-[4rem] w-full items-center border-b px-8 py-2 backdrop-blur-lg sm:h-[var(--header-height)]">
        <h1 className="text-primary text-xl font-bold sm:text-2xl">
          File Ownership
        </h1>
      </div>
      <FileOwnershipForm item={item} samaritan={samaritan} user={user} />
    </div>
  );
}
