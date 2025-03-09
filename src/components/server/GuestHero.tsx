import { Inconsolata, Istok_Web } from "next/font/google";
import Link from "next/link";

const inconsolata = Inconsolata({ weight: "900", subsets: ["latin"] });
const istokWeb = Istok_Web({ weight: "400", subsets: ["latin"] });

export default function GuestHero() {
  return (
    <section className="flex h-dvh w-full flex-col items-center justify-center bg-gradient-to-r from-[#92B079] to-white">
      <section className="grid h-[80%] w-[85%] grid-cols-1 grid-rows-2 bg-white">
        <div className="mt-20 flex w-full flex-col items-end">
          <div className="flex flex-col items-start gap-4">
            <p
              className={`text-[14px] ${istokWeb.className} h-[69px] w-[334px]`}
            >
              Welcome to our online lost and found platform, connecting people
              who have lost items with those who have found them.
            </p>
            <Link
              href={"/?new=true"}
              scroll={false}
              className="rounded-full border px-4 py-2 text-[14px]"
            >
              Search
            </Link>
          </div>
        </div>
        <div className="flex h-full w-full items-end justify-center">
          <h1
            className={`${inconsolata.className} bg-gradient-to-bl from-black via-[#7C6AD5] to-black bg-clip-text text-[9rem] font-black text-transparent`}
          >
            Lost & Found
          </h1>
        </div>
      </section>
    </section>
  );
}
