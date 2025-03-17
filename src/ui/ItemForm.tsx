"use client";

import { FormSchema, postSearchSchema } from "@/lib/ItemActionSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Anonymous_Pro } from "next/font/google";
import ItemFormButton from "@/ui/ItemFormButton";
import { postSearchItems } from "@/actions/itemActions";
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
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<FormSchema>({ resolver: zodResolver(postSearchSchema) });
  const onSubmitForm: SubmitHandler<FormSchema> = async (data) => {
    const formData = new FormData();
    formData.append("itemName", data.itemName);
    await postSearchItems(id, formData);
  };
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
              name="category"
              required
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
              name="caption"
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
          <span className="">
            <button className={`rounded-full bg-gray-100 px-4 py-1 text-sm`}>
              Attach picture
            </button>
          </span>
        </div>
      </div>
      <ItemFormButton />
    </form>
  );
}
