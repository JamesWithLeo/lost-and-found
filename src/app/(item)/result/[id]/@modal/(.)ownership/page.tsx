import { authOptions } from "@/authOptions";
import { getFoundItem, getUserSafe } from "@/db/drizzle";
import Modal from "@/ui/Modal";
import { formatDistanceToNowStrict } from "date-fns";
import { getServerSession } from "next-auth";
import { Anonymous_Pro, Inria_Sans, Inter_Tight } from "next/font/google";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const inria = Inria_Sans({ weight: ["300", "400", "700"], subsets: ["latin"] });
const anony = Anonymous_Pro({ weight: ["400", "700"], subsets: ["latin"] });
const inter = Inter_Tight({
  weight: ["100", "200", "300", "400", "500", "600"],
  style: ["italic", "normal"],
  subsets: ["latin"],
});
export default async function Page() {
  const targetId = (await cookies()).get("targetItemId")?.value;
  const session = await getServerSession(authOptions);
  if (!targetId || !session) {
    redirect("/found-item/"); // todo : add 404
  }
  const { data: item } = await getFoundItem(targetId);
  const samaritan = await getUserSafe(item?.userId);
  const user = await getUserSafe(session?.user.id);
  if (!item || !samaritan || !user) {
    redirect("/found-item/"); // todo :add 404
  }
  return (
    <Modal>
      <div className="grid h-full w-full grid-cols-1 grid-rows-[1fr_10fr] rounded-r-2xl pb-8">
        <div className="sticky top-0 flex h-[5rem] w-full items-center border-b px-8 py-2 backdrop-blur-lg">
          <h1 className="text-primary text-2xl font-bold">File Ownership</h1>
        </div>
        <section className="flex h-max w-full flex-col items-center gap-4 rounded-b-2xl bg-slate-50 p-8">
          <div className="flex h-full w-full flex-col gap-4 border bg-white p-4 shadow">
            <h1 className={`font-bold ${inria.className}`}>Item summary</h1>
            <span className={`${anony.className} pl-4`}>
              <span className="grid grid-cols-[.1fr_.5fr_1fr] items-center gap-2 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M216,64H56a8,8,0,0,1,0-16H192a8,8,0,0,0,0-16H56A24,24,0,0,0,32,56V184a24,24,0,0,0,24,24H216a16,16,0,0,0,16-16V80A16,16,0,0,0,216,64Zm-36,80a12,12,0,1,1,12-12A12,12,0,0,1,180,144Z"></path>
                </svg>
                Item found:
                <h1 className="text-gray-700">{item?.itemName}</h1>
              </span>

              <span className="grid grid-cols-[.1fr_.5fr_1fr] items-center gap-2 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,48H48V48H72v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24Z"></path>
                </svg>
                Report date:{" "}
                <h1 className="text-gray-700">
                  {item.createdAt
                    ? `${formatDistanceToNowStrict(new Date(item.createdAt))} ago`
                    : `--`}
                </h1>
              </span>

              <span className="grid grid-cols-[.1fr_.5fr_1fr] items-center gap-2 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M256,120a8,8,0,0,1-8,8H8a8,8,0,0,1,0-16H35.92l47.5-65.41a16,16,0,0,1,25.31-.72l12.85,14.9.2.23a7.95,7.95,0,0,0,12.44,0l.2-.23,12.85-14.9a16,16,0,0,1,25.31.72L220.08,112H248A8,8,0,0,1,256,120Zm-76,24a36,36,0,0,0-35.77,32H111.77a36,36,0,1,0-1.83,16h36.12A36,36,0,1,0,180,144Z"></path>
                </svg>
                Found by:
                <h1 className="text-gray-700">
                  {samaritan.firstName} {samaritan.lastName}
                </h1>
              </span>

              <span className="grid grid-cols-[.1fr_.5fr_1fr] items-center gap-2 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M136,127.42V232a8,8,0,0,1-16,0V127.42a56,56,0,1,1,16,0Z"></path>
                </svg>
                on:
                <h1 className="text-gray-700">{item.location}</h1>
              </span>

              <span className="grid grid-cols-[.1fr_.5fr_1fr] items-center gap-2 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm56,112H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48a8,8,0,0,1,0,16Z"></path>
                </svg>
                at:
                <h1 className="text-gray-700">
                  {item.timeDate && new Date(item.timeDate).toLocaleString()}
                </h1>
              </span>
            </span>
            <div className="flex gap-4 pl-4">
              <div className="h-16 w-16 bg-gray-200"></div>
              <div className="h-16 w-16 bg-gray-200"></div>
              <div className="h-16 w-16 bg-gray-200"></div>
            </div>
          </div>

          <div className="flex h-full w-full flex-col gap-4 p-2">
            <h1 className={`font-bold ${inria.className}`}>
              Personal Information
            </h1>
            <span className="w-full">
              <h1 className={`${inter.className} text-sm font-light`}>
                Full name:
              </h1>
              <input
                disabled
                className={`w-full rounded border bg-white px-2 py-1 text-sm ${inria.className} `}
                value={`${user.firstName}  ${user.lastName}`}
              />
            </span>
            <span className="w-full">
              <h1 className={`${inter.className} text-sm font-light`}>
                Email:
              </h1>
              <input
                disabled={!!user.email}
                className={`w-full rounded border bg-white px-2 py-1 text-sm ${inria.className}`}
                defaultValue={user.email ?? undefined}
              />
            </span>

            <div className="flex w-full gap-4">
              <span className="w-full">
                <h1 className={`${inter.className} text-sm font-light`}>
                  Phone number:
                </h1>
                <input
                  className={`w-full rounded border bg-white px-2 py-1 text-sm ${inria.className} `}
                />
              </span>

              <span className="w-full">
                <h1 className={`${inter.className} text-sm font-light`}>
                  Address:
                </h1>
                <input
                  className={`w-full rounded border bg-white px-2 py-1 text-sm ${inria.className}`}
                />
              </span>
            </div>
          </div>

          <div className="flex h-max w-full flex-col gap-4 p-2">
            <h1 className={`font-bold ${inria.className}`}>
              Statement of ownership
            </h1>
            <span className="w-full">
              <h1 className={`${inter.className} text-sm font-light`}>
                Caption
              </h1>
              <input
                className={`w-max rounded border bg-white text-center text-xl ${inria.className}`}
                placeholder='""Its mine""'
              />
            </span>
            <span className="w-full">
              <h1 className={`${inter.className} text-sm font-light`}>
                Distict features (e.g.: Black case, scratch on the top right
                corner or serial number)
              </h1>
              <textarea
                className={`h-full ${inria.className} max-h-40 w-full resize-none rounded border bg-white p-2`}
                rows={2}
              />
            </span>

            <span className="w-full">
              <h1 className={`${inter.className} text-sm font-light`}>
                Describe how you lost the item
              </h1>
              <textarea
                className={`h-full ${inria.className} max-h-40 w-full resize-none rounded border bg-white p-2`}
                rows={2}
              />
            </span>

            <div className="flex w-full flex-col items-center">
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
            </div>

            <span className="flex w-full flex-col items-center gap-2">
              <span className="flex w-[489] items-center gap-2 pt-4">
                <input className={`border bg-white`} type="checkbox" />
                <h1 className={`text-xs font-light ${inter.className} `}>
                  I certify that the information provided is accurate, and I am
                  the rightful owner of this item
                </h1>
              </span>
              <h1
                className={`w-[430px] text-center ${inter.className} text-xs font-light`}
              >
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
        </section>
      </div>
    </Modal>
  );
}
