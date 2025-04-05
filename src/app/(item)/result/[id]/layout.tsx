import ChevBack from "@/ui/ChevBack";

export default function Layout({
  children,
  modal,
  claims,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  claims: React.ReactNode;
}) {
  return (
    <>
      {modal}
      <main className="grid min-h-dvh w-full grid-rows-[min-content_1fr_1fr] flex-col gap-4 bg-slate-50 px-[1.5rem] py-10 sm:px-8 md:px-48">
        <span className="flex h-max w-full flex-row text-sm text-gray-600">
          <ChevBack label="result" />
        </span>
        {children}
        {claims}
      </main>
    </>
  );
}
