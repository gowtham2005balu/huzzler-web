import React from "react";
import { useLocation } from "wouter";
import SEO from "@/components/SEO";
import {
  Bot,
  Briefcase,
  FileText,
  BarChart3,
  MessageSquare,
  Shield,
  Zap,
  TrendingUp,
  Sparkles,
  ArrowRight
} from "lucide-react";

const TOOLS = [
  {
    id: "ai-talent-matching",
    title: "AI Talent Matching",
    description: "Smart algorithms connect you with the most qualified professionals.",
    icon: Bot,
    path: "/features/ai-talent-matching"
  },
  {
    id: "project-marketplace",
    title: "Project Marketplace",
    description: "Browse thousands of verified experts across every discipline.",
    icon: Briefcase,
    path: "/features/project-marketplace"
  },
  {
    id: "smart-proposals",
    title: "Smart Proposals",
    description: "AI-powered proposal generator crafts winning pitches in seconds.",
    icon: FileText,
    path: "/features/smart-proposals"
  },
  {
    id: "project-analytics",
    title: "Project Analytics",
    description: "Rich dashboards surface insights that drive smarter hiring.",
    icon: BarChart3,
    path: "/features/project-analytics"
  },
  {
    id: "real-time-messaging",
    title: "Real-Time Messaging",
    description: "Built-in chat, file sharing, and video meetings in one place.",
    icon: MessageSquare,
    path: "/features/real-time-messaging"
  },
  {
    id: "portfolio-management",
    title: "Portfolio Management",
    description: "Showcase your best work and keep your portfolio updated in one place.",
    icon: Shield,
    path: "/features/portfolio-management"
  },
  {
    id: "ai-assistant",
    title: "AI Assistant",
    description: "Get smart suggestions to create profiles, write proposals, and find opportunities.",
    icon: Zap,
    path: "/features/ai-assistant"
  },
  {
    id: "team-collaboration",
    title: "Team Collaboration",
    description: "Work together, share updates, and manage projects with your team in one place.",
    icon: TrendingUp,
    path: "/features/team-collaboration"
  }
];

