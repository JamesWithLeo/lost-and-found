import Link from "next/link";
import Logo from "./Logo";
export default function SignupHeader() {
  return (
    <header
      className={`sticky top-0 z-40 grid h-[5rem] w-full grid-cols-1 grid-rows-1 items-center justify-between border-b border-b-gray-200 bg-white`}
    >
      <div className="flex w-full justify-between px-8">
        <Link href={"/discovery"}>
          <Logo />
        </Link>
        <span className="flex items-center">
          <Link
            href={"signin"}
            className={`rounded-md border border-gray-200 px-2 py-1`}
          >
            Sign in
          </Link>
        </span>
      </div>
    </header>
  );
}
