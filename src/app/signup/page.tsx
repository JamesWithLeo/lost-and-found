const ibm = IBM_Plex_Sans_Thai_Looped({
  weight: ["300", "400"],
  subsets: ["latin"],
});
import { IBM_Plex_Sans_Thai_Looped, Anonymous_Pro } from "next/font/google";
import GoogleButton from "@/components/client/GoogleButton";

const anony = Anonymous_Pro({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});
export default function Page() {
  return (
    <main className="flex h-dvh flex-col items-center justify-center">
      <section className="mb-16 flex w-[400px] flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-white px-4 pb-4 pt-16">
        <h1 className={`${ibm.className} w-full text-left text-2xl`}>
          Lets Get Started
        </h1>
        <div className="flex w-full flex-col gap-2">
          <span className="grow-1 flex flex-col rounded-xl border px-2 pb-0.5 pt-1">
            <label className={`${anony.className}`}>First name *</label>
            <input className="focus:outline-none" name="firstName" />
          </span>
          <span className="grow-1 flex flex-col rounded-xl border px-2 pb-0.5 pt-1">
            <label className={`${anony.className}`}>Last name *</label>
            <input className="focus:outline-none" name="lastName" />
          </span>
          <span className="grow-1 flex flex-col rounded-xl border px-2 pb-0.5 pt-1">
            <label className={`${anony.className}`}>Email Address *</label>
            <input className="focus:outline-none" name="lastName" />
          </span>
        </div>
        <p className="w-[293px] text-center text-xs">
          By tapping Create new account, you agree with the Terms and Condition
          and Privacy Policy.
        </p>
        <button className="bg-primary w-full rounded-xl py-2 text-white">
          Create new account
        </button>
        <GoogleButton />
      </section>
    </main>
  );
}
