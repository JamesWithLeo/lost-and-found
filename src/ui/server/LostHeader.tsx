import Link from "next/link";
const ibm = IBM_Plex_Sans_Thai_Looped({
  weight: ["300", "400"],
  subsets: ["latin"],
});
import { IBM_Plex_Sans_Thai_Looped } from "next/font/google";
import NavigationButton from "../NavigationButton";
import Logo from "./Logo";
export default function LostHeader({ isAuth }: { isAuth: boolean }) {
  return (
    <>
      <header
        className={`sticky top-0 z-40 grid h-[var(--header-height-10)] w-full grid-cols-1 grid-rows-2 items-center justify-between bg-white text-sm`}
      >
        <div className="flex w-full justify-between px-8">
          <Logo />
          <span className="flex items-center gap-8">
            <NavigationButton
              label={isAuth ? "Home" : "Discovery"}
              target={isAuth ? "/" : "/discovery"}
            />
            <NavigationButton label="About us" target="/about" />
          </span>
        </div>

        <div className="flex w-full justify-center border-b border-slate-200 pb-4">
          <span className="flex w-full max-w-[1440px] flex-col flex-wrap px-[1.5rem] sm:px-8 md:px-48 lg:flex-row lg:justify-between">
            <span className="">
              <h1
                className={`${ibm.className} text-nowrap text-xl font-bold md:text-3xl`}
              >
                Let&apos;s locate your lost items!
              </h1>
              <h1 className={`${ibm.className} `}>
                To find your item, Fill in the form below.
              </h1>
            </span>
            <span className="col-start-2 row-start-2 flex w-full items-end justify-end gap-4">
              <Link
                href="/found-item/new"
                className={
                  "flex gap-2 rounded border border-gray-200 bg-slate-50 px-3 py-1 text-xs sm:text-sm"
                }
              >
                <h1 className="">Found something? Report it instead</h1>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-right-left"
                >
                  <path d="m16 3 4 4-4 4" />
                  <path d="M20 7H4" />
                  <path d="m8 21-4-4 4-4" />
                  <path d="M4 17h16" />
                </svg>
              </Link>
            </span>
          </span>
        </div>
      </header>
    </>
  );
}
