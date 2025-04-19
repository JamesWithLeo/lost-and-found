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
import ProofGallary from "./ProofGallary";

const anony = Anonymous_Pro({ weight: ["400", "700"], subsets: ["latin"] });
export function MyItemSidebar({
  item,
}: {
  item: InferSelectModel<typeof items>;
}) {
  return (
    <Sidebar className="top-[5rem] !h-[calc(100svh-var(--header-height))] py-2">
      <SidebarContent className="bg-white">
        <SidebarGroup className="gap-4">
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

          <span className="flex flex-col items-baseline">
            <h1 className={`${anony.className} sm:text-2xl`}>
              {item?.itemName}
            </h1>
            <h1 className={`${anony.className} text-xs sm:text-sm`}>
              Category: {item.category}
            </h1>
            <h1 className={`${anony.className} text-xs sm:text-sm`}>
              last seen: {item.location} at
              {item?.timeDate && new Date(item.timeDate).toLocaleString()}
            </h1>
            <h1 className={`${anony.className} text-xs sm:text-sm`}>
              color: {item.color ?? "unknown"}
            </h1>
          </span>

          <div className="">
            <ProofGallary itemProof={item.itemProof} />
          </div>
          <h1 className={`${anony.className} text-xs sm:text-sm`}>
            Description :{item?.desc}
          </h1>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
