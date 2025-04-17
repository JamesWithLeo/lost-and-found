"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function FacbookButton() {
  return (
    <button
      className="flex w-full cursor-pointer items-center justify-center gap-4 rounded-sm border bg-white px-4 py-2"
      onClick={() => {
        signIn("facebook", { callbackUrl: "/" });
      }}
    >
      <Image
        src={"/images/facebook-logo.png"}
        alt="facebook-logo"
        width={23}
        height={23}
      />
      Continue with Facebook
    </button>
  );
}
