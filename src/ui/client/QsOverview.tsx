"use client";
import { useParams } from "next/navigation";

export default function QsOverview() {
  const params = useParams();
  const id = params.id as string;
  return (
    <div>
      <h1>Item ID: {id}</h1>
    </div>
  );
}
