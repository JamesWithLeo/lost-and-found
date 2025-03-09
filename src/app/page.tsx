import GuestPage from "@/components/server/GuestPage";

export default async function Home({
  searchParams,
}: {
  searchParams?: Record<string, string | string[]>;
}) {
  const openSearch = searchParams?.new === "true";
  return (
    <div className="flex min-h-screen flex-col items-center justify-items-center">
      <GuestPage isModalOpen={openSearch} />
    </div>
  );
}
