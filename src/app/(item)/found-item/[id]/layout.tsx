import { authOptions } from "@/authOptions";
import { getItem } from "@/db/drizzle";
import { getServerSession } from "next-auth";

export default async function layout({
  children,
  params,
  watcher,
  modal,
}: {
  children: React.ReactNode;
  watcher: React.ReactNode;
  params: Promise<{ id: string }>;
  modal: React.ReactNode;
}) {
  const id = (await params).id;
  const session = await getServerSession(authOptions);
  const item = await getItem(id, "found");

  const isVisitor = !(item.data?.userId === session?.user.id);
  return (
    <>
      {isVisitor && modal}
      {isVisitor ? watcher : children}
    </>
  );
}
