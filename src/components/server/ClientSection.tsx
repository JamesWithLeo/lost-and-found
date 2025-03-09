import { IBM_Plex_Sans_Thai_Looped, Inter_Tight } from "next/font/google";
import Link from "next/link";
const ibm = IBM_Plex_Sans_Thai_Looped({ weight: ["700"], subsets: ["latin"] });
const inter = Inter_Tight({
  weight: ["300", "400", "600"],
  style: "italic",
  subsets: ["latin"],
});
export default function ClientSection() {
  return (
    <section className="flex w-full flex-col gap-8 px-24">
      <div className="flex">
        <div className="w-max">
          <h1 className={`${ibm.className} text-[3.75rem] font-bold`}>
            Client Stories
          </h1>
          <p className={`font-extralight italic ${inter.className} w-[440px]`}>
            I lost my wallet and thanks to this platform, it was returned to me
            by a kind stanger. Truly a lifesaver!
          </p>
        </div>
        <div className="flex w-full flex-col items-end">
          <div className="mt-4 grid grid-cols-[20px_1fr_20px_1fr] gap-8">
            <span className="col-span-1 col-start-2">
              <p
                className={`font-extralight ${inter.className} w-[170px] text-[14px]`}
              >
                This platform helped me find my lost phone within hours.
                it&apos;s efficient and user-friendly
              </p>
              <h1 className={`${inter.className} font-semibold`}>
                Concern Citizen
              </h1>
            </span>

            <span className="col-span-1 col-start-4">
              <p className={`font-extralight ${inter.className} w-[170px]`}>
                I found my missing keys with the help of this site. It&apos; a
                great initiative that brings people together.
              </p>
              <h1 className={`${inter.className} font-semibold`}>Happy user</h1>
            </span>

            <span className="col-span-2">
              <p className={`font-extralight ${inter.className} w-[170px]`}>
                Thanks to this service, I was able to retrieve my lost backpack.
                Grateful for the quick response and support.
              </p>
              <h1 className={`${inter.className} font-semibold`}>
                Unknown Stranger
              </h1>
            </span>
            <span className="col-span-2 col-start-3">
              <p className={`font-extralight ${inter.className} w-[170px]`}>
                Thanks to this service, I was able to retrieve my lost toy.
                Grateful for the quick response and support.
              </p>
              <h1 className={`${inter.className} font-semibold`}>
                7 years old individual
              </h1>
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <Link href={"/about"} className="">
          Read more Stories
        </Link>
      </div>
    </section>
  );
}
