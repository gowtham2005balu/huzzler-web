import { useLocation } from "wouter";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const FEATURE_DROPDOWN_ITEMS = [
  { name: "Project Analytics", path: "/features/project-analytics" },
  { name: "AI Talent Matching", path: "/features/ai-talent-matching" },
  { name: "AI Assistant", path: "/features/ai-assistant" },
  { name: "Platform Features", path: "/features" },
  { name: "Portfolio Management", path: "/features/portfolio-management" },
];

export default function Navbar() {
  const [location, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isMobileFeaturesOpen, setIsMobileFeaturesOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isActive = (path: string) => location === path;
  const isFeaturesActive = location.startsWith("/features");

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsFeaturesOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsFeaturesOpen(false);
    }, 150);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsFeaturesOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFeaturesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleNavigate = (path: string) => {
    setLocation(path);
    setIsFeaturesOpen(false);
    setIsMobileMenuOpen(false);
  };

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
          {/* Home */}
          <button
            onClick={() => setLocation("/")}
            className={`text-base transition-colors ${
              isActive("/")
                ? "font-semibold text-[#6D4AFF]"
                : "font-medium text-gray-600 hover:text-gray-900"
            }`}
          >
            Home
          </button>

          {/* Features Dropdown Button */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => setIsFeaturesOpen((prev) => !prev)}
              aria-haspopup="true"
              aria-expanded={isFeaturesOpen}
              className={`text-base transition-colors flex items-center gap-1.5 py-2 cursor-pointer ${
                isFeaturesActive || isFeaturesOpen
                  ? "font-semibold text-[#6D4AFF]"
                  : "font-medium text-gray-600 hover:text-gray-900"
              }`}
            >
              <span>Features</span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  isFeaturesOpen ? "rotate-180 text-[#6D4AFF]" : "text-gray-400"
                }`}
              />
            </button>

            {/* Dropdown Menu Panel */}
            {isFeaturesOpen && (
              <div className="absolute top-full left-0 pt-2 w-[220px] z-[1100] animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="bg-white rounded-xl shadow-[0_12px_30px_rgba(0,0,0,0.1),0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 p-1.5 flex flex-col gap-0.5">
                  {FEATURE_DROPDOWN_ITEMS.map((item) => {
                    const isItemActive = location === item.path;

                    return (
                      <button
                        key={item.path}
                        onClick={() => handleNavigate(item.path)}
                        className={`w-full text-left px-3.5 py-2.5 text-[14px] rounded-lg transition-colors cursor-pointer ${
                          isItemActive
                            ? "bg-violet-50 text-[#6D4AFF] font-semibold"
                            : "text-gray-700 font-medium hover:text-[#6D4AFF] hover:bg-violet-50/60"
                        }`}
                      >
                        {item.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* About */}
          <button
            onClick={() => setLocation("/about")}
            className={`text-base transition-colors ${
              isActive("/about")
                ? "font-semibold text-[#6D4AFF]"
                : "font-medium text-gray-600 hover:text-gray-900"
            }`}
          >
            About
          </button>

          {/* FAQ */}
          <button
            onClick={() => setLocation("/faq")}
            className={`text-base transition-colors ${
              isActive("/faq")
                ? "font-semibold text-[#6D4AFF]"
                : "font-medium text-gray-600 hover:text-gray-900"
            }`}
          >
            FAQ
          </button>
        </nav>

        {/* Right Actions - Desktop */}
        <div className="hidden md:flex items-center gap-5">
          <button
            onClick={() => {
              window.open("https://huzzler.app/", "_blank");
            }}
            className="text-base text-gray-900 font-medium hover:text-[#6D4AFF] transition-colors"
          >
            Login
          </button>
          <button
            onClick={() => {
              window.open(
                "https://play.google.com/store/apps/details?id=com.huzzler.app",
                "_blank"
              );
            }}
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
        <div className="md:hidden absolute top-16 left-0 right-0 border-t border-gray-200 bg-white shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="flex flex-col px-4 py-4 space-y-4">
            {/* Mobile Home */}
            <button
              onClick={() => handleNavigate("/")}
              className={`text-left text-lg ${
                isActive("/")
                  ? "font-semibold text-[#6D4AFF]"
                  : "font-medium text-gray-600"
              }`}
            >
              Home
            </button>

            {/* Mobile Features Accordion */}
            <div>
              <button
                onClick={() =>
                  setIsMobileFeaturesOpen((prev) => !prev)
                }
                className={`w-full flex items-center justify-between text-left text-lg ${
                  isFeaturesActive
                    ? "font-semibold text-[#6D4AFF]"
                    : "font-medium text-gray-600"
                }`}
              >
                <span>Features</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-200 ${
                    isMobileFeaturesOpen
                      ? "rotate-180 text-[#6D4AFF]"
                      : "text-gray-400"
                  }`}
                />
              </button>

              {isMobileFeaturesOpen && (
                <div className="mt-2 pl-3 flex flex-col gap-1 border-l-2 border-violet-100 ml-1">
                  {FEATURE_DROPDOWN_ITEMS.map((item) => {
                    const isItemActive = location === item.path;

                    return (
                      <button
                        key={item.path}
                        onClick={() => handleNavigate(item.path)}
                        className={`text-left py-2 px-2 text-[15px] rounded-lg transition-colors ${
                          isItemActive
                            ? "text-[#6D4AFF] font-semibold bg-violet-50/80"
                            : "text-gray-600 font-medium hover:text-[#6D4AFF]"
                        }`}
                      >
                        {item.name}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Mobile About */}
            <button
              onClick={() => handleNavigate("/about")}
              className={`text-left text-lg ${
                isActive("/about")
                  ? "font-semibold text-[#6D4AFF]"
                  : "font-medium text-gray-600"
              }`}
            >
              About
            </button>

            {/* Mobile FAQ */}
            <button
              onClick={() => handleNavigate("/faq")}
              className={`text-left text-lg ${
                isActive("/faq")
                  ? "font-semibold text-[#6D4AFF]"
                  : "font-medium text-gray-600"
              }`}
            >
              FAQ
            </button>

            {/* Mobile Actions */}
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
                  window.open(
                    "https://play.google.com/store/apps/details?id=com.huzzler.app",
                    "_blank"
                  );
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