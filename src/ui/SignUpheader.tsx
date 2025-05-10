"use client";

import Link from "next/link";
import Logo from "./server/Logo";
import { signOut } from "next-auth/react";
export default function SignupHeader({ isAuth }: { isAuth: boolean }) {
  return (
    <header
      className={`sticky top-0 z-40 grid h-[var(--header-height)] w-full grid-cols-1 grid-rows-1 items-center justify-between border-b border-b-gray-200 bg-white text-sm`}
    >
      <div className="flex w-full justify-between px-8">
        <Link href={isAuth ? "/" : "/discovery"}>
          <Logo />
        </Link>
        {!isAuth ? (
          <span className="flex items-center">
            <Link
              href={"signin"}
              className={`rounded-md border border-gray-200 px-2 py-1`}
            >
              Sign in
            </Link>
          </span>
        ) : (
          <span className="flex items-center">
            <button
              className="h-max cursor-pointer rounded bg-red-400 px-2 py-1 text-sm text-white"
              onClick={() => {
                signOut();
              }}
            >
              Logout
            </button>
          </span>
        )}
      </div>
    </header>
  );
}
