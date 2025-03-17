import { useParams } from "next/navigation";

export default function QuickSearchResult() {
  const params = useParams();
  const id = params.id;
  return <h1>Item id: {id}</h1>;
}
