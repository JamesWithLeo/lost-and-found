import Modal from "@/ui/Modal";
import { Inter_Tight } from "next/font/google";

const inter = Inter_Tight({
  weight: ["100", "200", "300", "400", "500", "600"],
  style: ["italic", "normal"],
  subsets: ["latin"],
});
export default function Page() {
  return (
    <Modal>
      <div className="grid h-full grid-cols-1 grid-rows-[.5fr_10fr] pt-6">
        <div className="w-full px-8 py-2">
          <h1 className="text-primary text-2xl font-bold">File Ownership</h1>
        </div>
        <div className="row-start-2 flex h-full w-full max-w-lg flex-col items-center gap-4 rounded-2xl border-t bg-slate-50 px-8 py-4">
          <span className="w-full">
            <h1 className={`${inter.className} text-sm font-light`}>
              Caption:
            </h1>
            <input
              className={`w-max rounded border bg-white text-center text-xl ${inter.className} italic`}
              placeholder='""Its mine""'
            />
          </span>

          <span className="w-full">
            <h1 className={`${inter.className} text-sm font-light`}>Body:</h1>
            <textarea
              className={`h-full ${inter.className} max-h-40 w-full max-w-xl resize-none rounded border bg-white p-2`}
              rows={5}
            />
          </span>

          <span className="flex w-[430px] flex-col items-center border-y py-8">
            <button className="flex cursor-pointer items-center gap-2 rounded bg-gray-200 px-2 py-1 text-sm text-gray-800">
              Attach proof
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-image"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
            </button>
          </span>

          <span className="flex flex-col gap-2">
            <span className="flex w-[430px] gap-2 pt-4">
              <input className={`border bg-white`} type="checkbox" />
              <h1 className={`text-xs font-light ${inter.className} `}>
                I have read and agree to the Terms & Condition
              </h1>
            </span>
            <h1 className={`w-[430px] ${inter.className} text-xs font-light`}>
              By submitting this form, you acknowledge and agree to our Lost &
              Found Policy. You confirm that the information provided is
              accurate, and you accept any verification process required to
              claim ownership.
            </h1>
          </span>

          <div className="flex w-full cursor-pointer flex-col items-end">
            <button className="bg-primary rounded px-4 py-1 text-white shadow">
              Submit ownership
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
