import { Anonymous_Pro } from "next/font/google";
import Form from "next/form";

const anony = Anonymous_Pro({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});
export default function Page() {
  return (
    <Form
      className="flex w-full max-w-[1440px] flex-col gap-8 bg-gradient-to-b from-slate-50 to-white px-48 py-10"
      action={"/report/result"}
    >
      <div className="grid w-full grid-cols-2 justify-center gap-16">
        <div className="flex flex-col gap-4">
          <span className="flex flex-col gap-1">
            <label className={`${anony.className}`}>Item name *</label>
            <input
              name="Item-name"
              placeholder="Umbrella"
              className={`h-[60px] w-[400px] rounded-full bg-gray-100 pl-6 focus:outline-0 ${anony.className}`}
            />
          </span>

          <span className="flex flex-col gap-1">
            <label className={`${anony.className}`}>Color *</label>
            <input
              placeholder="Black"
              name="color"
              className={`h-[60px] w-[400px] rounded-full bg-gray-100 pl-6 focus:outline-0 ${anony.className}`}
            />
          </span>
          <span className="flex flex-col gap-1">
            <label className={`${anony.className}`}>Brand/Model *</label>
            <input
              placeholder="UV"
              name="brandmodel"
              className={`h-[60px] w-[400px] rounded-full bg-gray-100 pl-6 focus:outline-0 ${anony.className}`}
            />
          </span>

          <span className="flex flex-col gap-1">
            <label className={`${anony.className}`}>Location</label>
            <input
              placeholder="Rizal"
              name="location"
              className={`h-[60px] w-[400px] rounded-full bg-gray-100 pl-6 focus:outline-0 ${anony.className}`}
            />
          </span>
          <span className="flex flex-col gap-1">
            <label className={`${anony.className}`}>Time & Date</label>
            <input
              placeholder=""
              type="datetime-local"
              name="time-date"
              className={`h-[60px] w-[400px] rounded-full bg-gray-100 px-6 focus:outline-0 ${anony.className}`}
            />
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <span className="flex flex-col gap-1">
            <label className={`${anony.className}`}>Category *</label>
            <div className="flex w-[400px] flex-wrap gap-2 text-sm">
              <button
                className={`w-max rounded-full bg-gray-100 px-4 py-1 hover:bg-gray-200 ${anony.className}`}
              >
                Animals
              </button>
              <button
                className={`w-max rounded-full bg-gray-100 px-4 py-1 hover:bg-gray-200 ${anony.className}`}
              >
                Documents
              </button>
              <button
                className={`w-max rounded-full bg-gray-100 px-4 py-1 hover:bg-gray-200 ${anony.className}`}
              >
                Electronics
              </button>
              <button
                className={`w-max rounded-full bg-gray-100 px-4 py-1 hover:bg-gray-200 ${anony.className}`}
              >
                Clothing
              </button>

              <button
                className={`w-max rounded-full bg-gray-100 px-4 py-1 hover:bg-gray-200 ${anony.className}`}
              >
                Bags & Wallet
              </button>
              <button
                className={`w-max rounded-full bg-gray-100 px-4 py-1 hover:bg-gray-200 ${anony.className}`}
              >
                Pets & Person
              </button>
              <button
                className={`w-max rounded-full bg-gray-100 px-4 py-1 hover:bg-gray-200 ${anony.className}`}
              >
                Accessory
              </button>
              <button
                className={`w-max rounded-full bg-gray-100 px-4 py-1 hover:bg-gray-200 ${anony.className}`}
              >
                Food & Beverage
              </button>
              <button
                className={`w-max rounded-full bg-gray-100 px-4 py-1 hover:bg-gray-200 ${anony.className}`}
              >
                Miscellaneous
              </button>
            </div>
          </span>

          <span className="flex flex-col gap-1">
            <label className={`${anony.className}`}>Caption</label>
            <input
              name="caption"
              className={`h-[60px] w-[400px] rounded-full bg-gray-100 pl-6 focus:outline-0 ${anony.className}`}
            />
          </span>
          <span className="flex flex-col gap-1">
            <label className={`${anony.className}`}>Description</label>
            <input
              name="desc"
              className={`h-[60px] w-[400px] rounded-full bg-gray-100 pl-6 focus:outline-0 ${anony.className}`}
            />
          </span>

          <span className="">
            <button className={`rounded-full bg-gray-100 px-4 py-1 text-sm`}>
              Attach picture
            </button>
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <button
          className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-1"
          type="submit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#000000"
            viewBox="0 0 256 256"
          >
            <path d="M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0ZM93.66,77.66,120,51.31V144a8,8,0,0,0,16,0V51.31l26.34,26.35a8,8,0,0,0,11.32-11.32l-40-40a8,8,0,0,0-11.32,0l-40,40A8,8,0,0,0,93.66,77.66Z"></path>
          </svg>
          Upload report
        </button>
        {/* <Link href={"/"}>upload report</Link> */}
      </div>
    </Form>
  );
}
