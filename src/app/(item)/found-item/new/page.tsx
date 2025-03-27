import { authOptions } from "@/authOptions";
import PostFormItem from "@/ui/PostFormItem";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return <PostFormItem id={session?.user.id} />;
}
