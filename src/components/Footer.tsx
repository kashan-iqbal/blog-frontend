import Link from "next/link";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">About This Blog</h3>
            <p className="text-gray-600">
              A personal space where I share my thoughts, experiences, and
              insights about technology, programming, and everything that
              inspires me.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="https://github.com/kashan-iqbal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-indigo-600"
                aria-label="GitHub profile of Kashan Iqbal"
              >
                <Github size={20} />
              </a>

              <a
                href="https://www.linkedin.com/in/kashan-iqbal-2b051a24a/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-indigo-600"
                aria-label="LinkedIn profile of Kashan Iqbal"
              >
                <Linkedin size={20} />
              </a>

              <a
                href="mailto:kashan.tech.io@gmail.com"
                className="text-gray-500 hover:text-indigo-600"
                aria-label="Send an email to Kashan Iqbal"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Quick Links</h3>
            <ul className="space-y-2">
              <li></li>
              <li>
                <Link
                  href="/projects"
                  className="text-gray-600 hover:text-indigo-600"
                >
                  My Projects
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-600 hover:text-indigo-600">
                  All Posts
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-indigo-600"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-indigo-600"
                >
                  Term & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-indigo-600"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-600 hover:text-indigo-600"
                >
                  privacy-policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Stay Updated</h3>
            <p className="text-gray-600">
              Subscribe to my newsletter to get notified about new posts and
              updates.
            </p>
            <form className="mt-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 flex-grow"
                  required
                />
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © {currentYear} Your Blog Name. All rights reserved.
          </p>
          <div className="flex items-center mt-4 sm:mt-0 text-sm text-gray-600">
            <span>Built with</span>
            <Heart size={16} className="mx-1 text-red-500" />
            <span>using Next.js & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
