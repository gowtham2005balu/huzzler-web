import { useState } from "react";
import { useLocation } from "wouter";
import SEO from "@/components/SEO";
import {
  Sparkles,
  ArrowRight,
  Play,
  Check,
  Plus,
  Minus,
  Briefcase,
  FileText,
  BarChart3,
  MessageSquare,
  Shield,
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
    title: "Describe the work",
    description:
      "Tell Huzzler what you need in plain language — no rigid forms to fill out.",
  },
  {
    number: "02",
    title: "AI reads the signal",
    description:
      "The matching engine extracts core requirements, seniority level, and stack.",
  },
  {
    number: "03",
    title: "Review ranked matches",
    description:
      "Get a short list ordered by fit, with a plain-English reason behind each recommendation.",
  },
  {
    number: "04",
    title: "Message and hire",
    description:
      "Start a conversation straight from the match card — no extra steps in between.",
  },
];

interface BuiltFromRow {
  title: string;
  description: string;
}

const BUILT_FROM_ROWS: BuiltFromRow[] = [
  {
    title: "Skill match",
    description:
      "Weighs your listed skills against the specific sub-category of the project — Graphic Design → Logo Design, not just the broad category.",
  },
  {
    title: "Category depth",
    description:
      "Filters through main categories and sub-categories, so a “developer” match narrows to the right stack, not just the right title.",
  },
  {
    title: "Delivery history",
    description:
      "Looks at completed projects and their status — accepted, in progress, completed — to judge reliability.",
  },
  {
    title: "Portfolio signal",
    description:
      "Cross-checks portfolio links and past work attached to a profile before ranking a match.",
  },
];

interface OutcomeCard {
  title: string;
  description: string;
}

const OUTCOME_CARDS: OutcomeCard[] = [
  {
    title: "Fewer bad hires",
    description:
      "Matches weigh completed work, not just listed skills on a profile.",
  },
  {
    title: "Faster shortlists",
    description:
      "Go from brief to ranked candidates in under a minute.",
  },
  {
    title: "Built-in fairness",
    description:
      "Every freelancer is scored against the same criteria, every time.",
  },
  {
    title: "Learns as you hire",
    description:
      "The engine sharpens its sense of “good fit” for your team with every project.",
  },
];

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How does the AI match talent to my project?",
    answer:
      "Our proprietary AI analyzes your job brief across 200+ signals including tech stack, experience level, availability, past client reviews, and delivery success metrics.",
  },
  {
    question: "Can I review profiles before contacting them?",
    answer:
      "Yes. You have full visibility into each matched freelancer's portfolio case studies, verified skill assessments, past client feedback, and transparent rates.",
  },
  {
    question: "What if I'm not satisfied with the initial matches?",
    answer:
      "You can adjust your brief parameters, add specific skill requirements, or refine budget filters anytime to instantly generate a new ranked batch of talent.",
  },
];

interface OtherFeature {
  name: string;
  slug: string;
  icon: typeof Briefcase;
}

const OTHER_FEATURES: OtherFeature[] = [
  {
    name: "Project Marketplace",
    slug: "/features/project-marketplace",
    icon: Briefcase,
  },
  {
    name: "Smart Proposals",
    slug: "/features/smart-proposals",
    icon: FileText,
  },
  {
    name: "Project Analytics",
    slug: "/features/project-analytics",
    icon: BarChart3,
  },
  {
    name: "Real-Time Messaging",
    slug: "/features/real-time-messaging",
    icon: MessageSquare,
  },
  {
    name: "Portfolio Management",
    slug: "/features/portfolio-management",
    icon: Shield,
  },
  {
    name: "AI Assistant",
    slug: "/features/ai-assistant",
    icon: Zap,
  },
  {
    name: "Team Collaboration",
    slug: "/features/team-collaboration",
    icon: TrendingUp,
  },
];

