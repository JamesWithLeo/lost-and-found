import { InferSelectModel } from "drizzle-orm";
import FoundItemCard from "./FoundItemCard";
import { items as itemsTable } from "@/db/schema";
import Link from "next/link";

export default function RecentSection({
  lostItems,
  foundItems,
  globalCaseQuantity,
  returnedItemsQuantity,
  honestyPercentage,
}: {
  lostItems: InferSelectModel<typeof itemsTable>[];
  foundItems: InferSelectModel<typeof itemsTable>[];
  globalCaseQuantity: number;
  returnedItemsQuantity: number;
  honestyPercentage: number;
}) {
  return (
    <>
      <main className="flex flex-col gap-2 md:grid md:grid-cols-3">
        <div className="flex h-max w-full gap-2">
          <div className="row-start-2 grid w-full grid-cols-3 gap-2 md:grid-cols-1 md:grid-rows-3 md:flex-col">
            <div className="h-full w-full rounded bg-blue-200 p-2 sm:h-28 sm:w-full sm:p-4">
              <h1 className="mb-4 flex items-baseline gap-2 text-lg font-bold sm:text-3xl">
                {globalCaseQuantity}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-globe"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
              </h1>
              <h1 className="text-sm">Global case</h1>
            </div>
            <div className="h-full w-full rounded bg-gray-50 p-2 sm:h-28 sm:w-full sm:p-4">
              <h1 className="mb-4 flex items-baseline gap-2 text-lg font-bold sm:text-3xl">
                {honestyPercentage}%
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-trending-up"
                >
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
              </h1>
              <h1 className="ml-4 text-sm">Honesty</h1>
            </div>
            <div className="h-full w-full rounded bg-gray-200 p-2 sm:h-28 sm:w-full sm:p-4">
              <h1 className="mb-4 flex items-baseline gap-2 text-lg font-bold sm:text-3xl">
                {returnedItemsQuantity}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-trending-up"
                >
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
              </h1>
              <h1 className="text-sm">Returned Item</h1>
            </div>
          </div>
        </div>

        <div className="flex h-full w-full flex-col gap-2 rounded border p-2">
          <span className="flex justify-between">
            <h1 className="col-span-2 text-sm font-bold">Recently Lost</h1>
            <Link
              className="text-sm text-gray-500 hover:text-gray-700 md:hidden"
              href="/my-item"
            >
              view more
            </Link>
          </span>
          <div className="flex h-max grow flex-col gap-2">
            {lostItems &&
              lostItems.length !== 0 &&
              lostItems
                .filter((h) => h.itemStatus === "pending")
                .map((i) => (
                  <FoundItemCard
                    view={"grid"}
                    key={`${i.id}`}
                    href={`/my-item/${i.id}`}
                    i={i}
                  />
                ))}
          </div>
          <span className="hidden h-min grow-0 flex-col items-center md:flex">
            <Link
              className="text-sm text-gray-500 hover:text-gray-700"
              href="/my-item"
            >
              view more
            </Link>
          </span>
        </div>

        <div className="flex h-full w-full flex-col gap-2 rounded border p-2">
          <span className="flex justify-between">
            <h1 className="col-span-2 text-sm font-bold">Recently Found</h1>
            <Link
              className="dtext-gray-500 text-sm hover:text-gray-700 md:hidden"
              href="/found-item"
            >
              view more
            </Link>
          </span>
          <div className="flex min-h-36 grow flex-col gap-2">
            {foundItems &&
              foundItems.length !== 0 &&
              foundItems
                .filter((h) => h.itemStatus === "pending")
                .map((i) => (
                  <FoundItemCard
                    view={"grid"}
                    key={`${i.id}`}
                    href={`/found-item/${i.id}`}
                    i={i}
                  />
                ))}
          </div>
          <span className="hidden h-min grow-0 flex-col items-center md:flex">
            <Link
              className="text-sm text-gray-500 hover:text-gray-700"
              href="/found-item"
            >
              view more
            </Link>
          </span>
        </div>
      </main>
    </>
  );
}
