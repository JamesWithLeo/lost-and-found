import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import Link from "next/link";

export default function TeamCard({
  firstName,
  photo,
  lastName,
  fbLink,
  gLink,
}: {
  firstName: string;
  lastName: string;
  photo?: string;
  fbLink?: string;
  gLink?: string;
}) {
  return (
    <div className="grid h-[333px] w-[250px] grid-cols-3 grid-rows-[1fr_.5fr_.5fr] flex-col items-center rounded bg-slate-50 pb-4 shadow">
      {photo && (
        <div className="col-span-3 col-start-1 row-start-1 flex h-full w-full flex-col items-center overflow-hidden">
          <Image
            src={photo!}
            width={100}
            height={100}
            alt={firstName}
            className="grayscale-30 brightness-60 w-full rounded-t bg-bottom"
          />
        </div>
      )}
      <div className="col-start-2 row-span-2 row-start-1 mb-8 flex h-[60px] w-[60px] flex-col items-center rounded-full">
        <Avatar className="h-full w-full">
          <AvatarImage src={photo} alt={firstName} className="" />
          <AvatarFallback className="text-primary bg-white text-2xl font-bold">
            {firstName[0]}
            {lastName[0]}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="col-span-3 col-start-1 row-start-2 flex w-full flex-col items-center">
        <h1 className="mb-2 flex text-lg font-medium">
          {firstName} {lastName}
        </h1>
      </div>
      <span
        className={`text-primary col-start-2 row-start-3 flex w-full justify-center gap-4`}
      >
        <Link href={fbLink ?? ""}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm53.66,93.66-32,32a8,8,0,0,1-11.32,0L112,123.31,85.66,149.66a8,8,0,0,1-11.32-11.32l32-32a8,8,0,0,1,11.32,0L144,132.69l26.34-26.35a8,8,0,0,1,11.32,11.32Z"></path>
          </svg>
        </Link>

        <Link href={gLink ?? ""}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM98.71,128,40,181.81V74.19Zm11.84,10.85,12,11.05a8,8,0,0,0,10.82,0l12-11.05,58,53.15H52.57ZM157.29,128,216,74.18V181.82Z"></path>
          </svg>
        </Link>
      </span>
    </div>
  );
}
