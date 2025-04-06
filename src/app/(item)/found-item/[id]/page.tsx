import { authOptions } from "@/authOptions";
import { getClaims, getFoundItem, getUserSafe } from "@/db/drizzle";
import ChevBack from "@/ui/ChevBack";
import FileOwnershipButton from "@/ui/FileOwnershipButton";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { formatDistanceToNowStrict } from "date-fns";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ClaimantCard from "@/ui/ClaimantCard";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const { data: item } = { ...(await getFoundItem(id)) };
  const session = await getServerSession(authOptions);
  const samaritan: null | {
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
  } | null = await getUserSafe(item?.userId);

  const claims = await getClaims(id);
  const submittedOwnership = claims.some(
    (claim) => claim.userId === session?.user.id,
  );

  return (
    <main className="grid h-max flex-col items-center gap-4">
      <span className="flex w-full items-center gap-6 py-2 text-sm text-gray-600">
        <span className="flex h-max w-full flex-row text-sm text-gray-600">
          <ChevBack label={`${samaritan ? "result" : "found-item"}`} />
        </span>
        {samaritan && (
          <div className="flex w-full grid-cols-2 items-end justify-end gap-2">
            <FileOwnershipButton
              itemId={id}
              disabled={submittedOwnership || session?.user.id === samaritan.id}
            />
          </div>
        )}
      </span>
      <section className="grid h-52 w-full max-w-[1440px] grid-cols-[30%_70%] gap-2 rounded border border-gray-300 bg-white p-2">
        <div className="overflow-hidden bg-gray-100">
          {item?.itemProof?.length && item.itemProof[0] && (
            <Image
              src={item.itemProof[0]}
              width={100}
              height={100}
              alt={`proof-${item.itemName}`}
              className="h-full w-full"
            />
          )}
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex w-full justify-between">
            <span>
              <h1>
                Found by{" "}
                {samaritan
                  ? `${samaritan.firstName} ${samaritan.lastName}`
                  : `You`}
              </h1>

              {item?.createdAt && (
                <>
                  <h1 className="text-xs text-gray-500">
                    posted:
                    {formatDistanceToNowStrict(new Date(item.createdAt))} ago
                  </h1>
                </>
              )}
            </span>
            <button className="flex h-max cursor-pointer items-start p-2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-share-2"
              >
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
              </svg>
            </button>
          </div>
          <span>
            <h1 className="text-sm md:text-[16px]">{item?.itemName}</h1>
            <h1 className="text-xs text-gray-500">{item?.id}</h1>
          </span>
          <span>
            <h1 className="text-primary text-xs font-light">Category</h1>
            <h1>{item?.category}</h1>
          </span>
          <span>
            <h1 className="text-primary text-xs font-light">
              Found location and time
            </h1>
            <h1 className="text-sm">
              {item?.location}{" "}
              {item?.timeDate &&
                `at ${new Date(item?.timeDate).toLocaleString()}`}
            </h1>
          </span>
        </div>
      </section>
      <section className="mt-16 h-full w-full">
        <Tabs defaultValue="claimants" className="">
          <TabsList className="gap-1 rounded shadow-none md:w-1/3">
            <TabsTrigger value="claimants" className="tabs-trigger rounded">
              Claimants
            </TabsTrigger>
            {/* todo : add new tabs */}
            {/* <TabsTrigger value="more" className="tabs-trigger rounded">
              more
            </TabsTrigger> */}
          </TabsList>

          <TabsContent value="claimants" className="bg-white">
            {claims.map((claim) => (
              <ClaimantCard
                key={`${claim.itemId}-${claim.userId}`}
                claim={claim}
                isCurrentUser={claim.userId === session?.user.id}
              />
            ))}
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
