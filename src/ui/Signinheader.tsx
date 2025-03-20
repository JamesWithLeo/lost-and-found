"use client";

import Link from "next/link";
import Logo from "./server/Logo";
export default function SigninHeader({ isAuth }: { isAuth: boolean }) {
  return (
    <header
      className={`sticky top-0 z-40 grid h-[var(--header-height)] w-full grid-cols-1 grid-rows-1 items-center justify-between border-b border-b-gray-200 bg-white text-sm`}
    >
      <div className="flex w-full justify-between px-8">
        <Link href={"/discovery"}>
          <Logo />
        </Link>
        {!isAuth && (
          <span className="flex items-center">
            <Link
              href={"signup "}
              className={`rounded-md border border-gray-200 px-2 py-1`}
            >
              Sign Up
            </Link>
          </span>
        )}
      </div>
    </header>
  );
}
