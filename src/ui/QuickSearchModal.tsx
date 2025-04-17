"use client";
import { quickSearchItems } from "@/actions/itemActions";
import { Anonymous_Pro } from "next/font/google";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

const anony = Anonymous_Pro({ weight: ["400", "700"], subsets: ["latin"] });

export default function QuickSearchModal() {
  const router = useRouter();
  return (
    <>
      <div
        onClick={() => router.back()}
        className="fixed h-full w-full cursor-pointer bg-slate-500 opacity-60"
      ></div>
      <div className="-translate-1/2 fixed left-1/2 top-1/2 z-10 w-full max-w-xl">
        <Form className="flex w-full flex-col gap-3" action={quickSearchItems}>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => router.back()}
              className="cursor-pointer rounded bg-white p-2"
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

          <div className="flex w-full flex-col gap-2 rounded bg-white px-2 py-3 shadow-2xl">
            <span
              className={`${anony.className} grid grid-cols-[5rem_1rem_1fr_1rem_4rem] items-center gap-2 rounded border px-4 py-2 text-gray-400`}
            >
              <h1 className="w-max text-center">Item name </h1>
              <div className="h-full w-2 border-r"></div>
              <input
                autoFocus
                className={`w-full outline-0 ${anony.className} text-gray-900`}
                name="itemName"
                required
              />
              <div className="h-full w-2 border-r"></div>
              <h1>required</h1>
            </span>
            <span
              className={`${anony.className} grid grid-cols-[5rem_1rem_1fr_1rem_4rem] items-center gap-2 rounded border px-4 py-2 text-gray-400`}
            >
              <h1 className="w-max text-center">Category</h1>
              <div className="h-full w-2 border-r"></div>
              <select
                name="category"
                required
                className={`w-full text-gray-900 focus:outline-0 ${anony.className}`}
              >
                <option value=""></option>
                <option value="animals">Animals</option>
                <option value="accessory">Accessory</option>
                <option value="clothing">Clothing</option>
                <option value="bags & wallet">Bags & Wallet</option>
                <option value="documents">Documents</option>
                <option value="electronics">Electronics</option>
                <option value="food & beverages">Food & Beverages</option>
                <option value="pets & person">Pets & Person</option>
                <option value="miscellaneous">Miscellaneous</option>
                <option value={"furniture"}>furniture</option>
                <option value={"toys & games"}>toys & games</option>
                <option value={"health & beauty"}>health & beauty</option>
                <option value={"sports & outdoors"}>sports & outdoors</option>
                <option value={"tools & equipment"}>tools & equipment</option>
                <option value={"jewelry"}>jewelry</option>
                <option value={"art & collectibles"}>art & collectibles</option>
              </select>
              <div className="h-full w-2 border-r"></div>
              <h1>required</h1>
            </span>

            <span
              className={`${anony.className} grid grid-cols-[5rem_1rem_1fr] items-center gap-2 rounded border px-4 py-2 text-gray-400`}
            >
              <h1 className="w-max text-center">Location</h1>
              <div className="h-full w-2 border-r"></div>
              <input
                className={`w-full outline-0 ${anony.className} text-gray-900`}
                placeholder="Morong, Rizal"
                name="location"
              />
            </span>
            <span
              className={`${anony.className} grid grid-cols-[5rem_1rem_1fr] items-center gap-2 rounded border px-4 py-2 text-gray-400`}
            >
              <h1 className="w-max text-center">Color</h1>
              <div className="h-full w-2 border-r"></div>
              <input
                className={`w-full outline-0 ${anony.className} text-gray-900`}
                placeholder="Blue"
                name="color"
              />
            </span>
            <span
              className={`${anony.className} grid grid-cols-[6rem_1rem_1fr] items-center gap-2 rounded border px-4 py-2 text-gray-400`}
            >
              <h1 className="w-max text-center">Time & Date</h1>
              <div className="h-full w-2 border-r"></div>
              <input
                className={`w-full outline-0 ${anony.className} text-gray-900`}
                type="datetime-local"
                name="timeDate"
              />
            </span>
            <QuickSearch />
          </div>
        </Form>
      </div>
    </>
  );
}

function QuickSearch() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-primary flex cursor-pointer items-center justify-center gap-4 rounded p-2 text-white shadow-2xl"
    >
      {pending ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-loader-circle animate-spin"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-search"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      )}
      Quick Search
    </button>
  );
}
