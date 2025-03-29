import { Anonymous_Pro } from "next/font/google";
import Link from "next/link";

const anony = Anonymous_Pro({ weight: ["400", "700"], subsets: ["latin"] });
export default function QuickSearchSection() {
  return (
    <section className="flex w-max flex-col sm:w-full md:gap-2">
      <div className="flex w-full flex-col items-center justify-center gap-2 sm:flex-row md:gap-4">
        <Link
          className="flex w-max grid-cols-[0.2fr_2fr_0.8fr] items-center justify-items-center gap-2 rounded-full border bg-white px-2 py-1 align-middle sm:grid-cols-[0.2fr_2fr_1fr] sm:px-4 sm:py-2"
          href={"/?q=true"}
        >
          <h1 className="hidden sm:inline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-search-check text-gray-400"
            >
              <path d="m8 11 2 2 4-4" />
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </h1>
          <input
            className={`grow border-r px-2 outline-0 md:w-auto ${anony.className}`}
            placeholder="Item name"
          />
          <button className="text-primary rounded text-sm md:px-2 md:text-[16px]">
            Quick Search
          </button>
        </Link>
        <Link
          href={"/?new=true"}
          className="bg-primary h-full w-full rounded-full px-4 py-2 text-center text-sm text-white sm:w-max md:text-[16px]"
        >
          Report item
        </Link>
      </div>
    </section>
  );
}
