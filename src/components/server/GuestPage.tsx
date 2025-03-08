import CauseSection from "@/components/server/CauseSection";
import ClientSection from "@/components/server/ClientSection";
import ContactUsSection from "@/components/server/ContactUsSection";
import GuestHero from "./GuestHero";

export default function GuestPage() {
  return (
    <main className="flex flex-col gap-28">
      <GuestHero />
      <ClientSection />
      <CauseSection />
      <ContactUsSection />
    </main>
  );
}
