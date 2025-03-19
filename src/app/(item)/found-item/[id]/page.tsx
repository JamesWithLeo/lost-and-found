import { getFoundItem } from "@/db/drizzle";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const { data: item } = { ...(await getFoundItem(id)) };
  return (
    <main className="flex min-h-dvh w-full flex-col items-center bg-slate-50 px-48 py-10">
      <span className="flex w-full items-center gap-6 py-2 text-sm text-gray-600">
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
        /<Link href="/found-item">Found Item</Link>/{" "}
        <Link href={`/found-item/${id}`}>{item?.itemName}</Link>
      </span>
      <section className="grid h-52 w-full max-w-[1440px] grid-cols-[30%_70%] gap-2 rounded border border-gray-300 bg-white p-2">
        <div className="bg-gray-100"></div>
        <div className="flex flex-col gap-3">
          <h1>{item?.itemName}</h1>
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
    </main>
  );
}
