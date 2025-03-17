"use client";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function PsOverview() {
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    console.log(id);
  }, [id]);
  return (
    <div>
      <h1>Ps overview</h1>
    </div>
  );
}
