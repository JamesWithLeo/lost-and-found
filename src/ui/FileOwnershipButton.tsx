"use client";

import { useRouter } from "next/navigation";

export default function FileOwnershipButton({
  itemId,
  disabled,
}: {
  itemId: string;
  disabled?: boolean;
}) {
  const router = useRouter();

  async function handleFileOwnership() {
    await fetch("/api/set-item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId }),
    });
    router.push(`/found-item/${itemId}/ownership`);
  }
  return (
    <button
      className={` ${disabled ? "cursor-auto opacity-40" : "cursor-pointer"} bg-primary flex w-max flex-col items-center justify-center rounded border px-4 py-1 text-sm text-white md:text-[16px]`}
      onClick={handleFileOwnership}
      disabled={disabled}
    >
      File Ownership
    </button>
  );
}
