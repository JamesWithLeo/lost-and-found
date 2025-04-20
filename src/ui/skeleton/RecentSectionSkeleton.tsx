export default function RecentSectionSkeleton() {
  return (
    <main className="flex flex-col gap-2 md:grid md:grid-cols-3">
      <div className="flex h-max w-full gap-2">
        <div className="row-start-2 grid w-full grid-cols-3 gap-2 md:grid-cols-1 md:grid-rows-3 md:flex-col">
          <div className="grid h-20 w-full animate-pulse grid-cols-1 grid-rows-2 items-center gap-2 rounded bg-gray-100 p-2 sm:h-28 sm:w-full sm:p-4">
            <h1 className="mb-4 flex h-full w-20 items-baseline gap-2 rounded bg-gray-200 text-lg font-bold sm:text-3xl"></h1>
            <span className="h-3.5 min-h-3.5 w-28 bg-gray-200"></span>
          </div>

          <div className="grid h-20 w-full animate-pulse grid-cols-1 grid-rows-2 items-center gap-2 rounded bg-gray-100 p-2 sm:h-28 sm:w-full sm:p-4">
            <h1 className="mb-4 flex h-full w-20 items-baseline gap-2 rounded bg-gray-200 text-lg font-bold sm:text-3xl"></h1>
            <span className="h-3.5 min-h-3.5 w-28 bg-gray-200"></span>
          </div>
          <div className="grid h-20 w-full animate-pulse grid-cols-1 grid-rows-2 items-center gap-2 rounded bg-gray-100 p-2 sm:h-28 sm:w-full sm:p-4">
            <h1 className="mb-4 flex h-full w-20 items-baseline gap-2 rounded bg-gray-200 text-lg font-bold sm:text-3xl"></h1>
            <span className="h-3.5 min-h-3.5 w-28 bg-gray-200"></span>
          </div>
        </div>
      </div>

      <div className="grid h-full w-full animate-pulse grid-rows-[max-content_1fr_max-content] flex-col gap-2 rounded bg-gray-100 p-2">
        <span className="flex h-3.5 w-32 justify-between rounded bg-gray-200"></span>
        <div className="flex h-full grow flex-col gap-2 rounded bg-gray-200"></div>
        <span className="hidden h-3.5 grow-0 flex-col items-center rounded bg-gray-200 md:flex"></span>
      </div>

      <div className="grid h-full w-full animate-pulse grid-rows-[max-content_1fr_max-content] flex-col gap-2 rounded bg-gray-100 p-2">
        <span className="flex h-3.5 w-32 justify-between rounded bg-gray-200"></span>
        <div className="flex h-full grow flex-col gap-2 rounded bg-gray-200"></div>
        <span className="hidden h-3.5 grow-0 flex-col items-center rounded bg-gray-200 md:flex"></span>
      </div>
    </main>
  );
}
