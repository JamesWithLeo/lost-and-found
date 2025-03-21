"use client";

// import { CldImage, CldUploadWidget } from "next-cloudinary";
import { FormSchema, postSearchSchema } from "@/lib/ItemActionSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Anonymous_Pro } from "next/font/google";
import ItemFormButton from "@/ui/ItemFormButton";
import { postSearchItems } from "@/actions/itemActions";
// import { useState } from "react";
const anony = Anonymous_Pro({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function ItemForm({
  id,
  value,
}: {
  id: string | undefined;
  value: {
    itemName: string | undefined;
    brandModel: string | undefined;
    location: string | undefined;
    timeDate: string | undefined;
    color: string | undefined;
    category: string | undefined;
    desc: string | undefined;
    caption: string | undefined;
  };
}) {
  const {
    itemName,
    brandModel,
    location,
    timeDate,
    color,
    caption,
    category,
    desc,
  } = value;
  // const [imageUrl, setImageUrl] = useState<string[]>([]); // Store uploaded image URL

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<FormSchema>({ resolver: zodResolver(postSearchSchema) });
  const onSubmitForm: SubmitHandler<FormSchema> = async (data) => {
    const formData = new FormData();
    formData.append("itemName", data.itemName);
    formData.append("brandModel", data.brandModel!);
    formData.append("caption", data.caption);
    formData.append("category", data.category);
    formData.append("desc", data.desc!);
    formData.append("location", data.location);
    formData.append("timeDate", data.timeDate.toString());
    // formData.append("itemProof", JSON.stringify(imageUrl));
    await postSearchItems(id, formData);
  };
  // const handleRemoveImage = (toRemoveUrl: string) => {
  //   setImageUrl([...imageUrl].filter((url) => url !== toRemoveUrl));
  // };
  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="flex max-h-dvh w-full max-w-[1440px] flex-col gap-8 bg-slate-50 px-48 py-10"
    >
      <div className="grid w-full grid-cols-2 justify-center gap-16">
        <div className="flex flex-col gap-4">
          <span className="flex flex-col gap-1">
            <label className={`${anony.className}`}>Item name *</label>
            <input
              required
              {...register("itemName")}
              name="itemName"
              placeholder="Umbrella"
              value={itemName}
              className={`h-[60px] w-[400px] rounded-2xl bg-gray-100 pl-6 focus:outline-0 ${anony.className}`}
            />
            {errors.itemName?.message && (
              <label className="mr-4 text-right text-xs text-red-400">
                {errors.itemName.message}
              </label>
            )}
          </span>

          <span className="flex flex-col gap-1">
            <label className={`${anony.className}`}>Color *</label>
            <input
              {...register("brandModel")}
              placeholder="Black"
              name="color"
              value={color}
              className={`h-[60px] w-[400px] rounded-2xl bg-gray-100 pl-6 focus:outline-0 ${anony.className}`}
            />
            {errors.color?.message && (
              <label className="mr-4 text-right text-xs text-red-400">
                {errors.color.message}
              </label>
            )}
          </span>
          <span className="flex flex-col gap-1">
            <label className={`${anony.className}`}>Brand/Model *</label>
            <input
              {...register("brandModel")}
              value={brandModel}
              placeholder="UV"
              name="brandModel"
              className={`h-[60px] w-[400px] rounded-2xl bg-gray-100 pl-6 focus:outline-0 ${anony.className}`}
            />
            {errors.brandModel?.message && (
              <label className="mr-4 text-right text-xs text-red-400">
                {errors.brandModel.message}
              </label>
            )}
          </span>

          <span className="flex flex-col gap-1">
            <label className={`${anony.className}`}>Location</label>
            <input
              value={location}
              {...register("location")}
              placeholder="City, State or Address"
              name="location"
              type="text"
              className={`h-[60px] w-[400px] rounded-2xl bg-gray-100 pl-6 focus:outline-0 ${anony.className}`}
            />
            {errors.location?.message && (
              <label className="mr-4 text-right text-xs text-red-400">
                {errors.location.message}
              </label>
            )}
          </span>
          <span className="flex flex-col gap-1">
            <label className={`${anony.className}`}>Time & Date</label>
            <input
              placeholder=""
              type="datetime-local"
              {...register("timeDate")}
              defaultValue={
                timeDate ? new Date(timeDate).toString() : undefined
              }
              name="timeDate"
              className={`h-[60px] w-[400px] rounded-2xl bg-gray-100 px-6 focus:outline-0 ${anony.className}`}
            />
            {errors.timeDate?.message && (
              <label className="mr-4 text-right text-xs text-red-400">
                {errors.timeDate.message}
              </label>
            )}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <span className="flex flex-col gap-1">
            <label className={`${anony.className}`}>Category *</label>

            <select
              required
              {...register("category")}
              defaultValue={category}
              className={`h-[60px] w-[400px] rounded-2xl bg-gray-100 px-6 focus:outline-0 ${anony.className}`}
            >
              <option value="">Select a category</option>
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
            {errors.category?.message && (
              <label className="mr-4 text-right text-xs text-red-400">
                {errors.category.message}
              </label>
            )}
          </span>

          <span className="flex flex-col gap-1">
            <label className={`${anony.className}`}>Caption</label>
            <input
              {...register("caption")}
              defaultValue={caption}
              className={`h-[60px] w-[400px] rounded-2xl bg-gray-100 pl-6 focus:outline-0 ${anony.className}`}
            />

            {errors.caption?.message && (
              <label className="mr-4 text-right text-xs text-red-400">
                {errors.caption.message}
              </label>
            )}
          </span>
          <span className="flex flex-col gap-1">
            <label className={`${anony.className}`}>Description</label>
            <input
              {...register("desc")}
              name="desc"
              defaultValue={desc}
              className={`h-[60px] w-[400px] rounded-2xl bg-gray-100 pl-6 focus:outline-0 ${anony.className}`}
            />
          </span>

          {errors.desc?.message && (
            <label className="mr-4 text-right text-xs text-red-400">
              {errors.desc.message}
            </label>
          )}
          <span className="flex flex-col gap-1">
            <label className={`${anony.className}`}>Item proof</label>

            {/* <span className="flex h-max w-[400px] rounded-2xl">
              <label className="flex cursor-pointer gap-2 rounded-xl bg-gray-100 p-4 text-gray-500">
                {imageUrl && (
                  <>
                    <div className="flex gap-2">
                      {imageUrl.map((url) => (
                        <div className="relative inline-block" key={url}>
                          <CldImage
                            src={url}
                            alt="item proof"
                            width={100}
                            height={100}
                            crop="scale"
                            className="pointer-events-none rounded-lg opacity-70"
                          />

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveImage(url);
                            }}
                            className="absolute right-0 top-0 flex -translate-y-1/2 translate-x-1/2 transform cursor-pointer items-center justify-center rounded-full bg-red-500 p-1 text-white shadow-md hover:bg-red-600"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
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
                      ))}
                    </div>
                  </>
                )}
                <CldUploadWidget
                  {...register("itemProof")}
                  uploadPreset="ml_default"
                  onSuccess={(result) => {
                    if (typeof result !== "string") {
                      const secureUrl = (
                        result as { info: { secure_url: string } }
                      ).info.secure_url;
                      setImageUrl((prev: string[]) => {
                        const updatedUrls = [...prev, secureUrl].slice(0, 3);
                        return updatedUrls;
                      });
                    }
                  }}
                  signatureEndpoint={"/api/sign-cloudinary-params"}
                >
                  {({ open }) => {
                    return (
                      <button onClick={() => open()}>
                        {imageUrl.length < 3 ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-image-up"
                          >
                            <path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21" />
                            <path d="m14 19.5 3-3 3 3" />
                            <path d="M17 22v-5.5" />
                            <circle cx="9" cy="9" r="2" />
                          </svg>
                        ) : null}
                      </button>
                    );
                  }}
                </CldUploadWidget>
              </label>
            </span> */}
          </span>
        </div>
      </div>
      <ItemFormButton />
    </form>
  );
}
