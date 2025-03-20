import { Inter } from "next/font/google";
const inter = Inter({ weight: "300", subsets: ["latin"] });
import TeamCard from "@/ui/server/teamCard";
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
          <Link
            href={"/"}
            className="bg-primary rounded-full px-8 py-2 text-white"
          >
            Join Now
          </Link>
        </div>
      </section>

      <section className="flex flex-col items-center gap-20 px-16">
        <h1 className="text-center text-3xl">Meet the team</h1>
        <div className="flex h-max flex-wrap items-center justify-center gap-16">
          <TeamCard
            firstName="James Leo "
            photo="/images/james.jpg"
            lastName="Ocampo"
            fbLink="https://www.facebook.com/JAMES.ocampoGI"
            gLink="mailto:jamesocampogi04@gmail.com?"
          />
          <TeamCard
            firstName="Darrelle"
            lastName="Laizon"
            photo="/images/darelle.jpg"
            fbLink="https://www.facebook.com/JDlaizon.MachineGunKelly"
            gLink="mailto:Johndarrellelaizon@gmail.com"
          />
          <TeamCard
            firstName="Leona Grachelle"
            lastName="Buriel"
            photo="/images/leona.jpg"
            fbLink="https://www.facebook.com/sai.yona123#"
            gLink="mailto:tsmsaiyona@gmail.com"
          />
          <TeamCard
            lastName={"Paral"}
            firstName="Abbey Torres"
            photo="/images/abbey.jpg"
            fbLink="https://www.facebook.com/Abbeyahhh"
            gLink="mailto:abegailparal3@gmail.com"
          />
          <TeamCard firstName="Joel" lastName="Penaredondo" photo="" />
        </div>
      </section>

      <section className="flex flex-col items-center pb-8">
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
