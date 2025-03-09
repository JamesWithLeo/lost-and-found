import LocateHeader from "@/components/server/headers/LocateHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LocateHeader />
      {children}
    </>
  );
}
