"use client";

import { useRouter } from "next/navigation";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <>
      <div className="fixed z-40 min-h-dvh w-full bg-gray-600 opacity-50"></div>
      <button
        onClick={() => router.back()}
        className="fixed right-10 top-10 z-50 cursor-pointer rounded bg-red-500 p-2 text-white"
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
      <section className="-translate-1/2 fixed left-1/2 top-1/2 z-50 h-full max-h-[90%] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white shadow">
        {children}
      </section>
    </>
  );
}
