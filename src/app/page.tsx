import { redirect } from "next/navigation";

export default async function Page() {
  const isLoggedIn = true;
  if (!isLoggedIn) {
    redirect("/discovery");
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-items-center"></div>
  );
}
