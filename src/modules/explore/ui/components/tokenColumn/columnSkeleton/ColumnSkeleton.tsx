export function ColumnSkeleton() {
  return (
    <>
      {Array.from({ length: 4 }, (_, index) => (
        <div
          key={index}
          className="h-[112px] mb-2 animate-pulse rounded-lg border border-zinc-800/70 bg-[#131313]"
        />
      ))}
    </>
  )
}
