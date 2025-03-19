import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../authOptions";
import { getUser, hasNullOrUndefinedData } from "@/db/drizzle";
import SearchModal from "@/ui/server/SearchModal";
import QuickSearchSection from "@/ui/QuickSearchSection";
import QuickSearchModal from "@/ui/QuickSearchModal";

interface PageProps {
  searchParams?: Promise<Record<string, string | string[]>>;
}

export default async function Page({ searchParams }: PageProps) {
  const openSearch = (await searchParams)?.new === "true";
  const q = (await searchParams)?.q === "true";
  const session = await getServerSession(authOptions);
  const user = await getUser();
  if (
    !hasNullOrUndefinedData({
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
          <div className="flex gap-4 border p-2">
            <div className="h-28 w-40 rounded bg-blue-200 p-4">
              <h1 className="mb-4 flex items-baseline gap-2 text-3xl font-bold">
                10,329
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
              <h1 className="">Global case</h1>
            </div>
            <div className="h-28 w-40 rounded bg-gray-50 p-4">
              <h1 className="mb-4 flex items-baseline gap-2 text-3xl font-bold">
                61%
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
              <h1 className="ml-4 text-xl">Honesty</h1>
            </div>
            <div className="h-28 w-40 rounded bg-gray-200 p-4">
              <h1 className="mb-4 flex items-baseline gap-2 text-3xl font-bold">
                5, 321
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
              <h1 className="">Returned Item</h1>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <span>
              <h1 className="text-primary text-6xl font-bold">Welcome back</h1>
              <h1 className="text-4xl font-bold">
                {user?.firstName} {user?.lastName}
              </h1>
            </span>
            <span className="col-start-2 row-start-4 flex"></span>
          </div>
        </div>
      </section>
    </div>
  );
}
