"use client";
import { FormSchema, postSearchSchema } from "@/lib/ItemActionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Anonymous_Pro } from "next/font/google";
import { postFoundItems } from "@/actions/itemActions";

const anony = Anonymous_Pro({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function PostFormItem({ id }: { id: string | undefined }) {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({ resolver: zodResolver(postSearchSchema) });
  const onSubmitForm: SubmitHandler<FormSchema> = async (data) => {
    const formData = new FormData();
    formData.append("itemName", data.itemName);
    formData.append("brandModel", data.brandModel!);
    formData.append("caption", data.caption);
    formData.append("category", data.category);
    formData.append("desc", data.desc!);
    formData.append("location", data.location);
    formData.append("timeDate", data.timeDate.toString());

    await postFoundItems(id, formData);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="flex w-full max-w-[1440px] flex-col gap-8 bg-gradient-to-b from-slate-50 to-white px-48 py-10"
    >
      <div className="grid w-full grid-cols-2 justify-center gap-16">
        <div className="flex flex-col gap-4">
          <span className="flex flex-col gap-1">
            <label className={`${anony.className}`}>Item name *</label>
            <input
              {...register("itemName")}
              name="itemName"
              placeholder="Umbrella"
              className={`h-[60px] w-[400px] rounded-full bg-gray-100 pl-6 focus:outline-0 ${anony.className}`}
            />{" "}
            {errors.itemName?.message && (
              <label className="mr-4 text-right text-xs text-red-400">
                {errors.itemName.message}
              </label>
            )}
          </span>

          <span className="flex flex-col gap-1">
            <label className={`${anony.className}`}>Color *</label>
            <input
              {...register("color")}
              placeholder="Black"
              name="color"
              className={`h-[60px] w-[400px] rounded-full bg-gray-100 pl-6 focus:outline-0 ${anony.className}`}
            />{" "}
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
              placeholder="UV"
              name="brandModel"
              className={`h-[60px] w-[400px] rounded-full bg-gray-100 pl-6 focus:outline-0 ${anony.className}`}
            />{" "}
            {errors.brandModel?.message && (
              <label className="mr-4 text-right text-xs text-red-400">
                {errors.brandModel.message}
              </label>
            )}
          </span>

          <span className="flex flex-col gap-1">
            <label className={`${anony.className}`}>Location</label>
            <input
              {...register("location")}
              placeholder="Rizal"
              name="location"
              className={`h-[60px] w-[400px] rounded-full bg-gray-100 pl-6 focus:outline-0 ${anony.className}`}
            />{" "}
            {errors.location?.message && (
              <label className="mr-4 text-right text-xs text-red-400">
                {errors.location.message}
              </label>
            )}
          </span>
          <span className="flex flex-col gap-1">
            <label className={`${anony.className}`}>Time & Date</label>
            <input
              {...register("timeDate")}
              placeholder=""
              type="datetime-local"
              name="timeDate"
              className={`h-[60px] w-[400px] rounded-full bg-gray-100 px-6 focus:outline-0 ${anony.className}`}
            />{" "}
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
              {...register("category")}
              name="category"
              required
              className={`h-[60px] w-[400px] rounded-full bg-gray-100 px-6 focus:outline-0 ${anony.className}`}
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
              name="caption"
              className={`h-[60px] w-[400px] rounded-full bg-gray-100 pl-6 focus:outline-0 ${anony.className}`}
            />
            {errors.category?.message && (
              <label className="mr-4 text-right text-xs text-red-400">
                {errors.category.message}
              </label>
            )}
          </span>
          <span className="flex flex-col gap-1">
            <label className={`${anony.className}`}>Description</label>
            <input
              {...register("desc")}
              name="desc"
              className={`h-[60px] w-[400px] rounded-full bg-gray-100 pl-6 focus:outline-0 ${anony.className}`}
            />
            {errors.desc?.message && (
              <label className="mr-4 text-right text-xs text-red-400">
                {errors.desc.message}
              </label>
            )}
          </span>

          <span className="">
            <button className={`rounded-full bg-gray-100 px-4 py-1 text-sm`}>
              Attach picture
            </button>
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end justify-center">
        <button
          className="bg-primary flex cursor-pointer items-center gap-2 rounded-full px-4 py-1 text-white"
          type="submit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0ZM93.66,77.66,120,51.31V144a8,8,0,0,0,16,0V51.31l26.34,26.35a8,8,0,0,0,11.32-11.32l-40-40a8,8,0,0,0-11.32,0l-40,40A8,8,0,0,0,93.66,77.66Z"></path>
          </svg>
          Upload report
        </button>
      </div>
    </form>
  );
}
