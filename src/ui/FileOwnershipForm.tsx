"use client";

import { Anonymous_Pro, Inria_Sans, Inter_Tight } from "next/font/google";
import { formatDistanceToNowStrict } from "date-fns";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormSchema, ownershipSchema } from "@/lib/ownershipActionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { InferSelectModel } from "drizzle-orm";
import { items } from "@/db/schema";
import { useRef, useState } from "react";
import { postFileOwnership } from "@/actions/ownershipActions";

const inria = Inria_Sans({ weight: ["300", "400", "700"], subsets: ["latin"] });
const anony = Anonymous_Pro({ weight: ["400", "700"], subsets: ["latin"] });
const inter = Inter_Tight({
  weight: ["100", "200", "300", "400", "500", "600"],
  style: ["italic", "normal"],
  subsets: ["latin"],
});

export default function FileOwnershipForm({
  item,
  samaritan,
  user,
}: {
  item: InferSelectModel<typeof items>;
  samaritan: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
  };
  user: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
  };
}) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ownershipSchema),
  });
  const [isCertain, setIsCertain] = useState<boolean>(false);
  const [proofUrls, setProofUrls] = useState<string[]>(["", "", ""]);

  const fileInputRefs = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (file: File) => {
    const url = URL.createObjectURL(file);

    setProofUrls((prev) => {
      const updated = [...prev];
      const emptyIndex = updated.findIndex((val) => val === "");
      if (emptyIndex !== -1) {
        updated[emptyIndex] = url;
      }
      return updated;
    });
  };

  const onSubmitForm: SubmitHandler<FormSchema> = async (data) => {
    const formData = new FormData();
    formData.append("caption", data.caption);
    formData.append("desc", data.desc);
    formData.append("distinctFeature", data.distinctFeature);

    await postFileOwnership(formData, user.id, item.id, proofUrls);
  };
  return (
    <form
      className="flex h-max w-full flex-col items-center gap-4 rounded-b-2xl bg-slate-50 p-4 sm:p-8"
      onSubmit={handleSubmit(onSubmitForm)}
    >
      <div className="flex h-full w-full flex-col gap-4 border bg-white p-2 sm:p-4">
        <h1 className={`font-bold ${inria.className}`}>Item summary</h1>
        <span className={`${anony.className} sm:pl-4`}>
          <span className="grid grid-cols-[.1fr_.5fr_1fr] items-center gap-2 text-sm text-gray-500">
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

          <span className="grid grid-cols-[.1fr_.5fr_1fr] items-center gap-2 text-sm text-gray-500">
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
              {item?.createdAt
                ? `${formatDistanceToNowStrict(new Date(item.createdAt))} ago`
                : `--`}
            </h1>
          </span>

          <span className="grid grid-cols-[.1fr_.5fr_1fr] items-center gap-2 text-sm text-gray-500">
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

          <span className="grid grid-cols-[.1fr_.5fr_1fr] items-center gap-2 text-sm text-gray-500">
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

          <span className="grid grid-cols-[.1fr_.5fr_1fr] items-center gap-2 text-sm text-gray-500">
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
          {item.itemProof && (
            <>
              {item.itemProof.map((proof) => (
                <div
                  className="h-16 w-16 bg-gray-200"
                  key={`itemProof-${item.id}`}
                >
                  <Image
                    src={proof}
                    width={100}
                    height={100}
                    alt={`itemProof-${item.id}`}
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      <div className="flex h-full w-full flex-col gap-4 p-2">
        <h1 className={`font-bold ${inria.className}`}>Personal Information</h1>
        <span className="w-full">
          <span className="flex justify-between">
            <h1 className={`${inter.className} text-sm font-light`}>
              Full name:
            </h1>
            <h1 className="cursor-pointer text-xs text-gray-400 hover:text-blue-300 hover:underline">
              Edit on profile
            </h1>
          </span>
          <input
            disabled={!!`${user.firstName} ${user.lastName}`.trim()}
            className={`w-full rounded border bg-white px-2 py-1 text-sm ${inria.className} `}
            value={`${user.firstName}  ${user.lastName}`}
          />
        </span>
        <span className="w-full">
          <h1 className={`${inter.className} text-sm font-light`}>Email:</h1>
          <input
            disabled={!!user.email}
            className={`w-full rounded border bg-white px-2 py-1 text-sm ${inria.className}`}
            defaultValue={user.email ?? undefined}
          />
        </span>

        <div className="flex w-full flex-col gap-4 sm:flex-row">
          <span className="w-full">
            <span className="flex justify-between">
              <h1 className={`${inter.className} text-sm font-light`}>
                Phone number:
              </h1>
              <h1 className="cursor-pointer text-xs text-gray-400 hover:text-blue-300 hover:underline">
                Edit on profile
              </h1>
            </span>
            <input
              required
              className={`w-full rounded border bg-white px-2 py-1 text-sm ${inria.className} `}
            />
          </span>

          <span className="w-full">
            <span className="flex justify-between">
              <h1 className={`${inter.className} text-sm font-light`}>
                Address:
              </h1>
              <h1 className="cursor-pointer text-xs text-gray-400 hover:text-blue-300 hover:underline">
                Edit on profile
              </h1>
            </span>
            <input
              required
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
          <h1 className={`${inter.className} text-sm font-light`}>Caption</h1>
          <input
            className={`w-max rounded border bg-white text-center text-xl ${inria.className}`}
            placeholder='""Its mine""'
            {...register("caption")}
          />
          {errors.caption?.message && (
            <label className="flex text-right text-xs text-red-400">
              {errors.caption.message}
            </label>
          )}
        </span>
        <span className="w-full">
          <h1 className={`${inter.className} text-sm font-light`}>
            Distinct features (e.g.: Black case, scratch on the top right corner
            or serial number)
          </h1>
          <textarea
            {...register("distinctFeature")}
            className={`h-full ${inria.className} max-h-40 w-full resize-none rounded border bg-white p-2`}
            rows={2}
          />
          {errors.distinctFeature?.message && (
            <label className="flex text-right text-xs text-red-400">
              {errors.distinctFeature.message}
            </label>
          )}
        </span>

        <span className="w-full">
          <h1 className={`${inter.className} text-sm font-light`}>
            Describe how you lost the item
          </h1>
          <textarea
            className={`h-full ${inria.className} max-h-40 w-full resize-none rounded border bg-white p-2`}
            {...register("desc")}
            rows={2}
          />
        </span>

        <div className="flex w-full flex-col items-center">
          <span className="flex w-full max-w-[430px] flex-col items-center border-y py-8">
            <span className="flex w-full justify-between">
              <h1
                className={`${inter.className} grows text-left text-sm font-light`}
              >
                Attach proof
              </h1>
              {/* {errors.proof?.message && (
                <label className="flex text-right text-xs text-red-400">
                  {errors.proof.message.toString()}
                </label>
            )} */}
            </span>

            <div className="grid w-full grid-cols-3 grid-rows-1 gap-4 sm:grid">
              <input
                type="file"
                hidden
                accept="image/*"
                multiple
                ref={fileInputRefs}
                onChange={(e) => {
                  console.log("new files", e.target.files);
                  const file = e.target.files?.[0];
                  if (file) handleFileChange(file);
                  e.target.value = "";
                }}
              />
              {Array.isArray(proofUrls) &&
                proofUrls.map((url, index) => (
                  <span
                    key={`proof-${index}`}
                    className="flex h-24 flex-col items-center sm:h-28"
                  >
                    {url.trim() ? (
                      <>
                        <div className="relative h-full w-full">
                          <Image
                            className="h-full w-full rounded border p-2"
                            src={url}
                            width={100}
                            height={100}
                            alt={`image-${index}`}
                          />
                          <button
                            className="absolute right-1 top-1 cursor-pointer rounded-full bg-gray-400 p-1 text-white hover:bg-gray-500"
                            type="button"
                            onClick={() => {
                              setProofUrls((prev) => [
                                ...prev.filter((p) => p !== proofUrls[index]),
                                "",
                              ]);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg "
                              width="12"
                              height="12"
                              fill="currentColor"
                              viewBox="0 0 256 256"
                            >
                              <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
                            </svg>
                          </button>
                        </div>
                      </>
                    ) : (
                      <button
                        className="text-md flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded border p-4 text-gray-400"
                        type="button"
                        onClick={() => {
                          fileInputRefs.current?.click();
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="36"
                          height="36"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.05"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-image-up-icon lucide-image-up"
                        >
                          <path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21" />
                          <path d="m14 19.5 3-3 3 3" />
                          <path d="M17 22v-5.5" />
                          <circle cx="9" cy="9" r="2" />
                        </svg>
                      </button>
                    )}
                  </span>
                ))}
            </div>
          </span>
        </div>

        <span className="flex w-full flex-col items-center gap-2">
          <span className="flex flex-none items-center gap-2 pt-4">
            <input
              className={`border bg-white`}
              type="checkbox"
              id="isAccurate"
              onChange={(e) => {
                setIsCertain(e.currentTarget.checked);
              }}
            />
            <label
              htmlFor="isAccurate"
              className={`text-center text-xs font-light ${inter.className} `}
            >
              I certify that the information provided is accurate, and I am the
              rightful owner of this item
            </label>
          </span>
          <h1
            className={`max-w-[430px] text-center ${inter.className} text-xs font-light`}
          >
            By submitting this form, you acknowledge and agree to our Lost &
            Found Policy. You confirm that the information provided is accurate,
            and you accept any verification process required to claim ownership.
          </h1>
        </span>
        <div className="flex w-full cursor-pointer flex-col items-end">
          <SubmitOwnershipButton disabled={isCertain} />
        </div>
      </div>
    </form>
  );
}
function SubmitOwnershipButton({ disabled }: { disabled: boolean }) {
  return (
    <button
      className={`${!disabled ? "bg-blue-200" : "bg-primary"} cursor-pointer rounded px-4 py-1 text-white shadow`}
      type="submit"
      disabled={!disabled}
    >
      Submit ownership
    </button>
  );
}
