"use client";

import { useRouter } from "next/navigation";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <>
      <div className="fixed z-40 flex h-full w-full flex-col bg-gray-600 opacity-50 md:min-h-dvh"></div>
      <div className="fixed z-50 grid h-full grid-rows-[min-content_1fr] flex-row-reverse gap-4 md:max-w-[1440px] md:grid-cols-[1fr_min_content] md:grid-rows-1 md:p-8 md:py-8 md:pr-4">
        <div className="right-10 top-10 z-50 flex flex-col items-end md:col-start-2 md:row-start-1">
          <button
            onClick={() => router.back()}
            className="cursor-pointer rounded p-2 text-red-400"
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
        </div>
        <section className="h-full w-full overflow-y-auto bg-white md:col-start-1 md:rounded">
          {children}
        </section>
      </div>
    </>
  );
}
