import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Dashboard from "@/components/client/Dashboard";
import { option } from "./api/auth/[...nextauth]/route";

export default async function Page() {
  const session = await getServerSession(option);
  console.log("session in server:", session);
  if (!session) {
    redirect("/discovery");
  }
  if (session.user.isCompletedAccount === false) {
    redirect("/signup");
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-items-center">
      <h1>Welcome back,</h1>
      <h1>{session.user.id}</h1>
      <Dashboard />
    </div>
  );
}
