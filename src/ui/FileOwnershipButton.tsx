"use client";

import { useRouter } from "next/navigation";

export default function FileOwnershipButton({ itemId }: { itemId: string }) {
  const router = useRouter();

  async function handleFileOwnership() {
    await fetch("/api/set-item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId }),
    });
    router.push(`/result/${itemId}/ownership`);
  }
  return (
    <button
      className="bg-primary flex w-full cursor-pointer flex-col items-center justify-center rounded border px-2 py-1 text-sm text-white md:text-[16px]"
      onClick={handleFileOwnership}
    >
      File Ownership
    </button>
  );
}
