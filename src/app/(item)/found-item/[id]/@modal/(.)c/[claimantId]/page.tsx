import { getClaim } from "@/db/drizzle";
import Modal from "@/ui/Modal";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; claimantId: string }>;
}) {
  const { id, claimantId } = await params;
  const { claims, claimant } = await getClaim(id, claimantId);
  return (
    <Modal>
      <main className="flex h-max w-full grid-rows-[min-content_1fr_min-content] flex-col gap-4 p-8 md:grid md:h-full">
        <section className="grid w-full grid-cols-1 grid-rows-2 gap-8 md:grid-cols-[min-content_1fr] md:grid-rows-1">
          <div className="w-full text-nowrap">
            <h1 className="text-xl">&ldquo;{claims.caption}&ldquo;</h1>
            <h1>
              {claimant.firstName} {claimant.lastName}
            </h1>

            <h1 className="text-xs text-gray-400">
              {new Date(claims.createdAt).toDateString()}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {claims.proof?.length &&
              claims.proof.map((proof, index) =>
                proof ? (
                  <Image
                    key={`${claims.itemId}-${index}`}
                    src={proof}
                    alt={`${claims.itemId}-${index}`}
                    width={100}
                    height={100}
                  />
                ) : (
                  <div
                    key={`${claims.itemId}-${index}`}
                    className="rounded border p-4 text-gray-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-image-off-icon lucide-image-off"
                    >
                      <line x1="2" x2="22" y1="2" y2="22" />
                      <path d="M10.41 10.41a2 2 0 1 1-2.83-2.83" />
                      <line x1="13.5" x2="6" y1="13.5" y2="21" />
                      <line x1="18" x2="21" y1="12" y2="15" />
                      <path d="M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59" />
                      <path d="M21 15V5a2 2 0 0 0-2-2H9" />
                    </svg>
                  </div>
                ),
              )}
          </div>
        </section>

        <div className="flex flex-col gap-4">
          <span>
            <h1 className="text-lg">Possible Feature</h1>
            {claims.distinctFeature}
          </span>
          <span>
            <h1 className="text-lg">How {claimant.firstName} lost this </h1>
            {claims.desc}
          </span>
        </div>
        <div className="grid w-full grid-cols-2 gap-4 md:w-max">
          <button className="text-primary cursor-pointer rounded border p-4 hover:bg-gray-50 hover:shadow">
            Approved
          </button>
          <button className="cursor-pointer rounded border bg-red-400 p-4 text-white hover:shadow">
            Not the owner
          </button>
        </div>
      </main>
    </Modal>
  );
}
