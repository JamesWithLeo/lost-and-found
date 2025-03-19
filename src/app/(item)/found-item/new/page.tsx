import { authOptions } from "@/authOptions";
import PostFormItem from "@/ui/PostFormItem";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <PostFormItem id={session?.user.id} />
    // <Form
    //   className="flex w-full max-w-[1440px] flex-col gap-8 bg-gradient-to-b from-slate-50 to-white px-48 py-10"
    //   action={postFoundItemsAction}
    // >
    //   <div className="grid w-full grid-cols-2 justify-center gap-16">
    //     <div className="flex flex-col gap-4">
    //       <span className="flex flex-col gap-1">
    //         <label className={`${anony.className}`}>Item name *</label>
    //         <input
    //           name="itemName"
    //           placeholder="Umbrella"
    //           className={`h-[60px] w-[400px] rounded-full bg-gray-100 pl-6 focus:outline-0 ${anony.className}`}
    //         />
    //       </span>

    //       <span className="flex flex-col gap-1">
    //         <label className={`${anony.className}`}>Color *</label>
    //         <input
    //           placeholder="Black"
    //           name="color"
    //           className={`h-[60px] w-[400px] rounded-full bg-gray-100 pl-6 focus:outline-0 ${anony.className}`}
    //         />
    //       </span>
    //       <span className="flex flex-col gap-1">
    //         <label className={`${anony.className}`}>Brand/Model *</label>
    //         <input
    //           placeholder="UV"
    //           name="brandModel"
    //           className={`h-[60px] w-[400px] rounded-full bg-gray-100 pl-6 focus:outline-0 ${anony.className}`}
    //         />
    //       </span>

    //       <span className="flex flex-col gap-1">
    //         <label className={`${anony.className}`}>Location</label>
    //         <input
    //           placeholder="Rizal"
    //           name="location"
    //           className={`h-[60px] w-[400px] rounded-full bg-gray-100 pl-6 focus:outline-0 ${anony.className}`}
    //         />
    //       </span>
    //       <span className="flex flex-col gap-1">
    //         <label className={`${anony.className}`}>Time & Date</label>
    //         <input
    //           placeholder=""
    //           type="datetime-local"
    //           name="timeDate"
    //           className={`h-[60px] w-[400px] rounded-full bg-gray-100 px-6 focus:outline-0 ${anony.className}`}
    //         />
    //       </span>
    //     </div>

    //     <div className="flex flex-col gap-4">
    //       <span className="flex flex-col gap-1">
    //         <label className={`${anony.className}`}>Category *</label>
    //         <select
    //           name="category"
    //           required
    //           className={`h-[60px] w-[400px] rounded-2xl bg-gray-100 px-6 focus:outline-0 ${anony.className}`}
    //         >
    //           <option value="">Select a category</option>
    //           <option value="animals">Animals</option>
    //           <option value="accessory">Accessory</option>
    //           <option value="clothing">Clothing</option>
    //           <option value="bags & wallet">Bags & Wallet</option>
    //           <option value="documents">Documents</option>
    //           <option value="electronics">Electronics</option>
    //           <option value="food & beverages">Food & Beverages</option>
    //           <option value="pets & person">Pets & Person</option>
    //           <option value="miscellaneous">Miscellaneous</option>
    //         </select>
    //       </span>

    //       <span className="flex flex-col gap-1">
    //         <label className={`${anony.className}`}>Caption</label>
    //         <input
    //           name="caption"
    //           className={`h-[60px] w-[400px] rounded-full bg-gray-100 pl-6 focus:outline-0 ${anony.className}`}
    //         />
    //       </span>
    //       <span className="flex flex-col gap-1">
    //         <label className={`${anony.className}`}>Description</label>
    //         <input
    //           name="desc"
    //           className={`h-[60px] w-[400px] rounded-full bg-gray-100 pl-6 focus:outline-0 ${anony.className}`}
    //         />
    //       </span>

    //       <span className="">
    //         <button className={`rounded-full bg-gray-100 px-4 py-1 text-sm`}>
    //           Attach picture
    //         </button>
    //       </span>
    //     </div>
    //   </div>

    //   <div className="flex flex-col items-end justify-center">
    //     <button
    //       className="bg-primary flex cursor-pointer items-center gap-2 rounded-full px-4 py-1 text-white"
    //       type="submit"
    //     >
    //       <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         width="16"
    //         height="16"
    //         fill="currentColor"
    //         viewBox="0 0 256 256"
    //       >
    //         <path d="M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0ZM93.66,77.66,120,51.31V144a8,8,0,0,0,16,0V51.31l26.34,26.35a8,8,0,0,0,11.32-11.32l-40-40a8,8,0,0,0-11.32,0l-40,40A8,8,0,0,0,93.66,77.66Z"></path>
    //       </svg>
    //       Upload report
    //     </button>
    //   </div>
    // </Form>
  );
}
