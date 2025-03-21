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
    router.push(`/found-item/${itemId}/ownership`);
  }
  return (
    <button
      className="bg-primary flex w-full cursor-pointer flex-col items-center rounded border px-2 py-1 text-white"
      onClick={handleFileOwnership}
    >
      File Ownership
    </button>
  );
}
