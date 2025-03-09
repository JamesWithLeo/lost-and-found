import CauseSection from "@/components/server/CauseSection";
import ClientSection from "@/components/server/ClientSection";
import ContactUsSection from "@/components/server/ContactUsSection";
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
