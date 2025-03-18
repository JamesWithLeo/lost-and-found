import { getServerSession } from "next-auth";
import { authOptions } from "@/authOptions";
import ItemForm from "@/ui/ItemForm";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | undefined;
  }>;
}) {
  const session = await getServerSession(authOptions);
  const {
    itemName,
    brandModel,
    location,
    timeDate,
    color,
    category,
    desc,
    caption,
  } = await searchParams;
  return (
    <>
      <ItemForm
        id={session?.user.id}
        value={{
          itemName,
          brandModel,
          location,
          timeDate,
          color,
          category,
          desc,
          caption,
        }}
      />
    </>
  );
}
