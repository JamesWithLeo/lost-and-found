import GuestPage from "@/components/server/GuestPage";

interface PageProps {
  searchParams?: Record<string, string | string[]>;
}
export default function Home({ searchParams }: PageProps) {
  const openSearch = searchParams?.new === "true";
  return (
    <div className="flex min-h-screen flex-col items-center justify-items-center">
      <GuestPage isModalOpen={openSearch} />
    </div>
  );
}
