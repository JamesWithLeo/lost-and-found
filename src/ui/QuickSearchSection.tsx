import { Anonymous_Pro } from "next/font/google";
import Link from "next/link";

const anony = Anonymous_Pro({ weight: ["400", "700"], subsets: ["latin"] });
export default function QuickSearchSection() {
  return (
    <section className="flex w-full flex-col gap-2">
      <div className="flex w-full flex-col items-center">
        <Link
          className="grid w-max grid-cols-[2fr_1fr_1fr] gap-2 rounded-full border bg-white px-4 py-2"
          href={"/"}
        >
          <input
            className={`rounded-sm px-2 ${anony.className}`}
            placeholder="Item name"
          />
          <div className="h-full border-r border-gray-200"></div>
          <button className="text-primary rounded px-2 text-sm">
            Quick Search
          </button>
        </Link>
      </div>
    </section>
  );
}
