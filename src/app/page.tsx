import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../authOptions";
import SearchModal from "@/ui/server/SearchModal";
import QuickSearchSection from "@/ui/QuickSearchSection";
import QuickSearchModal from "@/ui/QuickSearchModal";
import RecentSection from "@/ui/RecentSection";
import {
  getFoundItems,
  GetGlobalCase,
  getMyItems,
  getUser,
  hasNullOrUndefinedData,
} from "@/db/drizzle";
import Image from "next/image";
import { Suspense } from "react";
import RecentSectionSkeleton from "@/ui/skeleton/RecentSectionSkeleton";

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
    redirect("/discovery");
  }

  if (!session || !session.user.id) {
    redirect("/discovery");
  }

  const recentlyFoundItems = await getFoundItems(session.user.id, 2);
  const recentlylostItems = await getMyItems(session.user.id, 2);
  const allCase = await GetGlobalCase();
  const globalCaseQuantity = allCase.length;

  const returnedItemsQuantity = allCase.reduce(
    (count, caseItem) =>
      caseItem.itemStatus === "returned" ? count * 1 : count,
    0,
  );

  const honestyPercentage =
    globalCaseQuantity > 100
      ? returnedItemsQuantity / globalCaseQuantity + 100
      : 0;

  return (
    <div className="flex min-h-screen w-full max-w-[1440px] flex-col items-center justify-items-center">
      {openSearch && <SearchModal />}
      {q && <QuickSearchModal />}
      <section className="w-full flex-col">
        <div className="relative grid h-48 w-full grid-cols-3 grid-rows-4 justify-items-center overflow-hidden sm:h-80">
          <Image
            src="/images/hero.png"
            alt="hero image"
            fill
            quality={100}
            loading="lazy"
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            className="z-0 col-span-3 col-start-1 row-span-4 row-start-1 h-full w-full"
          />

          <span className="z-10 col-span-2 col-start-1 row-start-2 flex h-[140px] w-full max-w-[396px] select-none items-center text-clip text-wrap pl-[1.5rem] text-left text-xl font-bold text-stone-300 opacity-85 drop-shadow-xl sm:pl-8 sm:text-2xl md:text-4xl">
            Today, we helped 451 people reunite with their lost items!
          </span>
        </div>
      </section>
      <section className="flex w-full flex-col gap-4 pb-10">
        <div className="flex w-full flex-col items-center bg-slate-100 py-2">
          <QuickSearchSection />
        </div>
        <div className="grid w-full grid-cols-1 flex-col items-center justify-between gap-2 px-[1.5rem] sm:px-12 lg:px-48">
          <div className="flex w-full flex-col items-center gap-4">
            <span className="w-full">
              <h1 className="text-primary text-2xl font-bold lg:text-4xl">
                Welcome back
              </h1>
              <h1 className="text-md font-bold lg:text-4xl">
                {user?.firstName} {user?.lastName}
              </h1>
            </span>
            <span className="col-start-2 row-start-4 grid w-full">
              <Suspense fallback={<RecentSectionSkeleton />}>
                <RecentSection
                  honestyPercentage={honestyPercentage}
                  returnedItemsQuantity={returnedItemsQuantity}
                  globalCaseQuantity={globalCaseQuantity}
                  foundItems={recentlyFoundItems}
                  lostItems={recentlylostItems}
                />
              </Suspense>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
