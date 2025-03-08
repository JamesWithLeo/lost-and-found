import ClientSection from "@/components/server/ClientSection";
import GuestPage from "@/components/server/GuestPage";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-items-center gap-16">
      <GuestPage />
      <ClientSection />
    </div>
  );
}
