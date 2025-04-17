const ibm = IBM_Plex_Sans_Thai_Looped({
  weight: ["300", "400"],
  subsets: ["latin"],
});
import { IBM_Plex_Sans_Thai_Looped, Anonymous_Pro } from "next/font/google";
import GoogleButton from "@/ui/GoogleButton";
import { getServerSession } from "next-auth";
import { saveUserSetup } from "../../actions/userActions";
import { authOptions } from "@/authOptions";

const anony = Anonymous_Pro({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});
export default async function Page() {
  const session = await getServerSession(authOptions);
  const saveUserSetupWithId = saveUserSetup.bind(null, session?.user.id);
  return (
    <main className="flex h-dvh flex-col items-center justify-center">
      <section className="mb-16 flex w-[400px] flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-white px-4 pb-4 pt-16">
        {session && session?.user.email && !session.user.isCompletedAccount && (
          <>
            <form className="w-full" action={saveUserSetupWithId}>
              <div className="w-full">
                <p
                  className={`mb-4 text-left text-gray-600 ${ibm.className} text-sm`}
                >
                  Almost There! Step 2 of 2
                </p>
                <div className="grid w-full grid-cols-2 items-center gap-2">
                  <div className="border-primary-light w-full border-b-2"></div>
                  <div className="border-primary border-b-3 w-full"></div>
                </div>
              </div>
              <span className="w-full">
                <span
                  className={`${ibm.className} flex w-full items-baseline gap-1 text-left text-2xl font-bold text-gray-700`}
                >
                  Finish Set up
                  <h1 className="text-xs font-normal">(required)</h1>
                </span>
                <h1 className={`w-full ${ibm.className} text-gray-500`}>
                  Email: {session.user.email}
                </h1>
              </span>
              <div className="flex w-full flex-col gap-2">
                <span className="grow-1 flex flex-col rounded-xl border px-2 pb-0.5 pt-1">
                  <label className={`${anony.className}`}>First name </label>
                  <input className="focus:outline-none" name="firstName" />
                </span>
                <span className="grow-1 flex flex-col rounded-xl border px-2 pb-0.5 pt-1">
                  <label className={`${anony.className}`}>Last name </label>
                  <input className="focus:outline-none" name="lastName" />
                </span>
                <span className="grow-1 flex flex-col rounded-xl border px-2 pb-0.5 pt-1">
                  <label className={`${anony.className}`}>Birth date </label>
                  <input
                    className="focus:outline-none"
                    type="date"
                    name="birthDate"
                  />
                </span>

                <span className="grow-1 flex flex-col rounded-xl border px-2 pb-0.5 pt-1">
                  <label className={`${anony.className}`}>Gender </label>
                  <select className="focus:outline-none" name="gender">
                    <option value={"male"}>Male</option>
                    <option value={"female"}>Female</option>
                    <option>Prefer not to say</option>
                  </select>
                </span>
                <button
                  type="submit"
                  className="bg-primary w-full cursor-pointer rounded-xl py-2 text-white"
                >
                  Continue
                </button>
              </div>
            </form>
          </>
        )}
        {!session && (
          <>
            <div className="w-full">
              <p
                className={`mb-4 text-left text-gray-600 ${ibm.className} text-sm`}
              >
                Step 1 of 2
              </p>
              <div className="grid w-full grid-cols-2 items-center gap-2">
                <div className="border-primary border-b-3 w-full"></div>
                <div className="border-primary-light w-full border-b-2"></div>
              </div>
            </div>
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
              By tapping Create new account, you agree with the Terms and
              Condition and Privacy Policy.
            </p>
            <button className="bg-primary w-full rounded-xl py-2 text-white">
              Create new account
            </button>
            <div className="flex w-full items-center gap-4">
              <div className="w-full border-t"></div>
              <h1>or</h1>
              <div className="w-full border-t"></div>
            </div>
            <GoogleButton />
            {/* <FacbookButton /> */}
          </>
        )}
      </section>
    </main>
  );
}
