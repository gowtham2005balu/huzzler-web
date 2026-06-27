import React from "react";
import { useNavigate } from "react-router-dom";

export function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="bg-white py-16">
      <div className="max-w-[1350px] mx-auto px-4">
        <div className="bg-[#0b0b0f] rounded-3xl py-16 px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-[#6C5CE724] text-[#8B7CF6] text-xs px-3 py-1.5 rounded-full mb-6">
            🚀 Join 48,000+ experts worldwide
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white max-w-xl mx-auto leading-tight">
            World-class experts <br /> at your command
          </h2>
          <p className="text-white/50 text-sm max-w-md mx-auto mt-4">
            Huzzler helps startups and enterprises scale faster with vetted
  global freelancers — powered by AI precision.
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <button 
              onClick={() => navigate("/roleselect")}
              className="bg-[#8B7CF6] text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-violet-600 transition">
              Hire Top Talent
            </button>
            <button 
              onClick={() => navigate("/roleselect")}
              className="border border-white/20 text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-white/5 transition">
              Become a Freelancer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="w-full bg-[#6C5CE7] px-4 lg:px-12 pt-8 pb-0 font-[Plus_Jakarta_Sans,sans-serif] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Top bar: contact links + get the app */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/20">
          <div className="flex items-center gap-8 text-sm text-white/90">
            <a href="#" className="hover:text-white transition">Contact us</a>
            <a href="#" className="hover:text-white transition">Help center</a>
            <a href="#" className="hover:text-white transition">Status</a>
          </div>

          <button className="flex items-center gap-2 bg-white/10 hover:bg-[#00000033] transition rounded-full px-5 py-2.5 text-sm text-white">
            <span className="flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-3.04 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.1.28.1.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.972 1.42-1.98 2.84-3.55 2.87-1.54.03-2.04-.91-3.8-.91-1.76 0-2.32.88-3.78.94-1.52.06-2.67-1.53-3.65-2.94-1.99-2.87-3.5-8.1-1.46-11.64.99-1.72 2.79-2.86 4.67-2.89 1.49-.03 2.6.94 3.6.94.99 0 2.38-.97 3.92-.94.81.03 2.86.33 4.06 2.5-.1.06-2.36 1.38-2.34 4.05.02 3.2 2.85 4.27 2.85 4.27z"/>
              </svg>
              
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M3 20.5v-17c0-.59.34-1.11.84-1.36L14 12 3.84 21.86c-.5-.25-.84-.77-.84-1.36zm14.5-8.5 2.6-1.5-13.2-7.6L13.5 9.5l4 2.5zm0 0-4 2.5-6.6 6.6 13.2-7.6-2.6-1.5z"/>
              </svg>
            </span>
            Get the app
          </button>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 py-14 border-b border-white/20">
          <div>
            <p className="text-[11px] font-bold tracking-widest text-white/50 mb-5">
              CATEGORY
            </p>
            <ul className="space-y-3 text-sm font-medium text-white">
              <li><a href="#" className="hover:text-white/80 transition">Graphics &amp; Design</a></li>
              <li><a href="#" className="hover:text-white/80 transition">Writing &amp; Translation</a></li>
              <li><a href="#" className="hover:text-white/80 transition">Music &amp; Audio</a></li>
              <li><a href="#" className="hover:text-white/80 transition">AI Services</a></li>
              <li><a href="#" className="hover:text-white/80 transition">Data</a></li>
              <li><a href="#" className="hover:text-white/80 transition">Personal Growth &amp; Hobbies</a></li>
              <li><a href="#" className="hover:text-white/80 transition">Finance</a></li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-bold tracking-widest text-white/50 mb-5">
              MORE CATEGORIES
            </p>
            <ul className="space-y-3 text-sm font-medium text-white">
              <li><a href="#" className="hover:text-white/80 transition">Digital Marketing</a></li>
              <li><a href="#" className="hover:text-white/80 transition">Video &amp; Animation</a></li>
              <li><a href="#" className="hover:text-white/80 transition">Programming &amp; Tech</a></li>
              <li><a href="#" className="hover:text-white/80 transition">Consulting</a></li>
              <li><a href="#" className="hover:text-white/80 transition">Business</a></li>
              <li><a href="#" className="hover:text-white/80 transition">Photography</a></li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-bold tracking-widest text-white/50 mb-5">
              COMPANY
            </p>
            <ul className="space-y-3 text-sm font-medium text-white">
              <li><a href="#" className="hover:text-white/80 transition">About Huzzler</a></li>
              <li><a href="#" className="hover:text-white/80 transition">Careers</a></li>
              <li><a href="#" className="hover:text-white/80 transition">Case Studies</a></li>
              <li><a href="https://deva689.github.io/huzzler-privacy-policy/terms.html" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition">Terms of Service</a></li>
              <li><a href="https://deva689.github.io/huzzler-privacy-policy/" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar: copyright + social icons */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-8">
          <p className="text-sm text-white/70">
            © 2026 Huzzler. All Rights Reserved. Made with{" "}
            <span className="text-red-400">♥</span>
          </p>

          <div className="flex items-center gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center text-white"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 1.62c-3.15 0-3.5.01-4.74.07-.96.04-1.48.2-1.82.34-.46.18-.78.39-1.12.73-.34.34-.55.66-.73 1.12-.14.34-.3.86-.34 1.82-.06 1.24-.07 1.59-.07 4.74s.01 3.5.07 4.74c.04.96.2 1.48.34 1.82.18.46.39.78.73 1.12.34.34.66.55 1.12.73.34.14.86.3 1.82.34 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c.96-.04 1.48-.2 1.82-.34.46-.18.78-.39 1.12-.73.34-.34.55-.66.73-1.12.14-.34.3-.86.34-1.82.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.04-.96-.2-1.48-.34-1.82-.18-.46-.39-.78-.73-1.12-.34-.34-.66-.55-1.12-.73-.34-.14-.86-.3-1.82-.34-1.24-.06-1.59-.07-4.74-.07zm0 4.13a4.09 4.09 0 1 1 0 8.18 4.09 4.09 0 0 1 0-8.18zm0 6.74a2.65 2.65 0 1 0 0-5.3 2.65 2.65 0 0 0 0 5.3zm5.2-6.91a.96.96 0 1 1-1.92 0 .96.96 0 0 1 1.92 0z"/>
              </svg>
            </a>
            <a
              href="#"
              aria-label="X"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center text-white"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center text-white"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Giant brand wordmark */}
        <div className="text-center select-none">
          <h2 className="text-[18vw] sm:text-[14vw] lg:text-[11rem] font-extrabold text-white/15 leading-none tracking-tight whitespace-nowrap">
            HUZZLER
          </h2>
        </div>
      </div>
    </footer>
  );
}