"use client";

import { useRouter } from "next/navigation";

export default function SearchExitModalButton() {
  const route = useRouter();
  return (
    <button
      className="cursor-pointer rounded bg-white p-2"
      onClick={() => route.back()}
    >
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
        className="lucide lucide-x"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </button>
  );
}
