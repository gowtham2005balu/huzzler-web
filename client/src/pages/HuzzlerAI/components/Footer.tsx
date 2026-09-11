import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Instagram, Youtube } from "lucide-react";
import { useLocation } from "wouter";

const Footer: React.FC = () => {
  const [, setLocation] = useLocation();
  return (
    <footer className="relative text-white pt-0 bg-transparent flex flex-col">
      {/* Inline Keyframes Style for 100% Reliable Hardware-Accelerated Wave Animation */}
      <style>{`
        @keyframes hzFooterWave {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>

      {/* Top Wave Curve Divider pulled up to overlap previous section's background */}
      <div className="w-full overflow-hidden leading-none bg-transparent relative h-20 md:h-32 -mt-20 md:-mt-32 z-10 shrink-0">
        {/* Main Dark Footer Wave Container */}
        <div
          className="relative w-[200%] h-full flex pointer-events-none z-10"
          style={{ animation: "hzFooterWave 8s linear infinite", willChange: "transform" }}
        >
          <svg className="w-1/2 h-full text-[#080811] fill-current" viewBox="0 0 2880 200" preserveAspectRatio="none">
            <path d="M 0 100 Q 360 160 720 100 T 1440 100 Q 1800 160 2160 100 T 2880 100 L 2880 200 L 0 200 Z" />
          </svg>
          <svg className="w-1/2 h-full text-[#080811] fill-current" viewBox="0 0 2880 200" preserveAspectRatio="none">
            <path d="M 0 100 Q 360 160 720 100 T 1440 100 Q 1800 160 2160 100 T 2880 100 L 2880 200 L 0 200 Z" />
          </svg>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="bg-[#080811] w-full z-20 relative">
        <div className="max-w-[1380px] mx-auto px-8 pt-10 pb-2">
          {/* Main Columns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12">
            {/* Brand & Action Buttons */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://res.cloudinary.com/dqsyzpxkg/image/upload/v1783590626/1000497503_dep9re.jpg"
                  alt="Logo"
                  className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-[#6C5CE7]/30"
                />
                <span className="text-2xl font-thin text-white tracking-tight">Huzzler</span>
              </div>
              <p className="text-[#94A3B8] text-sm leading-relaxed max-w-sm mb-6">
                Connecting talented freelancers with businesses that need quality work.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
                <button
                  onClick={() => window.open("https://play.google.com/store/apps/details?id=com.huzzler.app", "_blank")}
                  className="bg-[#FFCC00] hover:bg-[#E6B800] text-black font-medium text-sm px-5 py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-md w-full sm:w-auto cursor-pointer"
                >
                  Get Started <span className="text-sm font-mono font-medium">↗</span>
                </button>
                <button
                  onClick={() => window.open("https://huzzler.app/freelance-dashboard/browse-projects", "_blank")}
                  className="border border-[#1E2235] bg-[#121422] hover:bg-[#1A1D30] text-white font-semibold text-sm px-5 py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all w-full sm:w-auto cursor-pointer"
                >
                  Browse Talent <span className="text-sm font-mono font-medium">↗</span>
                </button>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-2.5 flex-wrap">
                {[
                  { label: "in", icon: <Linkedin size={18} />, link: "https://www.linkedin.com/company/huzzler-io/" },
                  { label: "X", icon: "𝕏", link: "https://x.com/Huzzler_app" },
                  { label: "Instagram", icon: <Instagram size={18} />, link: "https://www.instagram.com/huzzler_official?igsh=MW93aDYzbXE3dDZ4Zg%3D%3D&utm_source=qr" },
                  { label: "YouTube", icon: <Youtube size={18} />, link: "https://www.youtube.com/@Huzzler_Official" }
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-[#121422] border border-[#1E2235] text-[#94A3B8] hover:text-white hover:border-[#6C5CE7] transition-all flex items-center justify-center text-sm font-semibold cursor-pointer shrink-0"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <div className="flex items-center gap-2 text-white font-thin text-base mb-5">
                Categories
              </div>
              <ul className="space-y-3.5 text-sm text-[#94A3B8]">
                {[
                  "Graphics & Design",
                  "Programming & Tech",
                  "Digital Marketing",
                  "Video & Animation",
                  "Writing & Translation",
                  "AI Services",
                  "Music & Audio",
                  "Data & Analytics",
                  "Business",
                  "Photography",
                  "Personal Growth",
                  "Finance"
                ].map((cat) => (
                  <li
                    key={cat}
                    onClick={() => window.open("https://huzzler.app/freelance-dashboard/browse-projects", "_blank")}
                    className="hover:text-white cursor-pointer transition-colors max-w-[160px]"
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            </div>

            {/* Platform */}
            <div>
              <div className="flex items-center gap-2 text-white font-thin text-base mb-5">
                Platform
              </div>
              <ul className="space-y-3.5 text-sm text-[#94A3B8]">
                {["Find Talent", "Find Work", "Categories"].map((item) => (
                  <li
                    key={item}
                    onClick={() => window.open("https://huzzler.app/freelance-dashboard/browse-projects", "_blank")}
                    className="flex items-center justify-between hover:text-white cursor-pointer transition-colors group max-w-[140px]"
                  >
                    <span>{item}</span>
                    <span className="text-xs text-[#475569] group-hover:text-white transition-colors">›</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <div className="flex items-center gap-2 text-white font-thin text-base mb-5">
                Resources
              </div>
              <ul className="space-y-3.5 text-sm text-[#94A3B8]">
                {["Help Center", "Blog"].map((item) => (
                  <li
                    key={item}
                    onClick={() => {
                      if (item === "Blog") {
                        window.location.href = "https://huzzler-blog.vercel.app/";
                      } else if (item === "Help Center") {
                        setLocation("/faq");
                      }
                    }}
                    className="flex items-center justify-between hover:text-white cursor-pointer transition-colors group max-w-[140px]"
                  >
                    <span>{item}</span>
                    <span className="text-xs text-[#475569] group-hover:text-white transition-colors">›</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <div className="flex items-center gap-2 text-white font-thin text-base mb-5">
                Company
              </div>
              <ul className="space-y-3.5 text-sm text-[#94A3B8]">
                {["About Us", "Careers", "Contact"].map((item) => (
                  <li
                    key={item}
                    onClick={() => {
                      if (item === "About Us") {
                        setLocation("/about");
                      } else if (item === "Contact") {
                        setLocation("/faq");
                      } else if (item === "Careers") {
                        setLocation("/features");
                      }
                    }}
                    className="flex items-center justify-between hover:text-white cursor-pointer transition-colors group max-w-[140px]"
                  >
                    <span>{item}</span>
                    <span className="text-xs text-[#475569] group-hover:text-white transition-colors">›</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Copyright Bar */}
          <div className="border-t border-[#1E2235] pt-6 pb-6 flex flex-col sm:flex-row justify-between items-center text-sm text-[#94A3B8] gap-4">
            <span>© 2026 Huzzler. All rights reserved.</span>
            <div className="flex items-center gap-6">
              <a href="https://deva689.github.io/huzzler-privacy-policy/" target="_blank" rel="noopener noreferrer" className="hover:text-white cursor-pointer transition-colors">Privacy Policy</a>
              <span className="text-[#334155]">|</span>
              <a href="https://deva689.github.io/huzzler-privacy-policy/terms.html" target="_blank" rel="noopener noreferrer" className="hover:text-white cursor-pointer transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;