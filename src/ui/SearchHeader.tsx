"use client";
import Link from "next/link";
import NavigationButton from "./client/NavigationButton";
import Logo from "./server/Logo";
const ibm = IBM_Plex_Sans_Thai_Looped({
  weight: ["300", "400"],
  subsets: ["latin"],
});
import { IBM_Plex_Sans_Thai_Looped } from "next/font/google";

export default function SearchHeader({ isAuth }: { isAuth: boolean }) {
  return (
    <header
      className={`sticky top-0 z-40 grid h-[10rem] w-full grid-cols-1 grid-rows-2 items-center justify-between bg-white text-sm`}
    >
      <div className="flex w-full justify-between px-8">
        <Logo />
        <span className="flex items-center gap-8">
          <NavigationButton
            label={isAuth ? "Home" : "Discovery"}
            target={isAuth ? "/" : "discovery"}
          />
          <NavigationButton label="About us" target="/about" />
        </span>
      </div>

      <div className="flex w-full justify-center border-b border-slate-200 pb-4">
        <span className="grid w-full max-w-[1440px] grid-cols-2 px-48">
          <span>
            <h1 className={`${ibm.className} text-nowrap text-4xl font-bold`}>
              Quick Search
            </h1>
            {/* <h1 className={`${ibm.className} `}>
              To find your item, Fill in the form below.
            </h1> */}
          </span>
          <span className="col-start-2 flex items-center justify-end gap-4">
            <h1>Can&apos;t find your item? </h1>
            <Link href={"/my-item/new"} className={"rounded border px-2 py-1"}>
              Post
            </Link>
          </span>
        </span>
      </div>
    </header>
  );
}
