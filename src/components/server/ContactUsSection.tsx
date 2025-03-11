import {
  IBM_Plex_Sans_Thai_Looped,
  Inter_Tight,
  Istok_Web,
} from "next/font/google";
import Image from "next/image";
const ibm = IBM_Plex_Sans_Thai_Looped({ weight: ["700"], subsets: ["latin"] });
const istokWeb = Istok_Web({ weight: "400", subsets: ["latin"] });
const inter = Inter_Tight({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});
export default function ContactUsSection() {
  return (
    <section className="flex w-full max-w-[1440px]">
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
        <Image
          src={"/images/contactus.png"}
          alt="contact"
          width={600}
          height={384}
        />
        {/* <div className="h-96 w-[600px] bg-gray-200"></div> */}
      </div>
      <div className="flex w-1/2 flex-col gap-8 pr-28">
        <h1 className={`${inter.className} mt-4 text-2xl font-bold`}>
          Contact
        </h1>
        <div className="grid grid-cols-2 gap-y-16">
          <span className="flex w-[250px] flex-col gap-2">
            <label className={`${inter.className} text-[16px]`}>
              First name *
            </label>
            <input
              placeholder="First name"
              className={`ml-2 border-b outline-0 ${inter.className} text-[14px] font-light`}
            />
          </span>
          <span className="flex w-[250px] flex-col gap-2">
            <label className={`${inter.className} text-[16px]`}>
              Last name *
            </label>
            <input
              placeholder="Last name"
              className={`ml-2 border-b outline-0 ${inter.className} text-[14px] font-light`}
            />
          </span>
          <span className="flex w-[250px] flex-col gap-2">
            <label className={`${inter.className} text-[16px]`}>Email *</label>
            <input
              placeholder="Email"
              className={`ml-2 border-b outline-0 ${inter.className} text-[14px] font-light`}
            />
          </span>

          <span className="flex w-[250px] flex-col gap-2">
            <label className={`${inter.className} text-[16px]`}>Phone</label>
            <input
              placeholder="Phone"
              className={`ml-2 border-b outline-0 ${inter.className} text-[14px] font-light`}
            />
          </span>
          <span className="flex w-[510] flex-col gap-2">
            <label className={`${inter.className} text-[16px]`}>Message</label>
            <textarea
              placeholder="Message *"
              rows={2}
              className={`ml-2 h-16 resize-none border-b text-justify outline-0 ${inter.className} text-[14px] font-light`}
            />
          </span>
        </div>
        <button
          className={`${inter.className} bg-primary flex w-max gap-4 px-6 py-1 font-light text-white`}
        >
          Submit
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-right"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
