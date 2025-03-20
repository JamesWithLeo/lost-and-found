import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
} from "@/components/ui/sidebar";
import { items } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { Anonymous_Pro } from "next/font/google";
import Link from "next/link";

const anony = Anonymous_Pro({ weight: ["400", "700"], subsets: ["latin"] });
export function MyItemSidebar({
  item,
}: {
  item: InferSelectModel<typeof items> | null;
}) {
  return (
    <Sidebar className="top-[5rem] !h-[calc(100svh-var(--header-height))]">
      <SidebarContent className="">
        <SidebarGroup>
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
            /<Link href="/my-item">My Items</Link>/
            <h1 className="cursor-pointer">{item?.itemName}</h1>
          </span>
          <span className="flex flex-col items-baseline gap-2">
            <h1 className={`${anony.className} text-2xl`}>{item?.itemName}</h1>
            <h1 className={`${anony.className} text-xs`}>Id: {item?.id}</h1>
          </span>
          <h1 className={`${anony.className} text-sm`}>
            Category: {item?.category}
          </h1>
          <h1 className={`${anony.className} text-sm`}>
            last seen: {item?.location} at
            {item?.timeDate && new Date(item.timeDate).toLocaleString()}
          </h1>
          <h1 className={`${anony.className} text-sm`}>
            color: {item?.color ?? "unknown"}
          </h1>

          <div className="grid h-64 w-full grid-cols-3 grid-rows-2 gap-2">
            <div className="col-span-2 row-span-2 w-full bg-gray-100"></div>
            <div className="w-full bg-gray-100"></div>
            <div className="w-full bg-gray-100"></div>
          </div>
          <h1>Description :{item?.desc}</h1>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
