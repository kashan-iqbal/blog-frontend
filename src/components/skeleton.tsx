// components/SkeletonCard.tsx
export function SkeletonCard() {
  return (
    <div className="w-full md:w-[45%] lg:w-[30%] xl:w-[26%] animate-pulse">
      {/* Image placeholder */}
      <div className="bg-gray-200 aspect-video rounded-lg" />

      {/* Content placeholder */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-5 bg-gray-200 rounded w-4/5" />

        {/* Tags */}
        <div className="flex gap-2">
          <div className="h-4 bg-gray-200 rounded w-16" />
          <div className="h-4 bg-gray-200 rounded w-12" />
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-2">
          <div className="h-3 bg-gray-200 rounded w-24" />
          <div className="h-3 bg-gray-200 rounded w-16" />
        </div>
      </div>
    </div>
  );
}
