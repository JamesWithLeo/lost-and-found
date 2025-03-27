import { authOptions } from "@/authOptions";
import PostFoundForm from "@/ui/PostFoundForm";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return <PostFoundForm id={session?.user.id} />;
}
