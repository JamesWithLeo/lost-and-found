import SignupHeader from "@/components/server/headers/SignUpheader";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full">
      <SignupHeader />
      {children}
    </main>
  );
}
