"use client";
import { Inter } from "next/font/google";
const inter = Inter({ weight: ["400", "500", "600"], subsets: ["latin"] });
export default function BackToTop() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <button
        onClick={scrollToTop}
        className={`row-start-2 flex cursor-pointer flex-col items-center justify-center rounded-full bg-white text-[14px] font-extralight ${inter.className}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-chevron-up"
        >
          <path d="m18 15-6-6-6 6" />
        </svg>
        Back to top
      </button>
    </>
  );
}
