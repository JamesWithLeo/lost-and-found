import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession();
  if (!session) {
    redirect("/discovery");
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-items-center"></div>
  );
}
