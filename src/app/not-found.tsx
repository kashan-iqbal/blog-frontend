import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-50 to-white mx-2">
      <div className="text-center p-8 rounded-lg shadow-xl from-indigo-50 to-whitemax-w-md mx-auto border border-indigo-500">
        <h1 className="text-6xl font-bold mb-2 text-indigo-400">404</h1>
        <div className="w-24 h-1 from-indigo-50 to-white mx-auto mb-6"></div>

        <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>

        <p className="mb-8 text-indigo-300">
          Oops! The page you are looking for doesn&apos;t seem to exist.
        </p>

        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors duration-300 shadow-lg hover:shadow-indigo-500/50"
        >
          Go Home
        </Link>
      </div>

      {/* Optional decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full bg-indigo-600 opacity-10 blur-xl"></div>
      <div className="absolute bottom-1/3 right-1/4 w-32 h-32 rounded-full bg-indigo-500 opacity-10 blur-xl"></div>
    </div>
  );
}
