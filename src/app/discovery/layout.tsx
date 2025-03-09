import Header from "@/components/server/headers/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />

      {children}
    </>
  );
}
