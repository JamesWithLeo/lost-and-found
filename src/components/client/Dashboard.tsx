"use client";
import { SessionProvider } from "next-auth/react";
import Name from "./name";

export default function Dashboard() {
  return (
    <SessionProvider>
      <Name />
    </SessionProvider>
  );
}
