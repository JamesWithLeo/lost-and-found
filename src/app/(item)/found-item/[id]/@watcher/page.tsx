import { getFoundItem, getUserSafe } from "@/db/drizzle";
import ChevBack from "@/ui/ChevBack";
import { Anonymous_Pro } from "next/font/google";
import Link from "next/link";
import { formatDistanceToNowStrict } from "date-fns";

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
      <section className="grid h-52 w-full max-w-[1440px] grid-cols-[30%_70%] gap-2 rounded border border-gray-300 bg-white p-2">
        <div className="bg-gray-100"></div>
        <div className="flex flex-col gap-3">
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
            Mesage samaritan
          </button>
          <button className="bg-primary w-full cursor-pointer rounded border px-2 py-1 text-white">
            File ownership
          </button>
        </div>
      </section>
    </main>
  );
}
