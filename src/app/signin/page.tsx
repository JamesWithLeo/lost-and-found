import { IBM_Plex_Sans_Thai_Looped, Anonymous_Pro } from "next/font/google";
import GoogleButton from "@/components/client/GoogleButton";

const anony = Anonymous_Pro({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});
const ibm = IBM_Plex_Sans_Thai_Looped({
  weight: ["300", "400"],
  subsets: ["latin"],
});
export default function SigninPage() {
  return (
    <main className="flex h-dvh flex-col items-center justify-center">
      <section className="mb-16 flex w-[400px] flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-white px-4 pb-4 pt-16">
        <h1 className={`${ibm.className} w-full text-left text-2xl`}>
          Sign in to Lost and found
        </h1>
        <div className="flex w-full flex-col gap-2">
          <span className="grow-1 flex flex-col rounded-xl border px-2 pb-0.5 pt-1">
            <label className={`${anony.className}`}>Email *</label>
            <input className="focus:outline-none" name="email" />
          </span>
          <span className="grow-1 flex flex-col rounded-xl border px-2 pb-0.5 pt-1">
            <label className={`${anony.className}`}>Password *</label>
            <input
              className="focus:outline-none"
              name="password"
              type="password"
            />
          </span>
          <button className="bg-primary w-full rounded-xl py-2 text-white">
            Sign in
          </button>
        </div>
        <p className="w-[293px] text-center text-xs">
          We recommend you to use <strong>Google</strong> for faster login.
        </p>
        <GoogleButton />
      </section>
    </main>
  );
}
