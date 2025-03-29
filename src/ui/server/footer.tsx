import { Anonymous_Pro } from "next/font/google";
import Link from "next/link";
import BackToTop from "../client/backToTopButton";
const anony = Anonymous_Pro({ weight: ["400", "700"], subsets: ["latin"] });

export default function Footer() {
  return (
    <footer className="flex h-max w-full grid-rows-2 flex-col items-center justify-evenly justify-items-center border-t bg-slate-50 px-[1.5rem] pb-[1.5rem] shadow-2xl sm:px-12 md:h-[164px]">
      <BackToTop />
      <div
        className={`${anony.className} flex w-full flex-col md:flex-col md:items-center`}
      >
        <span className="flex flex-col gap-4 md:flex-row md:gap-16">
          <Link href={"/about"}>About Us</Link>
          <Link href={"/about"}>Contact Us</Link>
          <Link href={"/about"}>Terms & Condition</Link>
          <Link href={"/faqs"}>Faqs</Link>
        </span>
      </div>
    </footer>
  );
}
