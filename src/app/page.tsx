// app/page.tsx
import { SkeletonCard } from "@/components/skeleton";
import Cards from "@/features/post/card/Card";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="container mx-auto px-1 py-8 mt-30">
      <Suspense
        fallback={
          <div className="flex flex-wrap justify-center items-center gap-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        }
      >
        <Cards />
      </Suspense>
    </div>
  );
}
