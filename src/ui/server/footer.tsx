import { Anonymous_Pro } from "next/font/google";
import Link from "next/link";
import BackToTop from "../client/backToTopButton";
const anony = Anonymous_Pro({ weight: ["400", "700"], subsets: ["latin"] });

export default function Footer() {
  return (
    <footer className="flex h-[164px] w-full flex-col items-center justify-evenly justify-items-center bg-transparent shadow-2xl">
      <BackToTop />
      <div className={`${anony.className} row-start-5 flex gap-16 bg-white`}>
        <Link href={"/about"}>About Us</Link>
        <Link href={"/about"}>Contact Us</Link>
        <Link href={"/about"}>Terms & Condition</Link>
        <Link href={"/faqs"}>Faqs</Link>
      </div>
    </footer>
  );
}
