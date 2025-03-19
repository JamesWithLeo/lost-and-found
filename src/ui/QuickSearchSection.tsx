import { Anonymous_Pro } from "next/font/google";
import Link from "next/link";

const anony = Anonymous_Pro({ weight: ["400", "700"], subsets: ["latin"] });
export default function QuickSearchSection() {
  return (
    <section className="flex w-full flex-col gap-2">
      <div className="flex w-full items-center justify-center gap-4">
        <Link
          className="grid w-max grid-cols-[0.2fr_2fr_0.1fr_1fr] items-center justify-items-center gap-2 rounded-full border bg-white px-4 py-2 align-middle"
          href={"/?q=true"}
        >
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
          <input
            className={`rounded-sm px-2 outline-0 ${anony.className}`}
            placeholder="Item name"
          />
          <div className="h-full border-r border-gray-200"></div>
          <button className="text-primary rounded px-2 text-sm">
            Quick Search
          </button>
        </Link>
        <Link
          href={"/?new=true"}
          className="bg-primary h-full rounded-full px-4 py-2 text-white"
        >
          Report item
        </Link>
      </div>
    </section>
  );
}
