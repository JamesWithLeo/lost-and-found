"use client";

import { FormSchema, postItemSchema } from "@/lib/ItemActionSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Anonymous_Pro } from "next/font/google";
import { postSearchItems } from "@/actions/itemActions";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useFormStatus } from "react-dom";
import { CATEGORIES } from "@/constant/constant";
import { toast } from "sonner";

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
  const { itemName, brandModel, location, timeDate, color, caption, desc } =
    value;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<File[] | []>([]);
  const [selectedCategory, setSelectedCategories] =
    useState<(typeof CATEGORIES)[number]>("");
  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
  } = useForm<FormSchema>({ resolver: zodResolver(postItemSchema) });

  const onSubmitForm: SubmitHandler<FormSchema> = async (data) => {
    const formData = new FormData();
    formData.append("itemName", data.itemName);
    formData.append("brandModel", data.brandModel!);
    formData.append("caption", data.caption);
    formData.append("category", data.category);
    formData.append("desc", data.desc!);
    formData.append("location", data.location ?? "unknown");
    formData.append("timeDate", data.timeDate.toString());
    formData.append("itemProof", JSON.stringify(imageUrl));

    const base64Images = await Promise.all(
      imagePreview.map((image) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
        });
      }),
    );
    await postSearchItems(id, base64Images, formData);
  };

  const HandleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(imageUrl);
    if (imageUrl.length === 3) {
      event.preventDefault();
      return;
    }
    const currentfile = event.target.files?.[0];
    console.log(currentfile?.size);
    if (currentfile && currentfile?.size > 3 * 1024 * 1024) {
      // 3mb
      console.log("large image");
      toast.error(
        "The selected file is too large. Please upload an image under 3MB.",
        {
          position: "bottom-right",
          richColors: true,
          duration: 6000,
        },
      );
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }
    const files = event.target.files ? Array.from(event.target.files) : [];
    setImagePreview((prev) => [...prev, ...files]);
  };

  const HandleRemoveImage = (img: string) => {
    setImageUrl((prev) => prev.filter((p) => p !== img));
  };
  const HandleClickUnknownBrand = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const brandModelInput = document.getElementById(
      "brand",
    ) as HTMLInputElement;
    if (event.target.checked) {
      brandModelInput.value = "unknown";
    } else {
      brandModelInput.value = "";
    }
  };

  useEffect(() => {
    if (!imagePreview.length) return;

    const objectUrls = imagePreview.map((file) => URL.createObjectURL(file));
    setImageUrl(objectUrls);

    return () => objectUrls.forEach((url) => URL.revokeObjectURL(url));
  }, [imagePreview]);

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="bg-slate-5 0 flex max-h-max w-full max-w-[1440px] flex-col gap-8 px-48 py-10"
    >
      <div className="grid w-full grid-cols-1 justify-center gap-16">
        <div className="flex flex-col gap-4">
          <span className="flex flex-col gap-1">
            <label className={`${anony.className} text-gray-700`}>
              Category *
            </label>

            <span className="flex w-full flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                return (
                  <label
                    key={cat}
                    className={`w-max rounded-2xl bg-white px-4 py-1 text-sm text-gray-700 shadow ${selectedCategory === cat ? "bg-primary text-white" : "bg- text-gray-700"}`}
                  >
                    <input
                      type="radio"
                      value={cat}
                      className="hidden"
                      {...register("category")}
                      onChange={() => {
                        setSelectedCategories(cat);
                        setValue("category", cat);
                        console.log(
                          "cat:",
                          cat,
                          "\n",
                          "selected:",
                          selectedCategory,
                        );
                      }}
                    />
                    <h1>{cat}</h1>
                  </label>
                );
              })}
            </span>

            {errors.category?.message && (
              <label className="mr-4 text-right text-xs text-red-400">
                {errors.category.message}
              </label>
            )}
          </span>

          <span className="flex flex-col gap-1">
            <label className={`${anony.className} text-gray-700`}>
              Item name *
            </label>
            <input
              required
              {...register("itemName")}
              name="itemName"
              placeholder="Umbrella"
              value={itemName}
              className={`h-[40px] w-full rounded-2xl border bg-white pl-6 focus:outline-0 ${anony.className}`}
            />
            {errors.itemName?.message && (
              <label className="mr-4 text-right text-xs text-red-400">
                {errors.itemName.message}
              </label>
            )}
          </span>

          <span className="flex flex-col gap-1">
            <label className={`${anony.className} text-gray-700`}>
              Color *
            </label>
            <input
              {...register("brandModel")}
              placeholder="Black"
              name="color"
              value={color}
              className={`h-[40px] w-full rounded-2xl border bg-white pl-6 focus:outline-0 ${anony.className}`}
            />
            {errors.color?.message && (
              <label className="mr-4 text-right text-xs text-red-400">
                {errors.color.message}
              </label>
            )}
          </span>
          <span className="50 flex flex-col gap-1">
            <label className={`${anony.className} text-gray-700`}>
              Brand/Model *
            </label>
            <input
              id="brand"
              {...register("brandModel")}
              value={brandModel}
              placeholder="UV"
              name="brandModel"
              className={`h-[40px] w-full rounded-2xl border bg-white pl-6 focus:outline-0 ${anony.className}`}
            />
            {errors.brandModel?.message && (
              <label className="mr-4 text-right text-xs text-red-400">
                {errors.brandModel.message}
              </label>
            )}

            <span
              className={`flex justify-end text-sm ${anony.className} items-center gap-2`}
            >
              <input type="checkbox" onChange={HandleClickUnknownBrand} />
              <label>unknown</label>
            </span>
          </span>

          <span className="flex flex-col gap-1">
            <label className={`${anony.className} text-gray-700`}>
              Location
            </label>
            <input
              value={location}
              {...register("location")}
              placeholder="City, State or Address"
              name="location"
              type="text"
              className={`h-[40px] w-full rounded-2xl border bg-white pl-6 focus:outline-0 ${anony.className}`}
            />
            {errors.location?.message && (
              <label className="mr-4 text-right text-xs text-red-400">
                {errors.location.message}
              </label>
            )}
          </span>
          <span className="flex flex-col gap-1">
            <label className={`${anony.className} text-gray-700`}>
              Time & Date
            </label>
            <input
              placeholder=""
              type="datetime-local"
              {...register("timeDate")}
              defaultValue={
                timeDate ? new Date(timeDate).toString() : undefined
              }
              name="timeDate"
              className={`h-[40px] w-full rounded-2xl border bg-white px-6 focus:outline-0 ${anony.className}`}
            />
            {errors.timeDate?.message && (
              <label className="mr-4 text-right text-xs text-red-400">
                {errors.timeDate.message}
              </label>
            )}
          </span>

          <span className="flex flex-col gap-1">
            <label className={`${anony.className} text-gray-700`}>
              Caption
            </label>
            <input
              {...register("caption")}
              defaultValue={caption}
              className={`h-[40px] w-full rounded-2xl border bg-white pl-6 focus:outline-0 ${anony.className}`}
            />

            {errors.caption?.message && (
              <label className="mr-4 text-right text-xs text-red-400">
                {errors.caption.message}
              </label>
            )}
          </span>
          <span className="flex flex-col gap-1">
            <label className={`${anony.className} text-gray-700`}>
              Description
            </label>
            <textarea
              {...register("desc")}
              name="desc"
              defaultValue={desc}
              rows={3}
              className={`min-h-32 w-full resize-none rounded-2xl border bg-white pl-6 focus:outline-0 ${anony.className}`}
            />
          </span>

          {errors.desc?.message && (
            <label className="mr-4 text-right text-xs text-red-400">
              {errors.desc.message}
            </label>
          )}
          <span className="flex flex-col gap-1">
            <span
              className={`${anony.className} flex items-center gap-2 text-gray-700`}
            >
              <label>Item proof</label>
              <label className="text-xs">(Maximum of 3mb per image)</label>
            </span>

            <span className="flex h-max w-[400px] gap-2 rounded-2xl">
              {imageUrl.map((img, index) => (
                <div key={index} className="relative max-h-28 max-w-28">
                  <button
                    className="absolute right-1 top-1 cursor-pointer rounded-full bg-gray-400 p-1 text-white hover:bg-gray-500"
                    type="button"
                    onClick={() => {
                      HandleRemoveImage(img);
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
                  <Image
                    className="h-auto w-auto rounded object-cover shadow-sm"
                    src={img}
                    height={100}
                    width={100}
                    alt={index.toString()}
                  />
                </div>
              ))}

              <input
                hidden
                type="file"
                accept="image/*"
                ref={fileInputRef}
                multiple
                onChange={HandleFileChange}
              />
              <button
                className="hover:text-primary rounded-2xl border bg-white p-8 text-gray-700"
                type="button"
                onClick={() => {
                  fileInputRef.current?.click();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-image-up"
                >
                  <path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21" />
                  <path d="m14 19.5 3-3 3 3" />
                  <path d="M17 22v-5.5" />
                  <circle cx="9" cy="9" r="2" />
                </svg>
              </button>
            </span>
          </span>
        </div>
      </div>

      <ReportSearchButton />
    </form>
  );
}

function ReportSearchButton() {
  const { pending } = useFormStatus();

  return (
    <div className="flex w-full justify-end gap-4">
      <button
        type="submit"
        disabled={pending}
        className="bg-primary flex cursor-pointer items-center justify-center rounded px-4 py-2 text-white"
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
        ) : null}
        {!pending && "Report and search"}
      </button>
    </div>
  );
}
