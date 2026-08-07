import { useLocation } from "wouter";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { name: "Home", path: "/" },
  { name: "Features", path: "/features" },
  { name: "About", path: "/about" },
  { name: "FAQ", path: "/faq" },
];

export default function Navbar() {
  const [location, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location === path;

  return (
    <header className="sticky top-0 z-[1000] bg-white border-b border-gray-200">
      <div className="w-full px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => setLocation("/")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img
            src="https://res.cloudinary.com/dqsyzpxkg/image/upload/v1783590626/1000497503_dep9re.jpg"
            alt="Logo"
            className="w-9 h-9 rounded-md object-cover"
          />
          <div className="text-lg font-medium text-gray-900">
            Huzzler <span className="text-[#6D4AFF]">AI</span>
          </div>
        </div>

        {/* Center Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-10">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.path}
              onClick={() => setLocation(item.path)}
              className={`text-base transition-colors ${isActive(item.path)
                  ? "font-semibold text-[#6D4AFF]"
                  : "font-medium text-gray-600 hover:text-gray-900"
                }`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Right Actions - Desktop */}
        <div className="hidden md:flex items-center gap-5">
          <button
            onClick={() => { window.open("https://huzzler.app/", "_blank"); }}
            className="text-base text-gray-900 font-medium hover:text-[#6D4AFF] transition-colors"
          >
            Login
          </button>
          <button
            onClick={() => { window.open("https://play.google.com/store/apps/details?id=com.huzzler.app", "_blank"); }}
            className="bg-[#6D4AFF] text-white px-6 py-3 rounded-xl font-semibold text-[15px] hover:bg-[#5b3be8] transition-colors"
          >
            Get Started →
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center justify-center p-2 text-gray-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 border-t border-gray-200 bg-white shadow-xl">
          <div className="flex flex-col px-4 py-4 space-y-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  setLocation(item.path);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left text-lg ${isActive(item.path)
                    ? "font-semibold text-[#6D4AFF]"
                    : "font-medium text-gray-600"
                  }`}
              >
                {item.name}
              </button>
            ))}
            <div className="pt-4 flex flex-col gap-3 border-t border-gray-100">
              <button
                onClick={() => {
                  window.open("https://huzzler.app/", "_blank");
                  setIsMobileMenuOpen(false);
                }}
                className="text-left text-lg font-medium text-gray-900"
              >
                Login
              </button>
              <button
                onClick={() => {
                  window.open("https://play.google.com/store/apps/details?id=com.huzzler.app", "_blank");
                  setIsMobileMenuOpen(false);
                }}
                className="bg-[#6D4AFF] text-white text-center py-3 rounded-xl font-semibold"
              >
                Get Started →
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}