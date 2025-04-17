import { authOptions } from "@/authOptions";
import ItemForm from "@/ui/ItemForm";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return <ItemForm id={session?.user.id} type="found" />;
}
