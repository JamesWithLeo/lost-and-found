import Link from "next/link";
import ExitModal from "../exitModal";

export default function SearchModal() {
  return (
    <>
      <div className="fixed inset-0 z-40 h-full w-full bg-black opacity-45"></div>
      <div className="fixed left-1/2 top-1/2 z-50 grid h-80 w-full -translate-x-1/2 -translate-y-1/2 transform grid-rows-[max-content_max-content_1fr] flex-col gap-10 rounded-xl bg-white p-4 pb-8 sm:w-96 sm:p-8">
        <div className="flex flex-col items-end">
          <ExitModal />
        </div>
        <h1 className="text-center">Report Item</h1>
        <div className="flex w-full items-center justify-evenly gap-4">
          <Link href={"/my-item/new"} className="h-full w-full">
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded bg-gray-100 text-xs sm:text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 sm:h-8 sm:w-8"
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <path d="M216,64H56a8,8,0,0,1,0-16H192a8,8,0,0,0,0-16H56A24,24,0,0,0,32,56V184a24,24,0,0,0,24,24H216a16,16,0,0,0,16-16V80A16,16,0,0,0,216,64Zm0,128H56a8,8,0,0,1-8-8V78.63A23.84,23.84,0,0,0,56,80H216Zm-48-60a12,12,0,1,1,12,12A12,12,0,0,1,168,132Z"></path>
              </svg>
              <h1>My Item</h1>
            </div>
          </Link>
          <Link href={"/found-item/new"} className="h-full w-full">
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded bg-gray-100 text-xs sm:text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 sm:h-8 sm:w-8"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M160,40a32,32,0,1,0-32,32A32,32,0,0,0,160,40ZM128,56a16,16,0,1,1,16-16A16,16,0,0,1,128,56Zm90.34,78.05L173.17,82.83a32,32,0,0,0-24-10.83H106.83a32,32,0,0,0-24,10.83L37.66,134.05a20,20,0,0,0,28.13,28.43l16.3-13.08L65.55,212.28A20,20,0,0,0,102,228.8l26-44.87,26,44.87a20,20,0,0,0,36.41-16.52L173.91,149.4l16.3,13.08a20,20,0,0,0,28.13-28.43Zm-11.51,16.77a4,4,0,0,1-5.66,0c-.21-.2-.42-.4-.65-.58L165,121.76A8,8,0,0,0,152.26,130L175.14,217a7.72,7.72,0,0,0,.48,1.35,4,4,0,1,1-7.25,3.38,6.25,6.25,0,0,0-.33-.63L134.92,164a8,8,0,0,0-13.84,0L88,221.05a6.25,6.25,0,0,0-.33.63,4,4,0,0,1-2.26,2.07,4,4,0,0,1-5-5.45,7.72,7.72,0,0,0,.48-1.35L103.74,130A8,8,0,0,0,91,121.76L55.48,150.24c-.23.18-.44.38-.65.58a4,4,0,1,1-5.66-5.65c.12-.12.23-.24.34-.37L94.83,93.41a16,16,0,0,1,12-5.41h42.34a16,16,0,0,1,12,5.41l45.32,51.39c.11.13.22.25.34.37A4,4,0,0,1,206.83,150.82Z"></path>
              </svg>
              <h1>Someone item</h1>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
