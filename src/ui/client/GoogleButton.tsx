"use client";
import { signIn } from "next-auth/react";

export default function GoogleButton() {
  return (
    <button
      className="w-full cursor-pointer rounded-xl bg-gray-200 py-2"
      onClick={() => signIn("google", { callbackUrl: "/" })}
    >
      Continue with google
    </button>
  );
}
