import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getClaims } from "@/db/drizzle";
import { TabsContent } from "@radix-ui/react-tabs";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const claims = await getClaims(id);

  return (
    <section className="h-full w-full">
      <Tabs defaultValue="claimants" className="">
        <TabsList className="gap-1 rounded shadow-none md:w-1/3">
          <TabsTrigger value="claimants" className="tabs-trigger rounded">
            Claimants
          </TabsTrigger>
          <TabsTrigger value="more" className="tabs-trigger rounded">
            more
          </TabsTrigger>
        </TabsList>

        <TabsContent value="claimants" className="bg-white">
          {claims.map((claim) => (
            <span
              key={`${claim.itemId}-${claim.userId}`}
              className="grid grid-cols-[2fr_1fr_1fr] rounded border p-2"
            >
              <h1>{claim.userId}</h1>
              <h1>{claim.caption}</h1>
              <h1>{claim.createdAt?.toDateString()}</h1>
            </span>
          ))}
        </TabsContent>
      </Tabs>
    </section>
  );
}
