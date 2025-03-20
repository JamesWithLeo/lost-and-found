"use client";

import { useRouter } from "next/navigation";

export default function ChevBack() {
  const router = useRouter();
  return (
    <button className="cursor-pointer" onClick={() => router.back()}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-chevron-left"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
    </button>
  );
}
