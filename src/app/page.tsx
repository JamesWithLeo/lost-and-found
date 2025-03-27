import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../authOptions";
import {
  getFoundItems,
  GetGlobalCase,
  getMyItems,
  getUser,
  hasNullOrUndefinedData,
} from "@/db/drizzle";
import SearchModal from "@/ui/server/SearchModal";
import QuickSearchSection from "@/ui/QuickSearchSection";
import QuickSearchModal from "@/ui/QuickSearchModal";
import RecentSection from "@/ui/RecentSection";

interface PageProps {
  searchParams?: Promise<Record<string, string | string[]>>;
}

export default async function Page({ searchParams }: PageProps) {
  const openSearch = (await searchParams)?.new === "true";
  const q = (await searchParams)?.q === "true";
  const session = await getServerSession(authOptions);
  const user = await getUser();
  if (
    hasNullOrUndefinedData({
      firstName: user?.firstName,
      lastName: user?.lastName,
      birthDate: user?.birthDate,
    })
  ) {
    redirect("/signup");
  }

  if (!session) {
    redirect("/discovery");
  }

  const recentlyFoundItems = await getFoundItems(session.user.id, 2);
  const recentlylostItems = await getMyItems(session.user.id, 2);
  const allCase = await GetGlobalCase();
  const globalCaseQuantity = allCase.length;

  const returnedItemsQuantity = allCase.reduce(
    (count, caseItem) =>
      caseItem.itemStatus === "returned" ? count + 1 : count,
    0,
  );
  const honestyPercentage =
    globalCaseQuantity > 0
      ? (returnedItemsQuantity / globalCaseQuantity) * 100
      : 0;

  return (
    <div className="flex min-h-screen w-full max-w-[1440px] flex-col items-center justify-items-center">
      {openSearch && <SearchModal />}
      {q && <QuickSearchModal />}
      <section className="w-full flex-col">
        <div className="grid h-80 w-full grid-cols-3 grid-rows-4 justify-items-center overflow-clip bg-[url(/images/hero.png)] bg-cover bg-center">
          <div className="col-span-3 row-span-2 row-start-3"></div>
          <span className="right-16 top-56 col-span-2 col-start-2 row-start-2 h-[140px] w-full max-w-[396px] select-none text-clip text-wrap bg-clip-text text-right text-5xl font-bold text-slate-50 opacity-70 drop-shadow-xl backdrop-opacity-45">
            Today, we helped 451 people reunite with their lost items!
          </span>
        </div>
      </section>
      <section className="flex w-full flex-col gap-4 pb-10">
        <div className="w-full bg-slate-100 py-2">
          <QuickSearchSection />
        </div>
        <div className="flex w-full flex-col items-center justify-between gap-2 px-48">
          <div className="flex w-full flex-col items-center gap-4">
            <span className="w-full">
              <h1 className="text-primary text-6xl font-bold">Welcome back</h1>
              <h1 className="text-4xl font-bold">
                {user?.firstName} {user?.lastName}
              </h1>
            </span>
            <span className="col-start-2 row-start-4 flex">
              <RecentSection
                honestyPercentage={honestyPercentage}
                returnedItemsQuantity={returnedItemsQuantity}
                globalCaseQuantity={globalCaseQuantity}
                foundItems={recentlyFoundItems}
                lostItems={recentlylostItems}
              />
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