export default function PlatformFeatures() {
  const [, setLocation] = useLocation();

  const handleBrowseFeatures = () => {
    const el = document.getElementById("tools-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] font-sans antialiased text-gray-900 selection:bg-purple-500 selection:text-white">
      <SEO
        title="Platform Features | Everything You Need to Hire, Manage & Scale | Huzzler"
        description="Huzzler AI combines talent discovery, project management, AI-powered hiring, collaboration tools, and business intelligence into one powerful platform."
      />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Exact Figma layout, gradients & padding)                 */}
      {/* ========================================================================= */}
      <section
        className="relative overflow-hidden text-white border-b border-white/10 min-h-[500px] lg:h-[735px] lg:min-h-[735px] flex flex-col justify-center"
        style={{
          background: `
            radial-gradient(76.39% 86.25% at 82% -10%, rgba(124, 58, 237, 0.55) 0%, rgba(124, 58, 237, 0) 60%),
            radial-gradient(48.61% 75.47% at 10% 110%, rgba(90, 30, 180, 0.35) 0%, rgba(90, 30, 180, 0) 60%),
            linear-gradient(180deg, #0B0A12 0%, #171529 100%)
          `,
        }}
      >
        <div className="w-full max-w-[1440px] mx-auto h-full flex flex-col justify-center px-6 sm:px-10 md:px-12 lg:px-0 lg:pt-[162px] lg:pb-[100px] lg:pl-[162px] lg:pr-[518px] py-16 sm:py-20">
          <div className="relative z-10">
            {/* Breadcrumb: Platform Features */}
            <div className="relative -top-16 sm:-top-20 -left-14 sm:-left-16 flex items-center gap-2 text-xs sm:text-sm font-medium text-white/70 mb-0">
              <span>Features</span>
              <span className="text-white/40">/</span>
              <span className="text-white">Platform Features</span>
            </div>

            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl lg:text-[58px] font-semibold text-white leading-tight lg:leading-[62.64px] tracking-[-1.16px] mb-5 font-['Inter',sans-serif] max-w-[760px] align-middle"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                letterSpacing: "-1.16px",
                verticalAlign: "middle",
                maxWidth: "760px",
                opacity: 1,
              }}
            >
              Everything you need to
              <br />
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#DDD6FE] via-[#C4B5FD] to-[#A78BFA] align-middle inline-block"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  letterSpacing: "-1.16px",
                  verticalAlign: "middle",
                }}
              >
                hire, manage &amp; scale
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-base sm:text-[18.5px] mb-9 font-['Inter',sans-serif]"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: "18.5px",
                lineHeight: "27.75px",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "var(--color-white-72, #FFFFFFB8)",
                maxWidth: "571px",
                minHeight: "84px",
                opacity: 1,
              }}
            >
              Huzzler AI combines talent discovery, project management, AI-powered hiring, collaboration tools, and business intelligence into one powerful platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => window.open("https://play.google.com/store/apps/details?id=com.huzzler.app", "_blank")}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#6D4AFF] hover:bg-[#5D39EE] text-white text-xs sm:text-sm font-medium transition-all shadow-lg shadow-[#6D4AFF]/25 cursor-pointer active:scale-95"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleBrowseFeatures}
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 text-white text-xs sm:text-sm font-medium transition-all cursor-pointer backdrop-blur-sm active:scale-95"
              >
                Browse features
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. EIGHT TOOLS, ONE WORKFLOW SECTION (4x2 Grid of White Cards)            */}
      {/* ========================================================================= */}
      <section id="tools-section" className="py-20 sm:py-24 px-6 sm:px-10 bg-[#F8F9FC]">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-12">
            <h2
              className="text-2xl sm:text-3xl lg:text-[38px] font-semibold tracking-[-0.76px] leading-tight lg:leading-[57px] font-['Inter',sans-serif] text-[#15131F] align-middle mb-2.5"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: "38px",
                lineHeight: "57px",
                letterSpacing: "-0.76px",
                color: "var(--color-blue-10, #15131F)",
                verticalAlign: "middle",
                maxWidth: "620px",
                minHeight: "57px",
                opacity: 1,
              }}
            >
              Eight tools, one workflow
            </h2>
            <p
              className="text-sm sm:text-[17px] font-normal leading-[25.5px] font-['Inter',sans-serif] text-[#5B5770] align-middle"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: "17px",
                lineHeight: "25.5px",
                letterSpacing: "0%",
                color: "var(--color-blue-39, #5B5770)",
                verticalAlign: "middle",
                maxWidth: "620px",
                minHeight: "51px",
                opacity: 1,
              }}
            >
              Each piece works on its own — and even better together. Tap any card to
              see it in depth.
            </p>
          </div>

          {/* 4x2 Grid of Cards */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-24 max-w-[1116px] w-full"
            style={{
              maxWidth: "1116px",
              minHeight: "563px",
              rowGap: "20px",
              columnGap: "20px",
              opacity: 1,
            }}
          >
            {TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.id}
                  onClick={() => setLocation(tool.path)}
                  className="bg-white rounded-[20px] border border-[#E7E3F5] shadow-xs flex flex-col justify-between cursor-pointer w-full"
                  style={{
                    minHeight: "273px",
                    paddingTop: "30px",
                    paddingRight: "26px",
                    paddingBottom: "30px",
                    paddingLeft: "26px",
                    borderRadius: "20px",
                    border: "1px solid var(--color-grey-93-3, #E7E3F5)",
                    gap: "6px",
                    opacity: 1,
                  }}
                >
                  <div>
                    {/* Icon Container */}
                    <div className="w-11 h-11 rounded-xl bg-[#F4F0FF] flex items-center justify-center mb-6 text-[#7C3AED]">
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Title */}
                    <h3
                      className="text-[17.5px] font-semibold leading-[26.25px] tracking-[-0.35px] font-['Inter',sans-serif] text-[#15131F] align-middle mb-2.5"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                        fontSize: "17.5px",
                        lineHeight: "26.25px",
                        letterSpacing: "-0.35px",
                        color: "var(--color-blue-10, #15131F)",
                        verticalAlign: "middle",
                        maxWidth: "210px",
                        minHeight: "27px",
                        opacity: 1,
                      }}
                    >
                      {tool.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-[14px] font-normal leading-[21px] font-['Inter',sans-serif] text-[#5B5770] align-middle mb-6"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "21px",
                        letterSpacing: "0%",
                        color: "var(--color-blue-39, #5B5770)",
                        verticalAlign: "middle",
                        maxWidth: "210px",
                        minHeight: "63px",
                        opacity: 1,
                      }}
                    >
                      {tool.description}
                    </p>
                  </div>

                  {/* Learn more Link */}
                  <div className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-[#6D4AFF] mt-auto">
                    <span>Learn more</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* ===================================================================== */}
          {/* 3. CTA BANNER ("Ready to see Huzzler AI in action?")                  */}
          {/* ===================================================================== */}
          <div className="relative overflow-hidden rounded-3xl bg-[#080913] border border-white/10 px-8 py-16 sm:py-20 text-center shadow-2xl mb-28 sm:mb-44">
            {/* Purple Radial Glow */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none rounded-full blur-[90px] opacity-45"
              style={{
                background: "radial-gradient(ellipse at top, rgba(109, 74, 255, 0.7) 0%, rgba(139, 92, 246, 0.3) 50%, transparent 80%)"
              }}
            />

            <div className="relative z-10 max-w-xl mx-auto">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-3">
                Ready to see Huzzler AI in action?
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mb-8 leading-relaxed">
                Create your account and start matching, pitching, and hiring in minutes.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3.5">
                <button
                  onClick={() => window.open("https://play.google.com/store/apps/details?id=com.huzzler.app", "_blank")}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#6D4AFF] hover:bg-[#5D39EE] text-white text-xs sm:text-sm font-medium transition-all shadow-lg shadow-[#6D4AFF]/30 cursor-pointer active:scale-95"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => window.location.href = "mailto:support@huzzler.ai"}
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 text-white text-xs sm:text-sm font-medium transition-all cursor-pointer backdrop-blur-sm active:scale-95"
                >
                  Talk to us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}