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
  hideOn,
}: {
  label: string;
  target: string;
  hideOn: string[];
}) {
  const path = usePathname();
  return (
    <>
      {!hideOn.includes(path) && (
        <Link
          href={target}
          className={`${inri.className} ${path === target ? "underline-offset-3 text-primary-dark underline" : "no-underline"} ${path === "/start" && label === "Home" ? "underline-offset-3 text-primary-dark underline" : ""}`}
        >
          {label}
        </Link>
      )}
    </>
  );
}
