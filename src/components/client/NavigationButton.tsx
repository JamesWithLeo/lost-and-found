"use client";

import { Inria_Sans } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";

const inri = Inria_Sans({
  weight: ["400"],
  subsets: ["latin"],
  style: ["normal"],
});
export default function NavigationButton({
  label,
  target,
}: {
  label: string;
  target: string;
}) {
  const path = usePathname();
  return (
    <>
      <Link
        href={target}
        className={`${inri.className} ${path === target ? "text-primary-dark border-b" : ""} ${path === "/discovery" && label === "Home" ? "text-primary-dark border-b" : ""}`}
      >
        {label}
      </Link>
    </>
  );
}
