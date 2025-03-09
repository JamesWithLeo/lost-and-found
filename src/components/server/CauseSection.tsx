import { IBM_Plex_Sans_Thai_Looped, Istok_Web } from "next/font/google";
const ibm = IBM_Plex_Sans_Thai_Looped({ weight: ["700"], subsets: ["latin"] });
const istokWeb = Istok_Web({ weight: "400", subsets: ["latin"] });
export default function CauseSection() {
  return (
    <section className="w-full">
      <div className="flex flex-col items-center">
        <h1 className={`${ibm.className} text-center text-[3.75rem] font-bold`}>
          Join Our Cause Today
        </h1>
        <p className={`w-[651px] text-center ${istokWeb.className} `}>
          You can make a difference by contributing to our lost and found
          community. Every small act of kindness counts.
        </p>
      </div>

      <div className="mt-8 grid min-h-56 grid-cols-3 grid-rows-1 gap-4">
        <div className="flex items-center justify-center bg-gray-200">
          <h1>Donate</h1>
        </div>

        <div className="flex items-center justify-center bg-gray-200">
          <h1>Spread The Word</h1>
        </div>
        <div className="flex items-center justify-center bg-gray-200">
          <h1>Suppport Us</h1>
        </div>
      </div>
    </section>
  );
}
