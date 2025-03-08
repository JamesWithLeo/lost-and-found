import { IBM_Plex_Sans_Thai_Looped, Istok_Web } from "next/font/google";
const ibm = IBM_Plex_Sans_Thai_Looped({ weight: ["700"] });
const istokWeb = Istok_Web({ weight: "400", subsets: ["latin"] });
export default function ContactUsSection() {
  return (
    <section className="flex w-full">
      <div className="flex w-1/2 flex-col gap-8">
        <div className="ml-24 flex flex-col gap-2">
          <h1 className={`${ibm.className} text-5xl font-bold`}>
            Get in Touch with Us
          </h1>
          <p className={`${istokWeb.className} w-[456px]`}>
            Have a question or feedback? Feel free to reach out to us. We are
            here to assist you in any way we can.
          </p>
        </div>
        <div className="h-96 w-[600px] bg-gray-200"></div>
      </div>
      <div className="w-1/2">
        <h1>Contact</h1>
        <input placeholder="First name" />
        <input placeholder="Last name" />
        <input placeholder="Email " />
        <input placeholder="Phone" />
        <input placeholder="Message" />
      </div>
    </section>
  );
}
