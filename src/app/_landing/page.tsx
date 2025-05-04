import Link from "next/link";

export default function page() {
  return (
    <>
      <div className="relativ  bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 h-screen overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 h-screen  z-0">
          <div className="absolute opacity-10">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
            <div className="grid grid-cols-6 h-full w-full">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="border-r border-indigo-500/10 h-full"
                ></div>
              ))}
            </div>
            <div className="grid grid-rows-6 h-full w-full">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="border-b border-indigo-500/10 w-full"
                ></div>
              ))}
            </div>
          </div>

          {/* Circuit-like dots */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400/70 rounded-full animate-pulse"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          {/* Nav */}
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center space-x-3">
              <span className="bg-black text-white px-2 py-1 font-bold rounded">
                DEV
              </span>
              <span className="bg-emerald-400 text-black px-3 py-1 font-bold rounded">
                BLOG
              </span>
            </div>

            <div className=" md:flex space-x-8">
              <Link
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Articles
              </Link>
              <Link
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Tutorials
              </Link>
              <Link
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Resources
              </Link>
              <Link
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                About
              </Link>
            </div>

            <button className="md:hidden text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Hero Content */}
            <div className="w-full md:w-1/2 mb-12 md:mb-0">
              <div className="relative mb-4 inline-flex items-center">
                <span className="bg-indigo-600/20 text-indigo-200 text-sm px-3 py-1 rounded-full">
                  Developer Community
                </span>
                <span className="ml-2 w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
                <span className="block">Code. Create.</span>
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Connect.
                </span>
              </h1>

              <p className="text-gray-300 text-xl mb-8 max-w-xl">
                A community where developers share knowledge, tutorials, and
                insights about the latest in web development, cloud computing,
                and programming.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg hover:shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300">
                  Latest Articles
                </button>
                <button className="px-6 py-3 border border-blue-500 text-blue-400 font-medium rounded-lg hover:bg-blue-500/10 transition-all duration-300">
                  Subscribe
                </button>
              </div>

              <div className="flex items-center mt-8 space-x-6">
                <div className="flex items-center text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <span>10K+ Weekly Readers</span>
                </div>

                <div className="flex items-center text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>New articles daily</span>
                </div>
              </div>
            </div>

            {/* Featured Post Card */}
            <div className="w-full md:w-5/12">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
                <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
                  <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                  <div className="absolute bottom-4 left-4 bg-emerald-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    FEATURED
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Getting Started with Next.js and Tailwind CSS in 2025
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Learn how to set up a modern development environment and
                    build responsive interfaces using the latest features.
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 mr-3"></div>
                      <span className="text-gray-300 text-sm">
                        Sarah Developer
                      </span>
                    </div>

                    <div className="text-gray-400 text-sm">April 10, 2025</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-16 flex items-center justify-center flex-wrap gap-3">
            {[
              "nextjs",
              "react",
              "typescript",
              "tailwindcss",
              "javascript",
              "webdev",
            ].map((tag) => (
              <span
                key={tag}
                className="bg-blue-900/30 text-blue-300 px-3 py-1 text-sm rounded-full hover:bg-blue-800/50 cursor-pointer transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
