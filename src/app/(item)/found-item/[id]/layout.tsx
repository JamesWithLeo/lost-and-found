import { authOptions } from "@/authOptions";
import { getItem } from "@/db/drizzle";
import { getServerSession } from "next-auth";

export default async function layout({
  children,
  params,
  watcher,
}: {
  children: React.ReactNode;
  watcher: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const session = await getServerSession(authOptions);
  const item = await getItem(id, "found");

  return <>{item.data?.userId === session?.user.id ? children : watcher}</>;
}
