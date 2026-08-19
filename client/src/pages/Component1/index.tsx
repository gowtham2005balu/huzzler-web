import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { motion, useInView } from "framer-motion";
import { Zap, Share2, Code2, TrendingUp, Video, PenTool, Bot, Music2, BarChart3, Briefcase, Camera, Sprout, Gem } from "lucide-react";
// ─── Constants ────────────────────────────────────────────────────────────────
const W = "#FFFFFF";
const P2 = "#A78BFA";

// ─── Utility ──────────────────────────────────────────────────────────────────
function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

// ─── Ticker ───────────────────────────────────────────────────────────────────
function Ticker({ items, dark = false }: { items: string[]; dark?: boolean }) {
  const repeated = [...items, ...items];
  return (
    <div
      className={cn(
        "overflow-hidden border-y-[3px] border-black",
        dark ? "bg-black border-black" : "bg-[#F5D547]"
      )}
      style={{ borderTopWidth: 3, borderBottomWidth: 3 }}
    >
      <div className="ticker-track py-3">
        {repeated.map((item, i) => (
          <span
            key={i}
            className={cn(
              "inline-flex items-center gap-[18px] px-11 text-sm font-medium tracking-[0.56px] uppercase whitespace-nowrap",
              dark ? "text-white/60" : "text-black"
            )}
          >
            <span className="text-[10px]">✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Fade-up animation wrapper ─────────────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── 3D Flip-in animation wrapper ──────────────────────────────────────────────
export function FlipParent({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: { staggerChildren: 0.15 }
        }
      }}
      className="flex flex-col gap-10 w-full"
    >
      {children}
    </motion.div>
  );
}

export function FlipChild({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      style={{ perspective: 1200 }}
      variants={{
        hidden: { opacity: 0, rotateY: 90, z: -200 },
        visible: {
          opacity: 1, rotateY: 0, z: 0,
          transition: { duration: 0.8, ease: [0.25, 1, 0.35, 1] }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  const [tab, setTab] = useState<"talent" | "jobs">("talent");

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] lg:min-h-[calc(100dvh-80px)] lg:h-[calc(100vh-80px)] bg-[#06040F] overflow-hidden flex flex-col justify-center py-16 lg:py-0"
    >
      {/* Full Background Video */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      >
        <div className="relative w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center"
          >
            <source
              src="https://res.cloudinary.com/dqsyzpxkg/video/upload/v1783591540/freelancers-in-city-cafe-portrait-of-hispanic-man-2025-12-17-15-31-42-utc_1_l0pp8e.mov"
              type="video/mp4"
            />
            <source
              src="https://res.cloudinary.com/dqsyzpxkg/video/upload/v1783591540/freelancers-in-city-cafe-portrait-of-hispanic-man-2025-12-17-15-31-42-utc_1_l0pp8e.mov"
              type="video/quicktime"
            />
          </video>
          {/* Left backdrop gradient for text legibility while keeping right video in 100% original color */}
          <div className="absolute inset-y-0 left-0 w-full lg:w-[55%] bg-gradient-to-r from-[#06040F] via-[#06040F]/90 to-transparent z-0" />
        </div>
      </motion.div>

      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-120px] left-[-80px] w-[600px] h-[600px] rounded-full pointer-events-none z-[1]"
        style={{ background: "radial-gradient(circle, rgba(108,92,231,0.25) 0%, transparent 70%)" }}
      />
      <motion.div
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[20%] right-[-100px] w-[500px] h-[500px] rounded-full pointer-events-none z-[1]"
        style={{ background: "radial-gradient(circle, rgba(108,92,231,0.1) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 flex-1 w-full px-5 sm:px-6 lg:px-[100px] grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
        <div className="flex flex-col gap-5 pt-16 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex self-start items-center gap-2.5 px-[18px] py-2 rounded-full border border-[#6C5CE7]/25 bg-[#6C5CE7]/12"
          >
            <span className="w-[7px] h-[7px] rounded-full bg-[#00D68F] flex-shrink-0" />
            <span className="text-[#8B7CF6] text-[10px] sm:text-xs font-medium tracking-[0.96px] uppercase">
              AI-Powered Freelance Marketplace
            </span>
          </motion.div>

          <div className="flex flex-col leading-none">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-white font-medium leading-[0.95] tracking-[-1.5px] sm:tracking-[-2px] text-[clamp(34px,10vw,64px)] lg:text-[clamp(36px,4.2vw,64px)]"
            >
              Hire
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[#8B7CF6] font-medium leading-[0.95] tracking-[-1.5px] sm:tracking-[-2px] text-[clamp(34px,10vw,64px)] lg:text-[clamp(36px,4.2vw,64px)]"
            >
              Freelancers
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/55 text-sm sm:text-[14.5px] leading-[1.6] max-w-[400px]"
          >
            The world's most intelligent platform for enterprise hiring and elite independent talent. Powered by AI precision matching — find the perfect expert in seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="rounded-[20px] border border-white/10 bg-[#141024]/90 shadow-[0_32px_80px_0_rgba(0,0,0,0.5),0_1px_0_1px_rgba(255,255,255,0.06)_inset] backdrop-blur-xl p-4 flex flex-col gap-4 w-full max-w-[480px]"
          >
            <div className="flex items-center gap-1.5 bg-white/5 rounded-full p-1">
              <button
                onClick={() => setTab("talent")}
                className={cn(
                  "flex-1 py-2 rounded-full text-xs font-semibold transition-all duration-200",
                  tab === "talent" ? "bg-[#6C5CE7] text-white shadow-[0_4px_14px_0_rgba(108,92,231,0.45)]" : "text-white/38"
                )}
              >
                Find Talent
              </button>
              <button
                onClick={() => setTab("jobs")}
                className={cn(
                  "flex-1 py-2 rounded-full text-xs font-semibold transition-all duration-200",
                  tab === "jobs" ? "bg-[#6C5CE7] text-white shadow-[0_4px_14px_0_rgba(108,92,231,0.45)]" : "text-white/38"
                )}
              >
                Browse Jobs
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="flex-1 h-[48px] rounded-full border border-white/10 bg-white/6 flex items-center gap-2 px-4 min-w-0">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="opacity-40 flex-shrink-0">
                  <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="white" strokeWidth="1.33333" />
                  <path d="M14 13.9996L11.1 11.0996" stroke="white" strokeWidth="1.33333" />
                </svg>
                <input
                  type="text"
                  placeholder="Search for developers, designers, writers..."
                  className="bg-transparent border-none outline-none text-white text-xs w-full placeholder:text-white/25 truncate min-w-0"
                />
              </div>
              <motion.button
                onClick={() => window.open("https://huzzler.app/freelance-dashboard/browse-projects", "_blank")}
                whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(108,92,231,0.6)" }}
                whileTap={{ scale: 0.97 }}
                className="h-[48px] px-6 rounded-full bg-[#6C5CE7] text-white text-xs font-medium shadow-[0_4px_16px_0_rgba(108,92,231,0.4)] flex-shrink-0 transition-all"
              >
                Search
              </motion.button>
            </div>

          </motion.div>
        </div>

        <div className="hidden lg:block"></div>
      </div>

      <div className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 opacity-20 z-10 pointer-events-none">
        <div className="w-px h-11 bg-gradient-to-b from-white/20 to-transparent" />
        <span className="text-white text-[10px] font-medium tracking-[1.2px] uppercase">Scroll</span>
      </div>
    </section>
  );
}

// ─── Categories Section ────────────────────────────────────────────────────────
// Add these lucide-react imports alongside your existing "Zap" import:
// import { Zap, Share2, Code2, TrendingUp, Video, PenTool, Bot, Music2, BarChart3, Briefcase, Camera, Sprout, Gem } from "lucide-react";

// ─── Categories Section (simplified icon set) ─────────────────────────────────
const categories = [
  { name: "Graphics & Design", icon: <Share2 size={30} strokeWidth={1.75} color="#6C4CF5" /> },
  { name: "Programming & Tech", icon: <Code2 size={30} strokeWidth={1.75} color="#6C4CF5" /> },
  { name: "Digital Marketing", icon: <TrendingUp size={30} strokeWidth={1.75} color="#6C4CF5" /> },
  { name: "Video & Animation", icon: <Video size={30} strokeWidth={1.75} color="#6C4CF5" /> },
  { name: "Writing & Translation", icon: <PenTool size={30} strokeWidth={1.75} color="#6C4CF5" /> },
  { name: "AI Services", icon: <Bot size={30} strokeWidth={1.75} color="#6C4CF5" /> },
  { name: "Music & Audio", icon: <Music2 size={30} strokeWidth={1.75} color="#6C4CF5" /> },
  { name: "Data & Analytics", icon: <BarChart3 size={30} strokeWidth={1.75} color="#6C4CF5" /> },
  { name: "Business", icon: <Briefcase size={30} strokeWidth={1.75} color="#6C4CF5" /> },
  { name: "Photography", icon: <Camera size={30} strokeWidth={1.75} color="#6C4CF5" /> },
  { name: "Personal Growth", icon: <Sprout size={30} strokeWidth={1.75} color="#6C4CF5" /> },
  { name: "Finance", icon: <Gem size={30} strokeWidth={1.75} color="#6C4CF5" /> },
];

// ─── Simplified Category Card Grid (flat icon, no count, no arrow) ────────────
function SpadesCardGrid({
  categories,
  handleNavigate,
}: {
  categories: any[];
  handleNavigate: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-40px" });

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5 py-4"
    >
      {categories.map((cat, i) => (
        <motion.div
          key={cat.name}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
          whileHover={{ y: -4, boxShadow: "0 12px 28px rgba(10,15,44,0.08)" }}
          onClick={handleNavigate}
          className="relative rounded-[20px] sm:rounded-[24px] border border-[#EDEDF3] bg-gradient-to-br from-white to-[#F6F5FC] shadow-[0_2px_10px_0_rgba(10,15,44,0.04)] overflow-hidden cursor-pointer transform-gpu"
          style={{ aspectRatio: "1 / 1" }}
        >
          <div className="relative h-full flex flex-col items-center justify-center gap-4 p-3 sm:p-4">
            {cat.icon}
            <p className="text-[#0A0F2C] font-medium text-[13px] sm:text-[16px] leading-[1.3] text-center">
              {cat.name}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
function CategoriesSection() {
  // All category cards + the "All Categories" button navigate here
  const NAVIGATE_URL = "https://huzzler.app/freelance-dashboard/browse-projects";

  const handleNavigate = () => {
    window.open(NAVIGATE_URL, "_blank");
  };

  return (
    <section id="categories" className="py-16 sm:py-24 bg-[#F5F6FA] border-b border-[#EAEBF0]">
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="w-[7px] h-[7px] rounded-full bg-[#6C4CF5]" />
              <span className="text-[#6C4CF5] text-xs font-medium tracking-[1.44px] uppercase">Browse Categories</span>
            </div>
            <h2 className="text-[#0A0F2C] font-medium text-[clamp(32px,8vw,68px)] lg:text-[clamp(40px,5.5vw,68px)] leading-[1.05] tracking-[-1.5px] sm:tracking-[-2.5px]">
              Explore <span className="text-[#6C4CF5]">Categories</span>
            </h2>
            <p className="text-[#6B7280] text-base max-w-[400px] leading-[1.65]">
              Discover thousands of services across 12+ categories. Find the perfect service for your needs.
            </p>
          </div>
          <motion.button
            onClick={handleNavigate}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="self-start sm:self-auto flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#6C4CF5]/20 bg-white shadow-[0_4px_20px_0_rgba(108,76,245,0.1),0_1px_4px_0_rgba(10,15,44,0.05)] text-[#6C4CF5] text-[15px] font-semibold transition-all hover:shadow-[0_4px_24px_rgba(108,76,245,0.2)]"
          >
            All Categories
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M9 12L13 8L9 4" stroke="#6C4CF5" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        </div>

        <SpadesCardGrid categories={categories} handleNavigate={handleNavigate} />

        <FadeUp delay={0.3}>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: "shield", title: "Trusted Professionals", desc: "Verified experts you can rely on." },
              { icon: "star", title: "Quality Services", desc: "Top-rated services, guaranteed." },
              { icon: "chat", title: "24/7 AI Support", desc: "We're here to help anytime." },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-4 px-6 sm:px-8 py-5 sm:py-6 rounded-[24px] sm:rounded-[28px] border border-[#EAEBF0] bg-white shadow-[0_2px_20px_0_rgba(10,15,44,0.05)]"
              >
                <div className="w-12 h-12 rounded-[14px] bg-[#6C4CF5]/8 flex items-center justify-center flex-shrink-0">
                  {item.icon === "shield" && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L20 5.5V11.5C20 15.8 16.4 19.8 12 21C7.6 19.8 4 15.8 4 11.5V5.5L12 2Z" fill="#6C4CF5" fillOpacity="0.08" stroke="#6C4CF5" strokeWidth="1.8" />
                      <path d="M9 12L11 14L15 10" stroke="#6C4CF5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  {item.icon === "star" && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12.0031 2L14.4031 8.5H21.3031L15.9031 12.5L18.2031 19L12.0031 15L5.80313 19L8.10313 12.5L2.70312 8.5H9.60313L12.0031 2Z" fill="#6C4CF5" fillOpacity="0.08" stroke="#6C4CF5" strokeWidth="1.8" strokeLinejoin="round" />
                    </svg>
                  )}
                  {item.icon === "chat" && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 3C7 3 3 7 3 12C3 14.4 4 16.6 5.6 18.2L4 21L7.2 19.7C8.6 20.5 10.2 21 12 21C17 21 21 17 21 12C21 7 17 3 12 3Z" fill="#6C4CF5" fillOpacity="0.08" stroke="#6C4CF5" strokeWidth="1.8" />
                      <path d="M9 11C9 9.66667 9.66667 9 11 9C12.3333 9 13 9.66667 13 11C13 12.3333 12.3333 13 11 13V15" stroke="#6C4CF5" strokeWidth="1.6" strokeLinecap="round" />
                      <path d="M11 18C11.5523 18 12 17.5523 12 17C12 16.4477 11.5523 16 11 16C10.4477 16 10 16.4477 10 17C10 17.5523 10.4477 18 11 18Z" fill="#6C4CF5" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="text-[#0A0F2C] font-medium text-[15px]">{item.title}</p>
                  <p className="text-[#6B7280] text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Why Huzzler ──────────────────────────────────────────────────────────────
function WhyHuzzlerSection() {
  const [, setLocation] = useLocation();

  return (
    <section id="why-huzzler" className="py-16 sm:py-24 bg-[#FAFAFC] border-t border-[#EAEBF0]">
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-16 flex flex-col gap-10">
        <FadeUp>
          <div className="flex flex-col items-center gap-3 pb-8 border-b border-[#E4E4E4]">
            {/* <span className="text-[#6C5CE7] text-xs font-medium tracking-[1.32px] uppercase">Why Huzzler?</span> */}
            <h2 className="text-[#0A0F2C] font-medium text-[clamp(30px,8vw,64px)] lg:text-[clamp(36px,5vw,64px)] leading-[1.04] tracking-[-1.5px] sm:tracking-[-2px] text-center">Built for modern workflows</h2>
          </div>
        </FadeUp>

        <FlipParent>
          {/* Row 1: 4 Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4.5 items-stretch">
            {/* Card 1: Woman Image */}
            <FlipChild>
              <motion.div
                onClick={() => setLocation("/features")}
                whileHover={{ y: -4 }}
                className="rounded-[28px] sm:rounded-[32px] overflow-hidden min-h-[320px] sm:min-h-[360px] relative cursor-pointer shadow-sm"
              >
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" alt="Huzzler Freelancer" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-7">
                  <p className="text-white font-medium text-xl leading-tight">Huzzler</p>
                  <p className="text-white/70 text-xs font-medium mt-1">Where Talent Meets Opportunity</p>
                </div>
              </motion.div>
            </FlipChild>

            {/* Card 2: Built For Connection */}
            <FlipChild>
              <motion.div
                onClick={() => setLocation("/features")}
                whileHover={{ y: -4 }}
                className="rounded-[28px] sm:rounded-[32px] bg-[#F5E8FF] border border-[#E9D5FF]/60 p-7 flex flex-col justify-between min-h-[320px] sm:min-h-[360px] relative cursor-pointer shadow-sm"
              >
                <div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#E9D5FF] text-[#7E22CE] text-[10px] font-medium uppercase tracking-wider">
                    BUILT FOR CONNECTION
                  </div>
                  <p className="text-[#581C87]/80 text-[13px] leading-relaxed mt-4 font-medium">
                    Huzzler is a platform that connects skilled freelancers with clients looking to get work done. Just real connections and real opportunities.
                  </p>
                  <div className="flex -space-x-2 mt-4">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" className="w-8 h-8 rounded-full border-2 border-[#F5E8FF] object-cover" alt="User" />
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" className="w-8 h-8 rounded-full border-2 border-[#F5E8FF] object-cover" alt="User" />
                    <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80" className="w-8 h-8 rounded-full border-2 border-[#F5E8FF] object-cover" alt="User" />
                  </div>
                </div>
                <div>
                  <h3 className="text-[#3B0764] font-medium text-2xl leading-snug tracking-tight">
                    Connect.<br />Collaborate.<br />Create.
                  </h3>
                  <p className="text-[#6B7280] text-[10px] font-medium tracking-wider uppercase mt-4">huzzler.app • CONNECT, SIMPLER</p>
                </div>
              </motion.div>
            </FlipChild>

            {/* Card 3: Man Image */}
            <FlipChild>
              <motion.div
                onClick={() => setLocation("/features")}
                whileHover={{ y: -4 }}
                className="rounded-[28px] sm:rounded-[32px] overflow-hidden min-h-[320px] sm:min-h-[360px] relative cursor-pointer shadow-sm"
              >
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80" alt="Huzzler Client" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-7">
                  <p className="text-white font-medium text-xl leading-tight">Huzzler</p>
                  <p className="text-white/70 text-xs font-medium mt-1">For Clients</p>
                </div>
              </motion.div>
            </FlipChild>

            {/* Card 4: Quality You Can Trust */}
            <FlipChild>
              <motion.div
                onClick={() => setLocation("/features")}
                whileHover={{ y: -4 }}
                className="rounded-[28px] sm:rounded-[32px] bg-[#E6F9F3] border border-[#BBF7D0]/60 p-7 flex flex-col justify-between min-h-[320px] sm:min-h-[360px] relative cursor-pointer shadow-sm"
              >
                <div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#BBF7D0] text-[#15803D] text-[10px] font-medium uppercase tracking-wider">
                    QUALITY YOU CAN TRUST
                  </div>
                  <p className="text-[#14532D]/80 text-[13px] leading-relaxed mt-4 font-medium">
                    Every freelancer on Huzzler is verified for skills and experience so you can connect with confidence and hire with peace of mind.
                  </p>
                </div>
                <div>
                  <h3 className="text-[#052E16] font-medium text-2xl leading-snug tracking-tight">
                    Verified Talent.<br />Trusted<br />Connections.
                  </h3>
                  <p className="text-[#6B7280] text-[10px] font-medium tracking-wider uppercase mt-4">huzzler.app • CONNECT, SIMPLER</p>
                </div>
              </motion.div>
            </FlipChild>
          </div>

          {/* Row 2: 3 Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5 items-stretch">
            {/* Card 5: Verified Freelancers */}
            <FlipChild>
              <motion.div
                onClick={() => setLocation("/features")}
                whileHover={{ y: -4 }}
                className="rounded-[28px] sm:rounded-[32px] bg-[#E0ECFF] border border-[#BFDBFE]/60 p-7 flex flex-col justify-between min-h-[290px] cursor-pointer shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-[#BFDBFE] text-[#1D4ED8] text-[10px] font-medium uppercase tracking-wider mb-4">
                      VERIFIED FREELANCERS
                    </span>
                    <h3 className="text-[#1E3A8A] font-medium text-xl leading-snug tracking-tight">
                      Skilled freelancers.<br />Verified for quality.
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[#93C5FD] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                </div>
                <p className="text-[#1E40AF]/80 text-xs leading-relaxed font-medium">
                  Every freelancer is verified for their experience and background before they join the Huzzler community.
                </p>
                <p className="text-[#6B7280] text-[10px] font-medium tracking-wider uppercase">huzzler.app • CONNECT, SIMPLER</p>
              </motion.div>
            </FlipChild>

            {/* Card 6: Find The Right Match */}
            <FlipChild>
              <motion.div
                onClick={() => setLocation("/features")}
                whileHover={{ y: -4 }}
                className="rounded-[28px] sm:rounded-[32px] bg-white border border-[#E5E7EB] p-7 flex flex-col justify-between min-h-[290px] cursor-pointer shadow-sm"
              >
                <div>
                  <h3 className="text-[#0A0F2C] font-medium text-xl leading-snug tracking-tight mb-4">
                    Find the right match<br />for your project
                  </h3>
                  <div className="flex flex-col gap-2.5">
                    {[
                      "Search by skills & expertise",
                      "View profiles & portfolios",
                      "Connect & discuss your needs",
                      "Start your project",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-[#6C4CF5] text-white flex items-center justify-center flex-shrink-0 text-[10px] font-medium">
                          ✓
                        </div>
                        <span className="text-[#4B5563] text-xs font-semibold">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-[#9CA3AF] text-[10px] font-medium tracking-wider uppercase">CONNECT • COLLABORATE • CREATE</p>
              </motion.div>
            </FlipChild>

            {/* Card 7: Pure Connections */}
            <FlipChild>
              <motion.div
                onClick={() => setLocation("/features")}
                whileHover={{ y: -4 }}
                className="rounded-[28px] sm:rounded-[32px] bg-[#EDE4FF] border border-[#E9D5FF]/60 p-7 flex flex-col justify-between min-h-[290px] cursor-pointer shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-[#E9D5FF] text-[#7E22CE] text-[10px] font-medium uppercase tracking-wider mb-4">
                      PURE CONNECTIONS
                    </span>
                    <h3 className="text-[#3B0764] font-medium text-xl leading-snug tracking-tight">
                      Just pure<br />connections.
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[#D8B4FE] text-[#6B21A8] flex items-center justify-center flex-shrink-0 shadow-sm">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                </div>
                <p className="text-[#581C87]/80 text-xs leading-relaxed font-medium">
                  Huzzler is a free platform that helps you connect with the right people so great work can happen.
                </p>
                <p className="text-[#6B7280] text-[10px] font-medium tracking-wider uppercase">huzzler.app • CONNECT, SIMPLER</p>
              </motion.div>
            </FlipChild>
          </div>

          {/* Row 3: 3 Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5 items-stretch">
            {/* Card 8: Opportunities For Every Skill */}
            <FlipChild>
              <motion.div
                onClick={() => setLocation("/features")}
                whileHover={{ y: -4 }}
                className="rounded-[28px] sm:rounded-[32px] bg-[#FEF7D0] border border-[#FEF08A]/60 p-7 flex flex-col justify-between min-h-[290px] cursor-pointer shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-[#713F12] font-medium text-xl leading-snug tracking-tight">
                    Opportunities for<br />every skill and<br />industry.
                  </h3>
                  <div className="w-12 h-12 rounded-full bg-[#FDE047] text-[#854D0E] flex items-center justify-center flex-shrink-0 shadow-sm">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </div>
                </div>
                <p className="text-[#854D0E]/90 text-xs leading-relaxed font-medium">
                  From design to development, writing to marketing - find the right projects or the right talent.
                </p>
                <p className="text-[#6B7280] text-[10px] font-medium tracking-wider uppercase">huzzler.app • CONNECT, SIMPLER</p>
              </motion.div>
            </FlipChild>

            {/* Card 9: Built For Freelancers & Clients */}
            <FlipChild>
              <motion.div
                onClick={() => setLocation("/features")}
                whileHover={{ y: -4 }}
                className="rounded-[28px] sm:rounded-[32px] bg-[#D4F7E5] border border-[#BBF7D0]/60 p-7 flex flex-col justify-between min-h-[290px] cursor-pointer shadow-sm"
              >
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-[#BBF7D0] text-[#15803D] text-[10px] font-medium uppercase tracking-wider mb-4">
                    BUILT FOR FREELANCERS & CLIENTS
                  </span>
                  <h3 className="text-[#052E16] font-medium text-xl leading-snug tracking-tight">
                    More connections.<br />Better collaborations.<br />Endless possibilities.
                  </h3>
                </div>
                <div className="flex items-center gap-6 mt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#A7F3D0] text-[#065F46] flex items-center justify-center text-xs">
                      👤
                    </div>
                    <span className="text-[#065F46] text-[11px] font-medium">For Freelancers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#A7F3D0] text-[#065F46] flex items-center justify-center text-xs">
                      💼
                    </div>
                    <span className="text-[#065F46] text-[11px] font-medium">For Clients</span>
                  </div>
                </div>
              </motion.div>
            </FlipChild>

            {/* Card 10: A Growing Community */}
            <FlipChild>
              <motion.div
                onClick={() => setLocation("/features")}
                whileHover={{ y: -4 }}
                className="rounded-[28px] sm:rounded-[32px] bg-white border border-[#E5E7EB] p-7 flex flex-col justify-between min-h-[290px] cursor-pointer shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#F3E8FF] text-[#7E22CE] flex items-center justify-center flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <h3 className="text-[#0A0F2C] font-medium text-xl leading-snug tracking-tight">
                    A growing<br />community
                  </h3>
                </div>
                <p className="text-[#4B5563] text-xs leading-relaxed font-medium">
                  We're building a trusted space where freelancers and clients come together to achieve more.
                </p>
                <p className="text-[#9CA3AF] text-[10px] font-medium tracking-wider uppercase">huzzler.app • CONNECT, SIMPLER</p>
              </motion.div>
            </FlipChild>
          </div>
        </FlipParent>
      </div>
    </section>
  );
}

// ─── Reviews ──────────────────────────────────────────────────────────────────
const row1Reviews = [
  {
    name: "Alex Chen",
    role: "Startup Founder",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    quote: "Huzzler is the best platform we have used. The AI matching saved us weeks of searching.",
    stars: 5,
  },
  {
    name: "Maria Garcia",
    role: "Creative Director",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
    quote: "The quality of freelancers here is unmatched. Every hire has exceeded expectations.",
    stars: 5,
  },
  {
    name: "James Wilson",
    role: "CTO",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    quote: "From posting to hiring in 48 hours. The AI recommendations are spot-on.",
    stars: 5,
  },
  {
    name: "Sarah Jenkins",
    role: "Product Lead",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    quote: "Working with Huzzler changed everything for us. Matched with an expert in minutes!",
    stars: 5,
  },
  {
    name: "David Kim",
    role: "Head of Marketing",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    quote: "Verified reviews and top-tier design talent. Truly a game changer.",
    stars: 5,
  },
];

const row2Reviews = [
  {
    name: "Ryan Torres",
    role: "CEO",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    quote: "The dashboard analytics are incredible. We track everything in real-time.",
    stars: 5,
  },
  {
    name: "Sophie Martin",
    role: "Design Lead",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    quote: "I have tried many platforms. Huzzler is the only one that truly delivers quality.",
    stars: 5,
  },
  {
    name: "Chris Lee",
    role: "Engineer",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
    quote: "The AI proposal assistant helped me write the perfect job description. So helpful!",
    stars: 5,
  },
  {
    name: "Anna White",
    role: "Content Strategist",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    quote: "Our team scaled from 3 to 15 projects in two months using Huzzler.",
    stars: 5,
  },
  {
    name: "Marcus Miller",
    role: "VP of Operations",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80",
    quote: "Super professional, organized, and great to work with. Highly recommended!",
    stars: 5,
  },
];

function ReviewsSection() {
  const [pauseRow1, setPauseRow1] = useState(false);
  const [pauseRow2, setPauseRow2] = useState(false);

  const row1Quad = [...row1Reviews, ...row1Reviews, ...row1Reviews, ...row1Reviews];
  const row2Quad = [...row2Reviews, ...row2Reviews, ...row2Reviews, ...row2Reviews];

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#FAFAFC] border-t border-[#EAEBF0] overflow-hidden">
      <div className="max-w-[1380px] mx-auto px-5 sm:px-6 mb-12 text-center">
        <FadeUp>
          {/* <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#6C5CE7]/10 text-[#6C5CE7] text-xs font-medium tracking-wide uppercase mb-4">
            Trusted by People
          </div> */}
          <h2 className="text-[#0A0F2C] font-medium text-[clamp(30px,8vw,56px)] lg:text-[clamp(36px,5vw,56px)] leading-tight tracking-[-1px] sm:tracking-[-1.5px] mb-4">
            What Our Users Say
          </h2>
          <p className="text-[#6B7280] text-base max-w-[540px] mx-auto leading-relaxed">
            Join thousands of satisfied clients and freelancers who trust Huzzler for their projects.
          </p>
        </FadeUp>
      </div>

      {/* Row 1: Moving Right to Left (Faster & Ultra-Smooth) */}
      <div
        className="overflow-hidden mb-5 flex relative py-3"
        onMouseEnter={() => setPauseRow1(true)}
        onMouseLeave={() => setPauseRow1(false)}
      >
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#FAFAFC] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#FAFAFC] to-transparent z-10 pointer-events-none" />
        <motion.div
          animate={pauseRow1 ? false : { x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="flex gap-5 flex-nowrap min-w-full"
        >
          {row1Quad.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{
                y: -8,
                scale: 1.02,
                borderColor: "#6C5CE7",
                boxShadow: "0 20px 40px -10px rgba(108, 92, 231, 0.2)",
              }}
              transition={{ duration: 0.25 }}
              className="w-[280px] sm:w-[360px] flex-shrink-0 rounded-[22px] border border-[#EAEBF0] bg-white p-6 shadow-[0_2px_14px_rgba(10,15,44,0.04)] flex flex-col justify-between cursor-pointer transition-colors"
            >
              <div>
                <div className="flex items-center gap-3.5 mb-3.5">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-11 h-11 rounded-full object-cover border border-[#EAEBF0] flex-shrink-0"
                  />
                  <div>
                    <h4 className="text-[#0A0F2C] font-medium text-[15px] leading-tight">
                      {item.name}
                    </h4>
                    <p className="text-[#6B7280] text-xs font-medium mt-0.5">
                      {item.role}
                    </p>
                  </div>
                </div>
                <p className="text-[#374151] text-[14px] leading-[1.65]">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-1 mt-4 text-[#F59E0B] text-sm">
                {"★".repeat(item.stars)}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Row 2: Moving Left to Right (Opposite Direction, Faster & Ultra-Smooth) */}
      <div
        className="overflow-hidden flex relative py-3"
        onMouseEnter={() => setPauseRow2(true)}
        onMouseLeave={() => setPauseRow2(false)}
      >
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#FAFAFC] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#FAFAFC] to-transparent z-10 pointer-events-none" />
        <motion.div
          animate={pauseRow2 ? false : { x: ["-50%", "0%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="flex gap-5 flex-nowrap min-w-full"
        >
          {row2Quad.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{
                y: -8,
                scale: 1.02,
                borderColor: "#6C5CE7",
                boxShadow: "0 20px 40px -10px rgba(108, 92, 231, 0.2)",
              }}
              transition={{ duration: 0.25 }}
              className="w-[280px] sm:w-[360px] flex-shrink-0 rounded-[22px] border border-[#EAEBF0] bg-white p-6 shadow-[0_2px_14px_rgba(10,15,44,0.04)] flex flex-col justify-between cursor-pointer transition-colors"
            >
              <div>
                <div className="flex items-center gap-3.5 mb-3.5">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-11 h-11 rounded-full object-cover border border-[#EAEBF0] flex-shrink-0"
                  />
                  <div>
                    <h4 className="text-[#0A0F2C] font-medium text-[15px] leading-tight">
                      {item.name}
                    </h4>
                    <p className="text-[#6B7280] text-xs font-medium mt-0.5">
                      {item.role}
                    </p>
                  </div>
                </div>
                <p className="text-[#374151] text-[14px] leading-[1.65]">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-1 mt-4 text-[#F59E0B] text-sm">
                {"★".repeat(item.stars)}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Blog ─────────────────────────────────────────────────────────────────────
const blogPosts = [
  { date: "Apr 12, 2026", title: "Revolutionizing Team Collaboration: The Huzzler Way", excerpt: "Discover how Huzzler's AI-precision matching is changing the game in team collaboration, boosting productivity and sparking creativity.", img: "https://api.builder.io/api/v1/image/assets/TEMP/d76c3468add629a8c3a14b2207afdc3d6edfd7ca?width=809" },
  { date: "Mar 28, 2026", title: "Unleashing Creativity: How Our Talent Inspires Innovation", excerpt: "Explore how our strict vetting process nurtures a culture of elite independence, empowering experts to unleash their potential.", img: "https://api.builder.io/api/v1/image/assets/TEMP/2db3eace711f28cfd3f982bb1b43c1d9f11781b9?width=809" },
  { date: "Mar 28, 2026", title: "Unleashing Creativity: How Our Talent Inspires Innovation", excerpt: "Explore how our strict vetting process nurtures a culture of elite independence, empowering experts to unleash their potential.", img: "https://api.builder.io/api/v1/image/assets/TEMP/2db3eace711f28cfd3f982bb1b43c1d9f11781b9?width=809" },
];

function BlogSection() {
  const [, setLocation] = useLocation();
  return (
    <section className="py-16 sm:py-24 lg:py-28 bg-white">
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-16 flex flex-col gap-10 sm:gap-14">
        <FadeUp>
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div className="flex flex-col gap-4">
              {/* <span className="text-[#6C5CE7] text-xs font-medium tracking-[1.44px] uppercase">Insights & Stories</span> */}
              <h2 className="text-[#0A0F2C] font-medium text-[clamp(34px,7.5vw,72px)] lg:text-[clamp(44px,5vw,72px)] leading-[1.02] tracking-[-1.5px] sm:tracking-[-2.8px]">
                Discover the<br />Huzzler advantage
              </h2>
            </div>
            <button
              onClick={() => setLocation("/blog")}
              className="self-start flex items-center gap-1.5 px-6 py-3 rounded-full border border-[#E5E7EB] text-[#0A0F2C] text-sm font-semibold hover:bg-black/[0.03] hover:border-[#D1D5DB] transition-colors whitespace-nowrap"
            >
              Read all stories →
            </button>
          </div>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {blogPosts.map((post, i) => (
            <FadeUp key={post.title + i} delay={i * 0.1}>
              <motion.div whileHover={{ y: -6 }} className="rounded-[24px] sm:rounded-[32px] border border-[#EAEBF0] bg-white overflow-hidden cursor-pointer shadow-[0_2px_16px_rgba(10,15,44,0.04)]">
                <div className="h-[240px] sm:h-[320px] lg:h-[360px] overflow-hidden">
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-6 sm:p-7 flex flex-col gap-2.5">
                  <span className="text-[#9CA3AF] text-[11px] font-semibold tracking-[0.66px] uppercase">{post.date}</span>
                  <h3 className="text-[#0A0F2C] font-medium text-[19px] sm:text-[21px] leading-[1.35] tracking-[-0.4px]">{post.title}</h3>
                  <p className="text-[#6B7280] text-[13.5px] leading-[1.65]">{post.excerpt}</p>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
// ─── How It Works ─────────────────────────────────────────────────────────────
const howItWorksSteps = [
  {
    num: "1",
    title: "Create a Post",
    desc: "Create a job post manually or use AI to generate a clear, well-structured post in seconds.",
    hasPill: true,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <line x1="9" y1="15" x2="15" y2="15" />
      </svg>
    ),
  },
  {
    num: "2",
    title: "AI Finds the Best Matches",
    desc: "Our AI scans profiles, skills, and experience to find the most relevant freelancers or projects for you.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    num: "3",
    title: "Review & Shortlist",
    desc: "Review AI-recommended matches or all applications. Compare profiles, skills, and portfolios to shortlist the perfect fit.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <polyline points="17 11 19 13 23 9" />
      </svg>
    ),
  },
  {
    num: "4",
    title: "Connect & Discuss",
    desc: "Start a conversation, discuss details, clarify expectations, and find the right match with confidence.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    num: "5",
    title: "Get Guidance Anytime",
    desc: "Use our AI chatbot for suggestions, answers, and support—whenever you need it.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    num: "6",
    title: "Work & Succeed Together",
    desc: "Move forward, achieve your goals, and build lasting professional relationships.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
  },
];

const chatbotFeatures = [
  {
    label: "Suggests best matches",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    label: "Helps create better posts & services",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18h6M10 22h4M15 9a3 3 0 1 0-6 0c0 1.5.7 2.8 1.8 3.6.7.5 1.2 1.4 1.2 2.4v1h4v-1c0-1 .5-1.9 1.2-2.4C14.3 11.8 15 10.5 15 9z" />
      </svg>
    ),
  },
  {
    label: "Answers your questions",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    label: "Guides you at every step",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    label: "Saves time, simplifies everything",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
];

function HowItWorksSection() {
  const [, setLocation] = useLocation();

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-white border-t border-[#EAEBF0]">
      <div className="max-w-[1380px] mx-auto px-5 sm:px-6">
        {/* Section Header */}
        <FadeUp>
          <div className="text-center max-w-[680px] mx-auto mb-16">
            {/* <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#6C5CE7]/10 text-[#6C5CE7] text-xs font-medium uppercase tracking-wider mb-4">
              <span>✦</span> HOW IT WORKS
            </div> */}
            <h2 className="text-[#0A0F2C] font-medium text-[clamp(30px,8vw,56px)] lg:text-[clamp(36px,5vw,56px)] leading-tight tracking-[-1px] sm:tracking-[-1.5px] mb-4">
              How <span className="text-[#6C5CE7]">Huzzler</span> Works
            </h2>
            <p className="text-[#6B7280] text-base leading-relaxed">
              Whether you post manually or let AI do the heavy lifting, Huzzler connects the <span className="text-[#6C5CE7] font-medium">right people</span> and makes work happen.
            </p>
          </div>
        </FadeUp>

        {/* 6 Step Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-stretch relative mb-14">
          {howItWorksSteps.map((step, i) => (
            <React.Fragment key={step.num}>
              <FadeUp delay={i * 0.08} className="flex relative group">
                <motion.div
                  whileHover={{ y: -6, boxShadow: "0 16px 32px -8px rgba(108, 92, 231, 0.15)", borderColor: "#6C5CE7" }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setLocation("/features")}
                  className="bg-white rounded-[24px] border border-[#EAEBF0] p-5 flex flex-col items-center text-center relative w-full justify-between shadow-[0_2px_12px_rgba(10,15,44,0.03)] cursor-pointer transition-all"
                >
                  {/* Step Number Badge */}
                  <div className="absolute top-4 left-4 w-6 h-6 rounded-full bg-[#6C5CE7] text-white font-medium text-[11px] flex items-center justify-center shadow-sm">
                    {step.num}
                  </div>

                  <div className="flex flex-col items-center pt-3 pb-2 w-full">
                    {/* Icon Container */}
                    <div className="w-14 h-14 rounded-full bg-[#F3E8FF] flex items-center justify-center mb-4 border border-[#EBE7FF]">
                      {step.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-[#0A0F2C] font-medium text-[15px] leading-snug mb-2.5">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[#6B7280] text-[12px] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {/* Optional Pill for Step 1 */}
                  {step.hasPill ? (
                    <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gray-200 bg-gray-50 text-[11px] text-gray-500 font-medium">
                      <span> Manual</span>
                      <span className="text-gray-300">or</span>
                      <span className="text-[#6C5CE7] font-semibold">✦ AI</span>
                    </div>
                  ) : (
                    <div className="h-4" />
                  )}
                </motion.div>

                {/* Connecting Arrow between cards */}
                {i < howItWorksSteps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 pointer-events-none text-[#6C5CE7]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                )}
              </FadeUp>
            </React.Fragment>
          ))}
        </div>

        {/* AI Chatbot Smart Assistant Banner */}
        <FadeUp delay={0.3}>
          <div
            onClick={() => setLocation("/features")}
            className="rounded-[24px] sm:rounded-[28px] bg-[#F6F4FF] border border-[#EBE7FF] p-6 sm:p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-[0_4px_20px_rgba(108,92,231,0.05)] cursor-pointer hover:border-[#6C5CE7]/50 transition-all hover:shadow-[0_8px_30px_rgba(108,92,231,0.12)]"
          >
            {/* Left AI Info */}
            <div className="flex items-start md:items-center gap-5 max-w-[560px]">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-[20px] bg-[#6C5CE7] flex items-center justify-center text-white flex-shrink-0 shadow-[0_8px_20px_rgba(108,92,231,0.3)]">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="10" rx="2" />
                  <circle cx="12" cy="5" r="2" />
                  <path d="M12 7v4" />
                  <line x1="8" y1="16" x2="8" y2="16" />
                  <line x1="16" y1="16" x2="16" y2="16" />
                </svg>
              </div>

              <div>
                <h3 className="text-[#0A0F2C] font-medium text-lg sm:text-xl md:text-2xl tracking-tight mb-1">
                  AI Chatbot – Your Smart Assistant
                </h3>
                <span className="inline-block text-[#6C5CE7] text-xs font-semibold mb-2">
                  Available for both clients and freelancers
                </span>
                <p className="text-[#6B7280] text-xs md:text-sm leading-relaxed">
                  Our AI chatbot helps you with match suggestions, project ideas, writing better posts, platform guidance, and answers to all your questions.
                </p>
              </div>
            </div>

            {/* Right 5 Features */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 sm:gap-5 items-start flex-shrink-0 w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-[#EBE7FF]">
              {chatbotFeatures.map((feat, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-2 max-w-[110px] mx-auto">
                  <div className="w-10 h-10 rounded-full bg-white border border-[#EBE7FF] flex items-center justify-center shadow-sm">
                    {feat.icon}
                  </div>
                  <span className="text-[11px] font-medium text-[#374151] leading-tight">
                    {feat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Our Journey ──────────────────────────────────────────────────────────────
function JourneySection() {
  const [, setLocation] = useLocation();
  return (
    <section id="journey" className="py-16 sm:py-24 bg-[#FAFAFC] border-t border-[#EAEBF0]">
      <div className="max-w-[1380px] mx-auto px-5 sm:px-6">
        {/* Section Header */}
        <FadeUp>
          <div className="text-center max-w-[640px] mx-auto mb-16">
            {/* <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#6C5CE7]/10 text-[#6C5CE7] text-xs font-medium uppercase tracking-wider mb-4">
              YOUR WORKFLOW
            </div> */}
            <h2 className="text-[#0A0F2C] font-medium text-[clamp(30px,8vw,56px)] lg:text-[clamp(36px,5vw,56px)] leading-tight tracking-[-1px] sm:tracking-[-1.5px] mb-4">
              Your Freelance Journey<br />
              Starts with <span className="text-[#6C5CE7]">Huzzler</span>
            </h2>
            <p className="text-[#6B7280] text-base leading-relaxed">
              From creating your profile to finding the right opportunities, Huzzler makes every step simple with AI-powered assistance.
            </p>
          </div>
        </FadeUp>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch relative">
          {/* Card 1 */}
          <FadeUp delay={0.1} className="flex relative group">
            <motion.div
              whileHover={{ y: -8, boxShadow: "0 20px 40px -10px rgba(108, 92, 231, 0.16)", borderColor: "#6C5CE7" }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-[28px] border border-[#EAEBF0] p-7 flex flex-col justify-between w-full shadow-[0_4px_20px_rgba(10,15,44,0.03)] cursor-pointer transition-all"
            >
              <div>
                <div className="w-12 h-12 rounded-full bg-[#F3E8FF] text-[#6C5CE7] flex items-center justify-center mb-4 border border-[#EBE7FF]">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <span className="inline-block text-[10px] font-medium text-[#6C5CE7] bg-[#F3E8FF] px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-3">
                  STEP 01
                </span>
                <h3 className="text-[#0A0F2C] font-medium text-lg mb-2">
                  Create Your Profile
                </h3>
                <p className="text-[#6B7280] text-xs leading-relaxed mb-6">
                  Build your freelancer or client profile in just a few minutes and showcase what you offer or what you're looking for.
                </p>
              </div>

              {/* Bottom Graphic 1 */}
              <div className="bg-[#F8FAFC] border border-[#EAEBF0] rounded-2xl p-4 flex flex-col gap-3 mt-auto">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1">
                    <div className="h-2.5 bg-gray-300 rounded-full w-24" />
                    <div className="h-2 bg-gray-200 rounded-full w-16" />
                  </div>
                </div>
                <div className="flex gap-2 pt-1">
                  <span className="text-[10px] font-semibold text-[#6C5CE7] bg-[#6C5CE7]/10 px-2.5 py-1 rounded-lg border border-[#6C5CE7]/20">UI/UX Designer</span>
                  <span className="text-[10px] font-semibold text-[#6C5CE7] bg-[#6C5CE7]/10 px-2.5 py-1 rounded-lg border border-[#6C5CE7]/20">India</span>
                </div>
              </div>
            </motion.div>

            {/* Connecting Arrow */}
            <div className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 pointer-events-none text-[#6C5CE7]/50">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </div>
          </FadeUp>

          {/* Card 2 */}
          <FadeUp delay={0.2} className="flex relative group">
            <motion.div
              whileHover={{ y: -8, boxShadow: "0 20px 40px -10px rgba(217, 119, 6, 0.16)", borderColor: "#F59E0B" }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-[28px] border border-[#EAEBF0] p-7 flex flex-col justify-between w-full shadow-[0_4px_20px_rgba(10,15,44,0.03)] cursor-pointer transition-all"
            >
              <div>
                <div className="w-12 h-12 rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center mb-4 border border-[#FDE68A]">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                </div>
                <span className="inline-block text-[10px] font-medium text-[#D97706] bg-[#FEF3C7] px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-3">
                  STEP 02
                </span>
                <h3 className="text-[#0A0F2C] font-medium text-lg mb-2">
                  Create with AI or Manually
                </h3>
                <p className="text-[#6B7280] text-xs leading-relaxed mb-6">
                  Write a job post or service listing your way. Use AI for faster, well-structured content or create everything manually.
                </p>
              </div>

              {/* Bottom Graphic 2 */}
              <div className="flex gap-2.5 mt-auto">
                <button
                  onClick={() => window.location.href = "https://www.huzzler.app/freelance-dashboard/createservice"}
                  className="flex-1 bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-3 flex flex-col items-center justify-center gap-1 text-center transition-all hover:border-[#D97706]"
                >
                  <span className="text-[#D97706] text-[11px] font-medium flex items-center justify-center gap-1">Use AI Assistant</span>
                </button>
                <button
                  onClick={() => window.location.href = "https://www.huzzler.app/freelance-dashboard/createservice"}
                  className="flex-1 bg-white border border-gray-200 rounded-xl p-3 flex flex-col items-center justify-center gap-1 text-center transition-all hover:border-gray-400"
                >
                  <span className="text-gray-700 text-[11px] font-medium flex items-center justify-center gap-1"> Create Manually</span>
                </button>
              </div>
            </motion.div>

            {/* Connecting Arrow */}
            <div className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 pointer-events-none text-[#6C5CE7]/50">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </div>
          </FadeUp>

          {/* Card 3 */}
          <FadeUp delay={0.3} className="flex relative group">
            <motion.div
              whileHover={{ y: -8, boxShadow: "0 20px 40px -10px rgba(22, 163, 74, 0.16)", borderColor: "#16A34A" }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-[28px] border border-[#EAEBF0] p-7 flex flex-col justify-between w-full shadow-[0_4px_20px_rgba(10,15,44,0.03)] cursor-pointer transition-all"
            >
              <div>
                <div className="w-12 h-12 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center mb-4 border border-[#BBF7D0]">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <polyline points="17 11 19 13 23 9" />
                  </svg>
                </div>
                <span className="inline-block text-[10px] font-medium text-[#16A34A] bg-[#DCFCE7] px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-3">
                  STEP 03
                </span>
                <h3 className="text-[#0A0F2C] font-medium text-lg mb-2">
                  Discover Better Matches
                </h3>
                <p className="text-[#6B7280] text-xs leading-relaxed mb-6">
                  Our AI recommends relevant freelancers, clients, and opportunities based on skills, experience, and requirements.
                </p>
              </div>

              {/* Bottom Graphic 3 */}
              <div className="bg-[#F8FAFC] border border-[#EAEBF0] rounded-2xl p-4 flex items-center justify-between mt-auto">
                <div className="flex flex-col gap-1.5">
                  <div className="flex -space-x-2">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" className="w-7 h-7 rounded-full border-2 border-white object-cover" alt="User" />
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" className="w-7 h-7 rounded-full border-2 border-white object-cover" alt="User" />
                    <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80" className="w-7 h-7 rounded-full border-2 border-white object-cover" alt="User" />
                  </div>
                  <div className="text-[#F59E0B] text-xs font-medium tracking-widest">★★★★★</div>
                </div>
                <span className="text-[11px] font-medium text-[#16A34A] bg-[#DCFCE7] px-2.5 py-1.5 rounded-lg border border-[#BBF7D0]">
                  98% Match
                </span>
              </div>
            </motion.div>

            {/* Connecting Arrow */}
            <div className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 pointer-events-none text-[#6C5CE7]/50">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </div>
          </FadeUp>

          {/* Card 4 */}
          <FadeUp delay={0.4} className="flex relative group">
            <motion.div
              whileHover={{ y: -8, boxShadow: "0 20px 40px -10px rgba(108, 92, 231, 0.16)", borderColor: "#6C5CE7" }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-[28px] border border-[#EAEBF0] p-7 flex flex-col justify-between w-full shadow-[0_4px_20px_rgba(10,15,44,0.03)] cursor-pointer transition-all"
            >
              <div>
                <div className="w-12 h-12 rounded-full bg-[#F3E8FF] text-[#6C5CE7] flex items-center justify-center mb-4 border border-[#EBE7FF]">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <span className="inline-block text-[10px] font-medium text-[#6C5CE7] bg-[#F3E8FF] px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-3">
                  STEP 04
                </span>
                <h3 className="text-[#0A0F2C] font-medium text-lg mb-2">
                  Connect & Get Started
                </h3>
                <p className="text-[#6B7280] text-xs leading-relaxed mb-6">
                  Start conversations, ask questions, and connect with the right people while Huzzler AI helps guide you.
                </p>
              </div>

              {/* Bottom Graphic 4 */}
              <div className="flex flex-col gap-2 mt-auto">
                <div className="bg-[#6C5CE7] text-white text-[11px] font-medium px-3.5 py-2 rounded-2xl rounded-tr-none self-end max-w-[90%] shadow-sm">
                  Hi! I'm interested in your project.
                </div>
                <div className="bg-gray-100 text-gray-800 text-[11px] font-medium px-3.5 py-2 rounded-2xl rounded-tl-none self-start max-w-[90%] border border-gray-200/60">
                  Great! Let's discuss the details.
                </div>
                <div className="bg-gray-100 text-gray-400 text-[10px] font-medium px-3 py-1 rounded-full self-start w-10 text-center border border-gray-200/60">
                  •••
                </div>
              </div>
            </motion.div>
          </FadeUp>
        </div>

        {/* Bottom Huzzler AI Banner */}
        <FadeUp delay={0.5}>
          <div className="mt-12 max-w-4xl mx-auto bg-[#F6F4FF] border border-[#EBE7FF] rounded-2xl p-4 md:p-4.5 flex items-center justify-center gap-2.5 text-center shadow-sm">
            <span className="text-[#6C5CE7] text-base">✦</span>
            <p className="text-[#6C5CE7] text-xs md:text-sm font-medium">
              Huzzler AI is with you at every step to <span className="font-medium text-[#6C5CE7]">save time, reduce effort, and help you achieve more.</span>
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="pt-10 sm:pt-14 pb-16 sm:pb-24 px-4 md:px-16 bg-[#F8F8F8]">
      <FadeUp>
        <div className="relative rounded-[28px] sm:rounded-[36px] border border-white/4 bg-[#06040F] overflow-hidden px-6 py-14 sm:py-16 md:px-20 md:py-24 flex flex-col items-center text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(108,92,231,0.22) 0%, transparent 70%)" }} />
          <div className="relative flex flex-col items-center gap-6 max-w-[800px]">
            <h2 className="text-white font-medium text-[clamp(32px,10vw,76px)] lg:text-[clamp(40px,6vw,76px)] leading-[1.1] md:leading-[1] tracking-tight md:tracking-[-3.8px]">World-class experts<br />at your command</h2>
            <p className="text-white/50 text-[15px] sm:text-[16px] md:text-[18px] leading-[1.68] max-w-[520px]">Huzzler helps startups and enterprises scale faster with vetted global freelancers — powered by AI precision.</p>
            <div className="flex flex-wrap gap-3.5 justify-center pt-6">
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(108,92,231,0.6)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => window.open("https://huzzler.app/freelance-dashboard/browse-projects", "_blank")}
                className="flex items-center gap-2 bg-[#6C5CE7] text-white font-medium text-[15px] px-9 py-[17px] rounded-full shadow-[0_8px_32px_0_rgba(108,92,231,0.5)] transition-all"
              >
                Hire Top Talent
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3.33331 8H12.6666M7.99998 12.6673L12.6666 8L7.99998 3.33398" stroke="white" strokeWidth="1.66667" /></svg>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => window.open("https://huzzler.app/", "_blank")}
                className="text-white font-semibold text-[15px] px-9 py-[16px] rounded-full border border-white/18 hover:bg-white/5 transition-all"
              >
                Become a Freelancer
              </motion.button>
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Index() {
  const tickerItems = [
    "Huzzler. Freelance Made Simple",
    "AI-Powered Matching",
    "Secure Payments System",
    "48K+ Elite Freelancers",
    "10K+ Tasks Completed",
    "Trusted by Top Teams",
    "World-Class Experts",
    "Fast Delivery. Reliable Results",
  ];

  return (
    <div className="font-sans hz-comp1-wrapper overflow-x-hidden">
      <HeroSection />
      <Ticker items={tickerItems} />
      <CategoriesSection />
      <CTASection />
      <WhyHuzzlerSection />

      <BlogSection />
      <HowItWorksSection />
      <JourneySection />

      <ReviewsSection />
    </div>
  );
}