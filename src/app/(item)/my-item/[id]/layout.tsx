import { authOptions } from "@/authOptions";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getItem } from "@/db/drizzle";
import MyItemHeader from "@/ui/MyItemHeader";
import { MyItemSidebar } from "@/ui/MyItemSidebar";
import { getServerSession } from "next-auth";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const session = await getServerSession(authOptions);
  const { data: item } = await getItem(id, "lost");
  return (
    <>
      <SidebarProvider defaultOpen className="flex flex-col">
        <MyItemHeader
          isAuth={!!session?.user.id}
          photoUrl={session?.user.image}
        />
        <main className="flex flex-1">
          <MyItemSidebar item={item} />
          <SidebarInset className="w-full">{children}</SidebarInset>
        </main>
      </SidebarProvider>
    </>
  );
}
