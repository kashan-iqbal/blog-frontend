// app/blog/loading.tsx
export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">My Blog</h1>
      <div className="flex flex-wrap justify-center items-center gap-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="w-full md:w-[45%] lg:w-[30%] xl:w-[30%]">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg h-full flex flex-col">
              <div className="relative w-full aspect-video bg-gray-200 animate-pulse"></div>
              <div className="p-4 flex-grow flex flex-col">
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mb-3"></div>
                <div className="flex items-center mb-3">
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-16 mr-2"></div>
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-16"></div>
                </div>
                <div className="flex items-center mt-auto">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
