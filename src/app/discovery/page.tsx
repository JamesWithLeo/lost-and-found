import GuestPage from "@/ui/server/GuestPage";
interface PageProps {
  searchParams?: Promise<Record<string, string | string[]>>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const openSearch = params?.new === "true";
  return (
    <div className="flex min-h-screen flex-col items-center justify-items-center">
      <GuestPage isModalOpen={openSearch} />
    </div>
  );
}