export default function AiTalentMatchingPage() {
  const [, setLocation] = useLocation();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="w-full bg-[#F8F9FC] text-gray-900 font-sans selection:bg-[#6D4AFF] selection:text-white">
      {/* 0. SEO Injection */}
      <SEO
        title="AI Talent Matching | Find Verified Freelance Experts Fast | Huzzler"
        description="Huzzler's AI Talent Matching connects you with the most qualified freelance professionals in seconds. Smart algorithms analyze skills, experience, and fit to save you hours of manual searching."
        slug="/features/ai-talent-matching"
        imageAlt="AI Talent Matching icon representing smart algorithm-based freelancer matching on Huzzler"
      />

      {/* 1. HERO SECTION (Exact Figma layout, gradients & padding) */}
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
            {/* Breadcrumb: AI Talent Matching */}
            <div className="relative -top-16 sm:-top-20 -left-14 sm:-left-16 flex items-center gap-2 text-xs sm:text-sm font-medium text-white/70 mb-0">
              <span
                onClick={() => setLocation("/features")}
                className="hover:text-white hover:underline cursor-pointer transition-colors"
              >
                Features
              </span>
              <span className="text-white/40">/</span>
              <span className="text-white">AI Talent Matching</span>
            </div>

            {/* Heading */}
            <h1
              className="text-4xl sm:text-5xl lg:text-[58px] font-semibold text-white leading-tight lg:leading-[62.64px] tracking-[-1.16px] mb-5 font-['Inter',sans-serif] max-w-[760px]"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                letterSpacing: "-1.16px",
                maxWidth: "760px",
                minHeight: "126px",
                opacity: 1,
              }}
            >
              Find the right person,
              <br />
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#C4B5FD] via-[#A78BFA] to-[#8B5CF6] align-middle inline-block"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  letterSpacing: "-1.16px",
                  verticalAlign: "middle",
                }}
              >
                not just a resume
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
                maxWidth: "599px",
                minHeight: "84px",
                opacity: 1,
              }}
            >
              Our matching engine reads a brief the way a great recruiter would —
              skills, availability, and past outcomes — and ranks freelancers by
              real fit, not keywords.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => {
                  window.open(
                    "https://play.google.com/store/apps/details?id=com.huzzler.app",
                    "_blank"
                  );
                }}
                className="bg-[#6D4AFF] hover:bg-[#5b3be8] text-white px-6 py-2.5 rounded-full font-medium text-sm flex items-center gap-1.5 transition-all shadow-lg shadow-[#6D4AFF]/30 cursor-pointer hover:scale-102"
              >
                <span>Get Started</span>
                <ArrowRight size={14} />
              </button>
              <button
                onClick={() => setLocation("/features")}
                className="bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 text-white px-6 py-2.5 rounded-full font-medium text-sm transition-all cursor-pointer"
              >
                Explore all features
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION: FROM IDEA TO OUTCOME IN FOUR STEPS */}
      <section className="py-20 px-6 md:px-12 lg:px-16">
        <div className="max-w-[1180px] mx-auto">
          <h2
            className="text-2xl sm:text-3xl lg:text-[38px] font-semibold tracking-tight lg:tracking-[-0.76px] leading-tight lg:leading-[57px] mb-2 font-['Inter',sans-serif] text-[#15131F] max-w-[620px] align-middle"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
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
            className="text-[15px] sm:text-[17px] leading-relaxed sm:leading-[25.5px] mb-12 font-['Inter',sans-serif] text-[#5B5770] max-w-[620px] align-middle"
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
            AI Talent Matching is built to get out of your way — here's the path from first
            click to result.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step) => (
              <div key={step.number} className="flex flex-col">
                <div
                  className="w-[56px] h-[56px] rounded-[16px] bg-white border border-[#E7E3F5] shadow-xs flex items-center justify-center text-sm font-bold text-[#6D4AFF] mb-4"
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "16px",
                    border: "1px solid var(--color-grey-93-3, #E7E3F5)",
                    opacity: 1,
                  }}
                >
                  {step.number}
                </div>
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
                    opacity: 1,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-[14.5px] font-normal leading-[21.75px] font-['Inter',sans-serif] text-[#5B5770] max-w-[258px] align-middle"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: "14.5px",
                    lineHeight: "21.75px",
                    letterSpacing: "0%",
                    color: "var(--color-blue-39, #5B5770)",
                    verticalAlign: "middle",
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

      {/* 3. SECTION: WHAT AI TALENT MATCHING IS ACTUALLY BUILT FROM */}
      <section className="pb-20 px-6 md:px-12 lg:px-16">
        <div className="max-w-[1180px] mx-auto">
          <h2
            className="text-2xl sm:text-3xl lg:text-[38px] font-semibold tracking-tight lg:tracking-[-0.76px] leading-tight lg:leading-[57px] mb-6 font-['Inter',sans-serif] text-[#15131F] max-w-[620px] align-middle"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              letterSpacing: "-0.76px",
              color: "var(--color-blue-10, #15131F)",
              verticalAlign: "middle",
              maxWidth: "620px",
              minHeight: "114px",
              opacity: 1,
            }}
          >
            What AI Talent Matching is actually
            <br />
            built from
          </h2>

          {/* Top banner pill */}
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
                minHeight: "24px",
                opacity: 1,
              }}
            >
              Behind every match is a real project card and a real freelancer profile — here's what the engine actually looks at.
            </p>
          </div>

          {/* 4 Architectural Rows Card */}
          <div
            className="bg-white rounded-[20px] border border-[#E7E3F5] divide-y divide-[#E7E3F5] overflow-hidden max-w-[1116px] w-full"
            style={{
              borderRadius: "20px",
              border: "1px solid var(--color-grey-93-3, #E7E3F5)",
              boxShadow: "0px 12px 32px -16px #2E10652E, 0px 1px 2px 0px #1711330A",
              minHeight: "306px",
              opacity: 1,
            }}
          >
            {BUILT_FROM_ROWS.map((row) => (
              <div
                key={row.title}
                className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-8"
              >
                <div className="flex items-center gap-2.5 md:w-[220px] shrink-0">
                  <Play
                    size={10}
                    className="fill-[#6D4AFF] text-[#6D4AFF] shrink-0"
                  />
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
                    minHeight: "45px",
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

      {/* 4. SECTION: BUILT FOR OUTCOMES, NOT JUST FEATURES */}
      <section className="pb-20 px-6 md:px-12 lg:px-16">
        <div className="max-w-[1180px] mx-auto">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {OUTCOME_CARDS.map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-[20px] border border-[#E7E3F5] shadow-xs flex items-start gap-4 p-[28px] w-full"
                style={{
                  maxWidth: "548px",
                  borderRadius: "20px",
                  border: "1px solid var(--color-grey-93-3, #E7E3F5)",
                  padding: "28px",
                  minHeight: "110.5px",
                  gap: "16px",
                  opacity: 1,
                }}
              >
                <div
                  className="w-[34px] h-[34px] rounded-[10px] bg-[#EFE9FE] text-[#6D4AFF] flex items-center justify-center shrink-0 mt-0.5"
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "10px",
                    background: "var(--color-grey-95-14, #EFE9FE)",
                    opacity: 1,
                  }}
                >
                  <Check size={16} className="stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-gray-900 mb-1">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SECTION: FREQUENTLY ASKED ABOUT AI TALENT MATCHING */}
      <section className="pb-20 px-6 md:px-12 lg:px-16">
        <div className="max-w-[1180px] mx-auto">
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
            Frequently asked about AI Talent Matching
          </h2>

          <div className="flex flex-col gap-3.5">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={item.question}
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
                    onClick={() => toggleFaq(index)}
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
                        opacity: 1,
                      }}
                    >
                      {item.question}
                    </span>
                    <span className="w-6 h-6 rounded-md flex items-center justify-center text-[#6D4AFF] bg-violet-50 shrink-0 ml-4">
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="pb-4 pt-1 text-xs sm:text-[13px] text-gray-500 leading-relaxed border-t border-gray-100">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. SECTION: MORE WAYS HUZZLER AI HELPS YOU WORK */}
      <section className="pb-20 px-6 md:px-12 lg:px-16">
        <div className="max-w-[1180px] mx-auto">
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
              opacity: 1,
            }}
          >
            More ways Huzzler AI helps you work
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {OTHER_FEATURES.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.slug}
                  onClick={() => setLocation(feat.slug)}
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
                  <div className="w-9 h-9 rounded-xl bg-violet-50 text-[#6D4AFF] flex items-center justify-center">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900">
                    {feat.name}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. SECTION: READY TO PUT AI TALENT MATCHING TO WORK? (Dark Card Banner) */}
      <section className="pt-20 pb-40 sm:pt-28 sm:pb-52 px-6 md:px-12 lg:px-16">
        <div className="max-w-[1116px] mx-auto">
          <div
            className="relative overflow-hidden rounded-3xl border border-white/10 px-8 py-12 sm:py-14 text-center shadow-xl w-full mx-auto flex flex-col items-center justify-center"
            style={{
              maxWidth: "1116px",
              minHeight: "298.75px",
              opacity: 1,
              background:
                "radial-gradient(53.76% 100.5% at 50% -20%, rgba(124, 58, 237, 0.5) 0%, rgba(124, 58, 237, 0) 65%), #080913",
            }}
          >

            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 relative z-10">
              Ready to put ai talent matching to work?
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 max-w-[540px] mx-auto mb-8 relative z-10 leading-relaxed">
              Join the freelancers and teams already hiring, pitching, and
              scaling faster on Huzzler AI.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 relative z-10">
              <button
                onClick={() => {
                  window.open(
                    "https://play.google.com/store/apps/details?id=com.huzzler.app",
                    "_blank"
                  );
                }}
                className="bg-[#6D4AFF] hover:bg-[#5b3be8] text-white px-6 py-2.5 rounded-full font-medium text-sm flex items-center gap-1.5 transition-all shadow-lg shadow-[#6D4AFF]/30 cursor-pointer hover:scale-102"
              >
                <span>Get Started</span>
                <ArrowRight size={14} />
              </button>
              <button
                onClick={() => setLocation("/features")}
                className="bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 text-white px-6 py-2.5 rounded-full font-medium text-sm transition-all cursor-pointer"
              >
                All features
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
