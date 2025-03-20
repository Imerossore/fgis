export default function DivisionComponent() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-3 grid-rows-2">
      {Array(8)
        .fill(null)
        .map((_, i) => (
          <div
            key={i}
            className="rounded-lg border bg-card p-4 shadow-sm flex flex-col h-[150px]"
          ></div>
        ))}
    </section>
  );
}
