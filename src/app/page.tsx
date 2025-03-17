import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../authOptions";
import { getUser, hasNullOrUndefinedData } from "@/db/drizzle";
import Link from "next/link";
import SearchModal from "@/ui/server/SearchModal";

interface PageProps {
  searchParams?: Promise<Record<string, string | string[]>>;
}

export default async function Page({ searchParams }: PageProps) {
  const openSearch = (await searchParams)?.new === "true";
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
    <div className="flex min-h-screen flex-col items-center justify-items-center">
      {openSearch && <SearchModal />}

      <span className="h-[140px] w-[396px] text-right text-4xl font-bold text-gray-400">
        Today, we helped 36 people reunite with their lost items!
      </span>
      <Link href={"/?new=true"} className={`rounded-full border px-4 py-1`}>
        Search Item/Owner
      </Link>
      <h1 className="text-6xl font-bold">Welcome back</h1>
      <h1 className="text-4xl font-bold">
        {user?.firstName} {user?.lastName}
      </h1>
    </div>
  );
}
