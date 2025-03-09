import ReportHeader from "@/components/server/ReportHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ReportHeader />
      {children}
    </>
  );
}
