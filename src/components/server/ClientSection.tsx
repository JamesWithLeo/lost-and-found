import { IBM_Plex_Sans_Thai_Looped, Inter_Tight } from "next/font/google";
import Link from "next/link";
const ibm = IBM_Plex_Sans_Thai_Looped({ weight: ["700"] });
const inter = Inter_Tight({
  weight: ["300", "400", "600"],
  style: "italic",
  subsets: ["latin"],
});
export default function ClientStory() {
  return (
    <main className="w-full px-20">
      <h1 className={`${ibm.className} text-[3.75rem] font-bold`}>
        Client Stories
      </h1>
      <p className={`font-extralight italic ${inter.className} w-[440px]`}>
        I lost my wallet and thanks to this platform, it was returned to me by a
        kind stanger. Truly a lifesaver!
      </p>

      <div className="grid grid-cols-2">
        <span>
          <p
            className={`font-extralight ${inter.className} w-[170px] text-[14px]`}
          >
            This platform helped me find my lost phone within hours. it&apos;s
            efficient and user-friendly
          </p>
          <h1 className={`${inter.className} font-semibold`}>
            Concern Citizen
          </h1>
        </span>

        <span>
          <p className={`font-extralight ${inter.className} w-[440px]`}>
            I found my missing keys with the help of this site. It&apos; a great
            initiative that brings people together.
          </p>
          <h1 className={`${inter.className} font-semibold`}>Happy user</h1>
        </span>

        <span>
          <p className={`font-extralight ${inter.className} w-[440px]`}>
            Thanks to this service, I was able to retrieve my lost backpack.
            Grateful for the quick response and support.
          </p>
          <h1 className={`${inter.className} font-semibold`}>
            Unknown Stranger
          </h1>
        </span>
        <span>
          <p className={`font-extralight ${inter.className} w-[440px]`}>
            Thanks to this service, I was able to retrieve my lost toy. Grateful
            for the quick response and support.
          </p>
          <h1 className={`${inter.className} font-semibold`}>
            7 years old individual
          </h1>
        </span>
        <Link href={"/about"}>Read more Stories</Link>
      </div>
    </main>
  );
}
