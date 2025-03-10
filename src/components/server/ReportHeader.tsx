const ibm = IBM_Plex_Sans_Thai_Looped({
  weight: ["300", "400"],
  subsets: ["latin"],
});
import { IBM_Plex_Sans_Thai_Looped } from "next/font/google";
import NavigationButton from "@/components/client/NavigationButton";
import Link from "next/link";
import Logo from "./Logo";
export default function ReportHeader({ isAuth }: { isAuth: boolean }) {
  return (
    <>
      <header
        className={`sticky top-0 z-40 grid h-[10rem] w-full grid-cols-1 grid-rows-2 items-center justify-between bg-white`}
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
              <h1 className={`${ibm.className} text-4xl font-bold`}>
                Report found items
              </h1>
              <h1 className={`${ibm.className} `}>
                Let&apos;s help you return items to rightful owner!
              </h1>
            </span>
            <span className="col-start-2 flex items-end justify-end gap-4">
              <Link
                href="/my-item"
                className={
                  "flex gap-2 rounded border border-gray-200 bg-slate-50 px-3 py-1"
                }
              >
                <h1>Lost something? Search for it instead.</h1>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
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
