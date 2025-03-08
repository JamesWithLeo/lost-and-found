import Header from "../../components/server/headers/header";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full">
      <Header />
      {children}
    </main>
  );
}
