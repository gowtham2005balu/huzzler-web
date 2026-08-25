import { useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { FEATURE_MODULES_SEO, FeatureSeoItem } from "@/lib/seoData";
import SEO from "@/components/SEO";
import {
  Bot, Briefcase, FileText, BarChart3, MessageSquare, Shield, Zap, TrendingUp,
  ArrowRight, CheckCircle2, ChevronRight, Sparkles, Star, ArrowLeft
} from "lucide-react";

// Icon mapping
const ICONS: Record<string, React.ReactNode> = {
  Bot: <Bot size={28} />,
  Briefcase: <Briefcase size={28} />,
  FileText: <FileText size={28} />,
  BarChart3: <BarChart3 size={28} />,
  MessageSquare: <MessageSquare size={28} />,
  Shield: <Shield size={28} />,
  Zap: <Zap size={28} />,
  TrendingUp: <TrendingUp size={28} />,
};

export default function FeatureDetail() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/features/:slug");
  const slugParam = params?.slug;

  const currentModule: FeatureSeoItem =
    FEATURE_MODULES_SEO.find(
      (m) => m.id === slugParam || m.slug === `/features/${slugParam}`
    ) || FEATURE_MODULES_SEO[0];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }, [slugParam]);

  const otherModules = FEATURE_MODULES_SEO.filter((m) => m.id !== currentModule.id);

  return (
    <div className="bg-[#0B0D1B] text-white min-h-screen">
      {/* 1. SEO Head Injection */}
      <SEO
        title={currentModule.title}
        description={currentModule.description}
        slug={currentModule.slug}
        imageAlt={currentModule.imageAlt}
      />

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 px-6 md:px-12 lg:px-[100px] border-b border-white/10">
        <div
          className="absolute top-[-20%] left-[20%] w-[500px] height-[500px] rounded-full pointer-events-none opacity-20 blur-[100px]"
          style={{ background: currentModule.accentColor }}
        />

        <div className="max-w-[1280px] mx-auto">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <button
              onClick={() => setLocation("/features")}
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft size={16} /> Features
            </button>
            <ChevronRight size={14} />
            <span className="text-[#A78BFA] font-medium">{currentModule.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading & Info */}
            <div className="lg:col-span-7">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 border"
                style={{
                  background: `${currentModule.accentColor}25`,
                  borderColor: `${currentModule.accentColor}60`,
                  color: "#E0D7FF",
                }}
              >
                <Sparkles size={14} /> {currentModule.badge}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-[1.15]">
                {currentModule.tagline}
              </h1>

              <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-[620px]">
                {currentModule.description}
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 p-6 rounded-2xl bg-white/[0.04] border border-white/10 mb-8">
                {currentModule.stats.map((s) => (
                  <div key={s.label}>
                    <div
                      className="text-2xl sm:text-3xl font-bold mb-1"
                      style={{ color: currentModule.accentColor }}
                    >
                      {s.value}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-400">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() =>
                    window.open(
                      "https://play.google.com/store/apps/details?id=com.huzzler.app",
                      "_blank"
                    )
                  }
                  className="px-6 py-3.5 rounded-xl font-semibold text-sm text-white flex items-center gap-2 transition-all hover:scale-105 shadow-lg"
                  style={{
                    background: currentModule.accentColor,
                    boxShadow: `0 10px 25px ${currentModule.accentColor}50`,
                  }}
                >
                  Get Started Free <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => window.open("https://huzzler.app/", "_blank")}
                  className="px-6 py-3.5 rounded-xl font-semibold text-sm text-white/90 border border-white/20 hover:bg-white/10 transition-colors"
                >
                  Explore Web App
                </button>
              </div>
            </div>

            {/* Right Column: Interactive Visual / Mockup Card with Image Alt */}
            <div className="lg:col-span-5">
              <div className="bg-[#120F2A] border border-[#2B2359] rounded-3xl p-8 shadow-2xl relative">
                {/* Module Icon Showcase with Exact Hardcoded Image Alt attribute */}
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-white"
                      style={{ background: currentModule.accentColor }}
                      role="img"
                      aria-label={currentModule.imageAlt}
                    >
                      {ICONS[currentModule.iconName] || <Sparkles size={28} />}
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">{currentModule.name}</div>
                      <div className="text-xs text-gray-400">Hardcoded Slug: {currentModule.slug}</div>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full font-medium border border-emerald-500/20">
                    <CheckCircle2 size={12} /> Live Module
                  </span>
                </div>

                {/* Checklist & Highlights */}
                <div className="space-y-4 mb-8">
                  {currentModule.bulletPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: `${currentModule.accentColor}30`, color: currentModule.accentColor }}
                      >
                        <CheckCircle2 size={14} />
                      </div>
                      <span className="text-sm text-gray-300 leading-snug">{point}</span>
                    </div>
                  ))}
                </div>

                {/* Alt text verification preview badge */}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-gray-400">
                  <div className="font-semibold text-gray-200 mb-1">SEO Image Alt Text:</div>
                  <p className="italic text-gray-400 leading-relaxed">"{currentModule.imageAlt}"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Deep Dive & Architecture */}
      <section className="py-20 px-6 md:px-12 lg:px-[100px] bg-[#0E0C22]">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center max-w-[680px] mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#A78BFA] mb-2 block">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why Teams Choose {currentModule.name}
            </h2>
            <p className="text-gray-400 text-base leading-relaxed">
              {currentModule.overview}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentModule.bulletPoints.map((point, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-violet-500/50 transition-all group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white mb-4 font-bold text-sm"
                  style={{ background: `${currentModule.accentColor}30`, color: currentModule.accentColor }}
                >
                  0{i + 1}
                </div>
                <div className="text-white font-medium text-base mb-2">Benefit {i + 1}</div>
                <p className="text-sm text-gray-400 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Explore Other 7 Modules */}
      <section className="py-20 px-6 md:px-12 lg:px-[100px] border-t border-white/10 bg-[#0B0D1B]">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#A78BFA] mb-2 block">
                Full Ecosystem
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Explore All Huzzler Modules
              </h2>
            </div>
            <button
              onClick={() => setLocation("/features")}
              className="text-sm text-[#A78BFA] hover:text-white font-medium flex items-center gap-1 transition-colors self-start"
            >
              View all 8 features <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {otherModules.map((m) => (
              <div
                key={m.id}
                onClick={() => setLocation(m.slug)}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-violet-500/40 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                      style={{ background: `${m.accentColor}30`, color: m.accentColor }}
                      role="img"
                      aria-label={m.imageAlt}
                    >
                      {ICONS[m.iconName] || <Sparkles size={20} />}
                    </div>
                    <span className="text-xs text-gray-500 group-hover:text-[#A78BFA] transition-colors">
                      {m.slug}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#A78BFA] transition-colors">
                    {m.name}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-2">
                    {m.description}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-violet-400 group-hover:translate-x-1 transition-transform">
                  Explore Module <ArrowRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Final CTA Banner */}
      <section className="py-20 px-6 md:px-12 lg:px-[100px] bg-gradient-to-r from-violet-900/40 via-purple-900/30 to-indigo-900/40 border-t border-white/10 text-center">
        <div className="max-w-[760px] mx-auto">
          <div className="inline-flex items-center gap-1 text-amber-400 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
            ))}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Supercharge Your Hiring with {currentModule.name}?
          </h2>
          <p className="text-gray-300 text-base mb-8 max-w-[560px] mx-auto">
            Get started today for free. Join thousands of founders, agencies, and top freelancers on Huzzler.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() =>
                window.open(
                  "https://play.google.com/store/apps/details?id=com.huzzler.app",
                  "_blank"
                )
              }
              className="px-8 py-4 rounded-xl font-bold text-sm bg-white text-[#6D4AFF] hover:bg-gray-100 transition-all shadow-xl hover:scale-105 flex items-center gap-2"
            >
              Get Started Free <ArrowRight size={16} />
            </button>
            <button
              onClick={() => setLocation("/features")}
              className="px-8 py-4 rounded-xl font-semibold text-sm text-white border border-white/20 hover:bg-white/10 transition-colors"
            >
              All Features
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
