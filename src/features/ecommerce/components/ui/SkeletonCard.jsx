export default function SkeletonCard() {
  return (
    <div className="flex flex-col rounded-2xl border border-stone-200 bg-white shadow-md animate-pulse overflow-hidden">
      {/* Image placeholder — matches aspect-[4/3] of real card */}
      <div className="w-full aspect-4/3 bg-gray-200" />

      {/* Content area */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-4 w-3/4 rounded-full bg-gray-200" />
        {/* Description line 1 */}
        <div className="h-3 w-full rounded-full bg-gray-200" />
        {/* Description line 2 */}
        <div className="h-3 w-2/3 rounded-full bg-gray-200" />

        {/* Price row */}
        <div className="flex items-center justify-between pt-2">
          <div className="h-5 w-1/3 rounded-full bg-gray-200" />
          <div className="h-5 w-14 rounded-full bg-gray-200" />
        </div>

        {/* Button */}
        <div className="h-10 w-full rounded-xl bg-gray-200" />
      </div>
    </div>
  );
}
