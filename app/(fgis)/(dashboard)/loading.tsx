import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="grid grid-cols-1 space-y-5">
      <section>
        <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array(8)
            .fill(null)
            .map((_, i) => (
              <div key={i} className="transition-all duration-300 ease-in-out">
                <div className="rounded-xl p-4 border shadow-sm bg-card/30">
                  <div className="flex md:flex-col md:h-[11dvh]">
                    <div className="flex-grow md:flex-none">
                      <Skeleton className="h-6 md:h-7 w-[80%]" />
                    </div>

                    <div className="flex items-center md:hidden ml-3">
                      <Skeleton className="h-5 w-5 rounded-full" />
                    </div>

                    <div className="hidden md:flex md:justify-center md:w-full md:mt-auto">
                      <Skeleton className="h-9 w-[120px] rounded-md" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array(2)
          .fill(null)
          .map((_, i) => (
            <div
              key={i}
              className="rounded-lg border bg-card p-5 shadow-sm flex flex-col h-full"
            >
              <div className="flex-none flex items-center justify-between mb-4">
                <Skeleton className="h-5 w-[150px]" />
                <div className="flex gap-2">
                  {i === 0 ? (
                    <>
                      <Skeleton className="h-8 w-8 rounded" />
                      <Skeleton className="h-8 w-8 rounded" />
                    </>
                  ) : (
                    <Skeleton className="h-8 w-24 rounded" />
                  )}
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <Skeleton className="h-full w-full rounded min-h-[180px] lg:min-h-[220px]" />
              </div>
            </div>
          ))}
      </section>
    </div>
  );
}
