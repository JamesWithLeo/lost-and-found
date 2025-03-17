import CauseSection from "@/ui/server/CauseSection";
import ClientSection from "@/ui/server/ClientSection";
import ContactUsSection from "@/ui/server/ContactUsSection";
import GuestHero from "./GuestHero";
import SearchModal from "./SearchModal";

export default function GuestPage({ isModalOpen }: { isModalOpen: boolean }) {
  return (
    <main className="flex w-full flex-col gap-36">
      <GuestHero />
      {isModalOpen && <SearchModal />}
      <ClientSection />
      <CauseSection />
      <ContactUsSection />
    </main>
  );
}
