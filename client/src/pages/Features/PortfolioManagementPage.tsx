import { useState } from "react";
import { useLocation } from "wouter";
import SEO from "@/components/SEO";
import {
  Shield,
  ArrowRight,
  Play,
  Check,
  Plus,
  Minus,
  Bot,
  Briefcase,
  FileText,
  BarChart3,
  MessageSquare,
  Zap,
  TrendingUp,
} from "lucide-react";

interface StepItem {
  number: string;
  title: string;
  description: string;
}

const STEPS: StepItem[] = [
  {
    number: "01",
    title: "Build your showcase",
    description:
      "Add your best projects with images, case studies, and outcomes.",
  },
  {
    number: "02",
    title: "Auto-sync completions",
    description:
      "Finished Huzzler projects can be added to your portfolio in one tap.",
  },
  {
    number: "03",
    title: "Collect proof",
    description:
      "Client testimonials attach directly to the relevant piece of work.",
  },
  {
    number: "04",
    title: "Share anywhere",
    description:
      "Publish a clean, shareable portfolio link that works outside Huzzler too.",
  },
];

interface BuiltFromRow {
  title: string;
  description: string;
}

const BUILT_FROM_ROWS: BuiltFromRow[] = [
  {
    title: "Profile fields",
    description:
      "Bio, skills, and category expertise feed directly into how your portfolio is organized.",
  },
  {
    title: "Portfolio links",
    description:
      "Attach external links or completed Huzzler projects as proof of past work.",
  },
  {
    title: "Service cards on display",
    description:
      "Your active service cards double as portfolio entries, complete with price range and delivery days.",
  },
  {
    title: "Review-backed proof",
    description:
      "Completed-project reviews attach to the relevant portfolio piece automatically.",
  },
];

interface OutcomeCard {
  title: string;
  description: string;
}

const OUTCOME_CARDS: OutcomeCard[] = [
  {
    title: "Always up to date",
    description:
      "Completed work flows into your portfolio automatically.",
  },
  {
    title: "Verified proof, not claims",
    description:
      "Testimonials link back to real, completed projects.",
  },
  {
    title: "Organized by outcome",
    description:
      "Group work by skill, industry, or result — not just by date.",
  },
  {
    title: "One link to share",
    description:
      "A single portfolio page works everywhere you pitch.",
  },
];

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Do I have to re-upload finished projects?",
    answer:
      "No. When you complete projects on Huzzler, you can import them directly with client reviews, ratings, and verified tags in a single click.",
  },
  {
    question: "Can I link outside work too?",
    answer:
      "Yes. You have complete control over visibility. You can keep sensitive projects private, password-protected, or share NDA-compliant summaries.",
  },
  {
    question: "Is my portfolio public by default?",
    answer:
      "Yes. Your portfolio is seamlessly integrated into your profile and proposals, allowing prospective clients to explore your past successes immediately.",
  },
];

interface OtherFeature {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
}

const OTHER_FEATURES: OtherFeature[] = [
  {
    id: "ai-talent-matching",
    title: "AI Talent Matching",
    icon: Bot,
    path: "/features/ai-talent-matching",
  },
  {
    id: "project-marketplace",
    title: "Project Marketplace",
    icon: Briefcase,
    path: "/features/project-marketplace",
  },
  {
    id: "smart-proposals",
    title: "Smart Proposals",
    icon: FileText,
    path: "/features/smart-proposals",
  },
  {
    id: "project-analytics",
    title: "Project Analytics",
    icon: BarChart3,
    path: "/features/project-analytics",
  },
  {
    id: "real-time-messaging",
    title: "Real-Time Messaging",
    icon: MessageSquare,
    path: "/features/real-time-messaging",
  },
  {
    id: "ai-assistant",
    title: "AI Assistant",
    icon: Zap,
    path: "/features/ai-assistant",
  },
  {
    id: "team-collaboration",
    title: "Team Collaboration",
    icon: TrendingUp,
    path: "/features/team-collaboration",
  },
];

