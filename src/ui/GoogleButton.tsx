"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function GoogleButton() {
  return (
    <button
      className="flex w-full cursor-pointer items-center justify-center gap-4 rounded-sm border bg-white px-4 py-2"
      onClick={() => signIn("google", { callbackUrl: "/" })}
    >
      <Image
        src={"/images/google-logo.png"}
        alt="google-logo"
        width={23}
        height={23}
      />
      Continue with google
    </button>
  );
}
