import { getFoundItem, getUserSafe } from "@/db/drizzle";
import ChevBack from "@/ui/ChevBack";
import { Anonymous_Pro } from "next/font/google";
import Link from "next/link";
import { formatDistanceToNowStrict } from "date-fns";
import FileOwnershipButton from "@/ui/FileOwnershipButton";

const anony = Anonymous_Pro({ weight: ["400", "700"], subsets: ["latin"] });

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const { data: item } = { ...(await getFoundItem(id)) };
  const user = await getUserSafe(item?.userId);
  return (
    <main
      className={`${anony.className} flex min-h-dvh w-full flex-col items-center gap-4 bg-slate-50 px-48 py-10`}
    >
      <span className="flex w-full items-center gap-4 py-2 text-sm text-gray-600">
        <ChevBack />. . .
        <Link href={`/found-item/${id}`}>{item?.itemName}</Link>
      </span>
      <section className="grid h-52 w-full max-w-[1440px] grid-cols-[30%_70%] gap-2 rounded border border-gray-300 bg-white p-2 pr-4">
        <div className="bg-gray-100"></div>
        <div className="flex flex-col gap-3">
          <div className="flex w-full justify-between">
            <span>
              <h1>
                Found by {user?.firstName} {user?.lastName}
              </h1>
              {item?.createdAt && (
                <>
                  <h1 className="text-xs text-gray-500">
                    posted:
                    {formatDistanceToNowStrict(new Date(item.createdAt))} ago
                  </h1>
                </>
              )}
            </span>
            <button className="flex h-max cursor-pointer items-start p-2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-share-2"
              >
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
              </svg>
            </button>
          </div>
          <span>
            <h1>{item?.itemName}</h1>
            <h1 className="text-xs text-gray-500">{item?.id}</h1>
          </span>
          <span>
            <h1 className="text-primary text-xs font-light">Category</h1>
            <h1>{item?.category}</h1>
          </span>
          <span>
            <h1 className="text-primary text-xs font-light">
              Found location and time
            </h1>
            <h1 className="text-sm">
              {item?.location}{" "}
              {item?.timeDate &&
                `at ${new Date(item?.timeDate).toLocaleString()}`}
            </h1>
          </span>
        </div>
      </section>
      <section className="shad w-full max-w-[1440px] gap-2 rounded border-gray-300">
        <div className="grid w-full grid-cols-2 gap-2">
          <button className="w-full cursor-pointer rounded border bg-white px-2 py-1">
            Contact Samaritan
          </button>
          {/* <Link
            href={`/found-item/${id}/ownership`}
            scroll={false}
            className="bg-primary flex w-full cursor-pointer flex-col items-center rounded border px-2 py-1 text-white"
          >
            File ownership
          </Link> */}
          <FileOwnershipButton itemId={id} />
        </div>
      </section>
    </main>
  );
}