export default function PortfolioManagementPage() {
  const [, setLocation] = useLocation();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] font-sans antialiased text-gray-900 selection:bg-purple-500 selection:text-white">
      <SEO
        title="Portfolio Management | A Portfolio That Keeps Itself Current | Huzzler"
        description="Connect your work in progress with Huzzler. When completed, projects update your portfolio automatically — no more stale case studies."
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
            {/* Breadcrumb: Portfolio Management */}
            <div className="relative -top-16 sm:-top-20 -left-14 sm:-left-16 flex items-center gap-2 text-xs sm:text-sm font-medium text-white/70 mb-0">
              <span
                onClick={() => setLocation("/features")}
                className="hover:text-white hover:underline cursor-pointer transition-colors"
              >
                Features
              </span>
              <span className="text-white/40">/</span>
              <span className="text-white">Portfolio Management</span>
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
              A portfolio that
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
                keeps itself current
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
                maxWidth: "575px",
                minHeight: "56px",
                opacity: 1,
              }}
            >
              Showcase your strongest work and let completed projects update
              your portfolio automatically — no more stale case studies.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5">
              <button
                onClick={() =>
                  window.open(
                    "https://play.google.com/store/apps/details?id=com.huzzler.app",
                    "_blank"
                  )
                }
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#6D4AFF] hover:bg-[#5D39EE] text-white text-xs sm:text-sm font-medium transition-all cursor-pointer active:scale-95"
                style={{
                  width: "146px",
                  height: "45.75px",
                  borderRadius: "999px",
                  boxShadow: "0px 8px 20px -8px #6D28D98C",
                  opacity: 1,
                }}
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => scrollToSection("built-from")}
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 text-white text-xs sm:text-sm font-medium transition-all cursor-pointer backdrop-blur-sm active:scale-95"
              >
                Explore architecture
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. FROM IDEA TO OUTCOME IN FOUR STEPS                                      */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-24 px-6 sm:px-10 bg-[#F8F9FC]">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-14">
            <h2
              className="text-2xl sm:text-3xl lg:text-[38px] font-semibold tracking-[-0.76px] leading-tight lg:leading-[57px] mb-2.5 font-['Inter',sans-serif] text-[#15131F] align-middle"
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
              From idea to outcome in four steps
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
              Portfolio Management is built to get out of your way — here's the path from
              first click to result.
            </p>
          </div>

          {/* 4 Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step) => (
              <div key={step.number} className="flex flex-col items-start">
                {/* Number Badge */}
                <div
                  className="w-[56px] h-[56px] rounded-[16px] bg-white border border-[#E7E3F5] flex items-center justify-center text-sm font-bold text-[#6D4AFF] mb-5"
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "16px",
                    border: "1px solid var(--color-grey-93-3, #E7E3F5)",
                    boxShadow: "0px 12px 32px -16px #2E10652E, 0px 1px 2px 0px #1711330A",
                    opacity: 1,
                  }}
                >
                  {step.number}
                </div>

                {/* Step Title */}
                <h3
                  className="text-[17px] font-semibold tracking-[-0.34px] leading-[25.5px] mb-2 font-['Inter',sans-serif] text-[#15131F] align-middle"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: "17px",
                    lineHeight: "25.5px",
                    letterSpacing: "-0.34px",
                    color: "var(--color-blue-10, #15131F)",
                    verticalAlign: "middle",
                    maxWidth: "258px",
                    minHeight: "26px",
                    opacity: 1,
                  }}
                >
                  {step.title}
                </h3>

                {/* Step Description */}
                <p
                  className="text-[14.5px] font-normal leading-[21.75px] font-['Inter',sans-serif] text-[#5B5770] align-middle"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: "14.5px",
                    lineHeight: "21.75px",
                    letterSpacing: "0%",
                    color: "var(--color-blue-39, #5B5770)",
                    verticalAlign: "middle",
                    maxWidth: "258px",
                    minHeight: "44px",
                    opacity: 1,
                  }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. WHAT PORTFOLIO MANAGEMENT IS ACTUALLY BUILT FROM                      */}
      {/* ========================================================================= */}
      <section id="built-from" className="py-12 sm:py-16 px-6 sm:px-10 bg-[#F8F9FC]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <h2
              className="text-2xl sm:text-3xl lg:text-[38px] font-semibold tracking-tight lg:tracking-[-0.76px] leading-tight lg:leading-[57px] mb-6 font-['Inter',sans-serif] text-[#15131F] max-w-[620px] align-middle"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: "38px",
                lineHeight: "57px",
                letterSpacing: "-0.76px",
                color: "var(--color-blue-10, #15131F)",
                verticalAlign: "middle",
                maxWidth: "620px",
                minHeight: "114px",
                opacity: 1,
              }}
            >
              What Portfolio Management is
              <br />
              actually built from
            </h2>
          </div>

          {/* Top Banner Card */}
          <div
            className="bg-white rounded-[20px] border border-[#E7E3F5] shadow-xs mb-5 max-w-[1116px] w-full"
            style={{
              paddingTop: "25.5px",
              paddingRight: "30px",
              paddingBottom: "25.75px",
              paddingLeft: "30px",
              borderRadius: "20px",
              border: "1px solid var(--color-grey-93-3, #E7E3F5)",
              minHeight: "77.25px",
              opacity: 1,
            }}
          >
            <p
              className="text-[14px] sm:text-[15.5px] leading-relaxed sm:leading-[23.25px] font-normal font-['Inter',sans-serif] text-[#5B5770] w-full lg:whitespace-nowrap align-middle"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: "15.5px",
                lineHeight: "23.25px",
                letterSpacing: "0%",
                color: "var(--color-blue-39, #5B5770)",
                verticalAlign: "middle",
                maxWidth: "796px",
                minHeight: "24px",
                opacity: 1,
              }}
            >
              Your portfolio is built from the same profile data you already maintain — not a separate page to keep in sync.
            </p>
          </div>

          {/* Detailed Stack Card */}
          <div
            className="bg-white rounded-[20px] border border-[#E7E3F5] divide-y divide-[#E7E3F5] overflow-hidden max-w-[1116px] w-full"
            style={{
              maxWidth: "1116px",
              minHeight: "306px",
              borderRadius: "20px",
              border: "1px solid var(--color-grey-93-3, #E7E3F5)",
              boxShadow: "0px 12px 32px -16px #2E10652E, 0px 1px 2px 0px #1711330A",
              opacity: 1,
            }}
          >
            {BUILT_FROM_ROWS.map((row, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 hover:bg-purple-50/20 transition-colors"
              >
                <div className="flex items-center gap-2.5 md:w-[220px] shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6D4AFF]" />
                  <span
                    className="text-[15.5px] font-semibold leading-[23.25px] font-['Inter',sans-serif] text-[#15131F] align-middle inline-block"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: "15.5px",
                      lineHeight: "23.25px",
                      letterSpacing: "0%",
                      color: "var(--color-blue-10, #15131F)",
                      verticalAlign: "middle",
                      minHeight: "24px",
                      opacity: 1,
                    }}
                  >
                    {row.title}
                  </span>
                </div>
                <p
                  className="text-[13.5px] sm:text-[15px] leading-relaxed sm:leading-[22.5px] font-normal font-['Inter',sans-serif] text-[#5B5770] max-w-[770px] flex-1 align-middle"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: "15px",
                    lineHeight: "22.5px",
                    letterSpacing: "0%",
                    color: "var(--color-blue-39, #5B5770)",
                    verticalAlign: "middle",
                    maxWidth: "770px",
                    minHeight: "23px",
                    opacity: 1,
                  }}
                >
                  {row.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. BUILT FOR OUTCOMES, NOT JUST FEATURES                                  */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 px-6 sm:px-10 bg-[#F8F9FC]">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-2xl sm:text-3xl lg:text-[38px] font-semibold tracking-tight lg:tracking-[-0.76px] leading-tight lg:leading-[57px] mb-8 font-['Inter',sans-serif] text-[#15131F] max-w-[620px] align-middle"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: "38px",
              lineHeight: "57px",
              letterSpacing: "-0.76px",
              color: "var(--color-blue-10, #15131F)",
              verticalAlign: "middle",
              maxWidth: "620px",
              minHeight: "114px",
              opacity: 1,
            }}
          >
            Built for outcomes, not just
            <br />
            features
          </h2>

          {/* 2x2 Grid of Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {OUTCOME_CARDS.map((card, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs flex items-start gap-4"
              >
                {/* Purple Check Badge */}
                <div className="w-8 h-8 rounded-lg bg-[#EDE7FF] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-[#6D4AFF] stroke-[2.5]" />
                </div>
                <div>
                  <h3
                    className="text-[16.5px] font-semibold tracking-[-0.33px] leading-[24.75px] mb-1 font-['Inter',sans-serif] text-[#15131F] align-middle"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: "16.5px",
                      lineHeight: "24.75px",
                      letterSpacing: "-0.33px",
                      color: "var(--color-blue-10, #15131F)",
                      verticalAlign: "middle",
                      minHeight: "25px",
                      opacity: 1,
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="text-[14.5px] font-normal leading-[21.75px] font-['Inter',sans-serif] text-[#5B5770] align-middle"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      fontSize: "14.5px",
                      lineHeight: "21.75px",
                      letterSpacing: "0%",
                      color: "var(--color-blue-39, #5B5770)",
                      verticalAlign: "middle",
                      minHeight: "22px",
                      opacity: 1,
                    }}
                  >
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. FREQUENTLY ASKED ABOUT PORTFOLIO MANAGEMENT                            */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-18 px-6 sm:px-10 bg-[#F8F9FC]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2
              className="text-xl sm:text-2xl font-semibold tracking-tight leading-normal mb-6 font-['Inter',sans-serif] text-[#15131F] max-w-[620px] align-middle"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: "24px",
                lineHeight: "36px",
                letterSpacing: "-0.48px",
                color: "var(--color-blue-10, #15131F)",
                verticalAlign: "middle",
                maxWidth: "620px",
                minHeight: "36px",
                opacity: 1,
              }}
            >
              Frequently asked about Portfolio Management
            </h2>
          </div>

          {/* Accordion list */}
          <div className="space-y-3.5">
            {FAQ_ITEMS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-[16px] border border-[#E7E3F5] shadow-xs overflow-hidden transition-colors max-w-[1116px] w-full"
                  style={{
                    paddingTop: "4px",
                    paddingRight: "24px",
                    paddingBottom: "4px",
                    paddingLeft: "24px",
                    borderRadius: "16px",
                    border: "1px solid var(--color-grey-93-3, #E7E3F5)",
                    minHeight: "76px",
                    opacity: 1,
                  }}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full py-4 flex items-center justify-between text-left cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <span
                      className="text-[15.5px] font-semibold leading-[23.25px] font-['Inter',sans-serif] text-[#15131F] align-middle"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                        fontSize: "15.5px",
                        lineHeight: "23.25px",
                        letterSpacing: "0%",
                        color: "var(--color-blue-10, #15131F)",
                        verticalAlign: "middle",
                        minHeight: "24px",
                        opacity: 1,
                      }}
                    >
                      {faq.question}
                    </span>
                    <div className="w-6 h-6 rounded-md bg-[#F4F0FF] flex items-center justify-center text-[#6D4AFF] shrink-0">
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-1 border-t border-gray-100/80 text-xs sm:text-[13px] text-gray-500 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. MORE WAYS HUZZLER AI HELPS YOU WORK                                    */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 px-6 sm:px-10 bg-[#F8F9FC]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2
              className="text-xl sm:text-2xl font-semibold tracking-tight leading-normal font-['Inter',sans-serif] text-[#15131F] max-w-[620px] align-middle"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: "24px",
                lineHeight: "36px",
                letterSpacing: "-0.48px",
                color: "var(--color-blue-10, #15131F)",
                verticalAlign: "middle",
                opacity: 1,
              }}
            >
              More ways Huzzler AI helps you work
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
            {OTHER_FEATURES.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.id}
                  onClick={() => setLocation(feat.path)}
                  className="bg-white rounded-[16px] border border-[#E7E3F5] shadow-xs cursor-pointer flex flex-col justify-between w-full"
                  style={{
                    padding: "20px",
                    borderRadius: "16px",
                    border: "1px solid var(--color-grey-93-3, #E7E3F5)",
                    minHeight: "114px",
                    gap: "12px",
                    opacity: 1,
                  }}
                >
                  <div className="w-9 h-9 rounded-xl bg-[#F4F0FF] flex items-center justify-center text-[#7C3AED]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900">
                    {feat.title}
                  </h3>
                </div>
              );
            })}
          </div>

          {/* ===================================================================== */}
          {/* 7. CTA BANNER ("Ready to put portfolio management to work?")         */}
          {/* ===================================================================== */}
          <div className="relative overflow-hidden rounded-3xl bg-[#080913] border border-white/10 px-8 py-16 sm:py-20 text-center shadow-2xl mb-28 sm:mb-44">
            {/* Purple Radial Glow */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none rounded-full blur-[90px] opacity-45"
              style={{
                background:
                  "radial-gradient(ellipse at top, rgba(109, 74, 255, 0.7) 0%, rgba(139, 92, 246, 0.3) 50%, transparent 80%)",
              }}
            />

            <div className="relative z-10 max-w-xl mx-auto">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-3">
                Ready to put portfolio management to work?
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mb-8 leading-relaxed">
                Join the talent and clients hiring, pitching, and managing work on Huzzler.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3.5">
                <button
                  onClick={() =>
                    window.open(
                      "https://play.google.com/store/apps/details?id=com.huzzler.app",
                      "_blank"
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#6D4AFF] hover:bg-[#5D39EE] text-white text-xs sm:text-sm font-medium transition-all shadow-lg shadow-[#6D4AFF]/30 cursor-pointer active:scale-95"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => (window.location.href = "mailto:support@huzzler.ai")}
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
