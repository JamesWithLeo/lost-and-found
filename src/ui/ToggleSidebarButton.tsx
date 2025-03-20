"use client";

import { useSidebar } from "@/components/ui/sidebar";

export default function ToggleSidebarButton() {
  const { toggleSidebar } = useSidebar();
  return (
    <button
      className="cursor-pointer"
      onClick={() => {
        toggleSidebar();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-panel-left"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M9 3v18" />
      </svg>
    </button>
  );
}
