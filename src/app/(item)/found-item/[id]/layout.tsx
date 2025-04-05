export default function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {modal}
      <main className="grid min-h-dvh w-full flex-col gap-4 bg-slate-50 px-[1.5rem] py-10 sm:px-8 md:px-48">
        {children}
      </main>
    </>
  );
}
