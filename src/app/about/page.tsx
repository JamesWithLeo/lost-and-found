import { Inter } from "next/font/google";
const inter = Inter({ weight: "300" });
import TeamCard from "@/components/client/teamCard";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="flex flex-col gap-20">
      <section className="flex h-[532px] w-full items-center justify-center bg-gray-300">
        <div className="flex h-[400px] flex-col items-center justify-center bg-gray-200 px-8 py-12">
          <h1 className="mb-4 text-center text-3xl">Our mission</h1>
          <p className="mb-12 w-[414px] text-center leading-9">
            Our online platform is dedicated to reuniting lost items with thier
            owners and helping the community thrive. Join us in making a
            difference today!
          </p>
          <Link href={"/"} className="rounded-full border px-8 py-2">
            Join Now
          </Link>
        </div>
      </section>

      <section className="flex flex-col items-center gap-20 px-16">
        <h1 className="text-center text-3xl">Meet the team</h1>
        <div className="grid h-max grid-cols-4 gap-8">
          <TeamCard />
          <TeamCard />
          <TeamCard />
          <TeamCard />
          <TeamCard />
          <TeamCard />
          <TeamCard />
          <TeamCard />
        </div>
      </section>

      <section className="flex flex-col items-center">
        <h1 className="mb-4 text-center text-3xl">Our story </h1>
        <p
          className={`h-max w-[520px] text-center leading-9 ${inter.className}`}
        >
          Founded with a passion for helping others, our online lost and found
          platform has been connecting lost items with their owners since its
          inception. Join us in mission today!
        </p>
      </section>
    </main>
  );
}
