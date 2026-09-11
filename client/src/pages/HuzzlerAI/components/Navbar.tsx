import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const links = ["Our Story", "Mission", "Team", "How It Works", "Careers"];
  return (
    <header className="absolute top-0 left-0 right-0 z-[1000]">
      <div className="max-w-[1456px] mx-auto px-4 md:px-6 lg:px-10 flex items-center justify-between h-[88px]">
        <div className="text-white font-medium text-xl tracking-tight">
          Huzzler<span className="text-violet-400">AI</span>
        </div>
        <nav className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <a
              key={l}
              href="#"
              className="text-[14px] text-white/70 hover:text-white transition-colors"
            >
              {l}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://huzzler.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14px] font-medium text-white bg-white/10 rounded-full px-5 py-2.5 hover:bg-white/15 transition-colors"
          >
            Log In
          </a>
          <button
            onClick={() => window.open("https://play.google.com/store/apps/details?id=com.huzzler.app", "_blank")}
            className="text-[14px] font-semibold text-white bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full px-5 py-2.5 hover:opacity-90 transition-opacity"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center justify-center p-2 text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[88px] left-0 right-0 bg-[#1E1B4B] border-t border-white/10 shadow-xl">
          <div className="flex flex-col px-4 py-4 space-y-4">
            {links.map((l) => (
              <a
                key={l}
                href="#"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-left text-lg font-medium text-white/80 hover:text-white"
              >
                {l}
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-3 border-t border-white/10">
              <a
                href="https://huzzler.app/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-center text-lg font-medium text-white bg-white/10 rounded-xl px-5 py-3 hover:bg-white/15"
              >
                Log In
              </a>
              <button
                onClick={() => {
                  window.open("https://play.google.com/store/apps/details?id=com.huzzler.app", "_blank");
                  setIsMobileMenuOpen(false);
                }}
                className="text-center text-lg font-semibold text-white bg-gradient-to-r from-violet-500 to-indigo-500 rounded-xl px-5 py-3"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}