"use client";
import { useFormStatus } from "react-dom";

export default function ItemFormButton() {
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
