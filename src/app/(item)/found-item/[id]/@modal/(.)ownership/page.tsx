import { authOptions } from "@/authOptions";
import { getFoundItem, getUserSafe } from "@/db/drizzle";
import FileOwnershipForm from "@/ui/FileOwnershipForm";
import Modal from "@/ui/Modal";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const targetId = (await cookies()).get("targetItemId")?.value;
  const session = await getServerSession(authOptions);
  if (!targetId || !session) {
    redirect("/found-item/"); // todo : add 404
  }
  const { data: item } = await getFoundItem(targetId);
  const samaritan = await getUserSafe(item?.userId);
  const user = await getUserSafe(session?.user.id);
  if (!item || !samaritan || !user) {
    redirect("/found-item/"); // todo :add 404
  }
  return (
    <Modal>
      <div className="grid h-full w-full grid-cols-1 grid-rows-[1fr_10fr] rounded-r-2xl pb-8">
        <div className="sticky top-0 flex h-[5rem] w-full items-center border-b px-8 py-2 backdrop-blur-lg">
          <h1 className="text-primary text-2xl font-bold">File Ownership</h1>
        </div>

        <FileOwnershipForm item={item} samaritan={samaritan} user={user} />
      </div>
    </Modal>
  );
}
