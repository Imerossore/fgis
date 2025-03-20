import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="p-3 pl-0 flex flex-col h-[calc(100dvh-80px)]">
      <div className="h-[40dvh] overflow-y-auto pb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
          {Array(8)
            .fill(null)
            .map((_, i) => (
              <div
                key={i}
                className="rounded-lg border bg-card p-4 shadow-sm flex flex-col h-[150px]"
              >
                <div className="flex-none">
                  <Skeleton className="h-7 w-[80%]" />
                </div>
                <div className="flex-grow"></div>
                <div className="flex-none flex justify-center mt-auto">
                  <Skeleton className="h-9 w-[120px] rounded-md" />{" "}
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div className="rounded-lg border bg-card p-5 shadow-sm flex flex-col h-full">
          <div className="flex-none flex items-center justify-between mb-4">
            <Skeleton className="h-5 w-[180px]" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-8 rounded" />
              <Skeleton className="h-8 w-8 rounded" />
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <Skeleton className="h-full w-full rounded min-h-[180px]" />
          </div>
        </div>

        <div className="rounded-lg border bg-card p-5 shadow-sm flex flex-col h-full">
          <div className="flex-none flex items-center justify-between mb-4">
            <Skeleton className="h-5 w-[150px]" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-24 rounded" />
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <Skeleton className="h-full w-full rounded min-h-[180px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
