import React from "react";
import { Sparkles, Paperclip, MessageSquare, Bot, GanttChartSquare } from "lucide-react";

const steps = [
  {
    eyebrow: "STEP 01 — MATCH",
    title: "AI-Powered Matching",
    description:
      "Our model learns from 200+ signals to surface only the opportunities that match your exact skills, rate, and work style — no noise.",
    visual: <MatchCard />,
  },
  {
    eyebrow: "STEP 02 — PROPOSE",
    title: "AI-Assisted Proposals",
    description:
      "Write winning proposals in under 30 seconds. Huzzler AI drafts, refines, and personalizes every pitch based on your portfolio and the client's brief.",
    visual: <ProposeCard />,
  },
  {
    eyebrow: "STEP 03 — DELIVER & SECURE",
    title: "Project Management",
    description:
      "Track every milestone, never miss a deadline, and get paid on time — every time. Huzzler Secure Escrow protects both sides of every contract.",
    visual: <DeliverCard />,
  },
];

function MatchCard() {
  return (
    <div className="rounded-2xl bg-white shadow-xs text-[#5A4BD1] p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-xs font-semibold text-white">
          JA
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-900">
            Welcome back, Andrew! 👋
          </p>
          <p className="mt-1 text-xs text-slate-500">
            You have{" "}
            <span className="font-semibold text-indigo-600">
              12 new matches
            </span>{" "}
            waiting{" "}
            <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1 text-xs font-semibold text-white">
              12
            </span>
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-[#EDE9FF] px-3 py-1 text-xs font-medium text-[#6C5CE7">
          🎨 UI/UX Designer
        </span>
        <span className="rounded-full bg-[#FFF8CC] px-3 py-1 text-xs font-medium text-[#B8860B]">
          ₹80K–₹1.1L/mo
        </span>
        <span className="rounded-full bg-[#EDE9FF] px-3 py-1 text-xs font-medium text-[#6C5CE7]">
          Remote
        </span>
      </div>
    </div>
  );
}

function ProposeCard() {
  return (
    <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-500">
          <Bot className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-900">
            Huzzler AI Assistant
          </p>
          <p className="text-xs text-slate-400">Powered by Claude · Always ready</p>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-[#EDE9FF] px-4 py-3 text-xs leading-relaxed text-[#5A4BD1]">
        "Here's a tailored proposal for the Zuntra Digital role, highlighting
        your Figma skills and 3 relevant case studies. Hit send when ready ✅"
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button className="inline-flex items-center gap-1.5 rounded-full bg-[#6C5CE7] px-3.5 py-2 text-xs font-semibold text-white">
          <Sparkles className="h-3.5 w-3.5" />
          Write Proposal
        </button>
        <button className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3.5 py-2 text-xs font-semibold text-slate-700">
          <Paperclip className="h-3.5 w-3.5" />
          Upload Work
        </button>
        <button className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3.5 py-2 text-xs font-semibold text-slate-700">
          <MessageSquare className="h-3.5 w-3.5" />
          Reply Client
        </button>
      </div>
    </div>
  );
}

function DeliverCard() {
  const items = [
    {
      dot: "bg-indigo-500",
      title: "Wireframe Delivery — Zuntra",
      meta: "Due June 3 · 4 days left",
      badge: "In Progress",
      badgeClass: "bg-sky-100 text-sky-700",
    },
    {
      dot: "bg-amber-400",
      title: "Brand Kit — Korvax Labs",
      meta: "Due June 7 · 8 days left",
      badge: "In Review",
      badgeClass: "bg-amber-100 text-amber-700",
    },
    {
      dot: "bg-emerald-500",
      title: "Logo Pack — Helio",
      meta: "Delivered May 20",
      badge: "Paid ✓",
      badgeClass: "bg-emerald-100 text-emerald-700",
    },
  ];

  return (
    <div className="rounded-2xl  shadow-sm ring-1 ring-slate-100 p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GanttChartSquare className="h-4 w-4 text-slate-700" />
          <p className="text-xs font-semibold text-slate-900">
            Upcoming Deadlines
          </p>
        </div>
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
          🔒 Escrow Active
        </span>
      </div>

      <ul className="mt-4 space-y-4">
        {items.map((item) => (
          <li key={item.title} className="flex items-center justify-between gap-3">
            <div className="flex items-start gap-2">
              <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${item.dot}`} />
              <div>
                <p className="text-xs font-medium text-slate-900">{item.title}</p>
                <p className="text-xs text-slate-400">{item.meta}</p>
              </div>
            </div>
            <span
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${item.badgeClass}`}
            >
              {item.badge}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function HuzzlerWay() {
  return (
    <section className="bg-gradient-to-b from-white via-white to-[#D7D2FF] px-6 py-20 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          The Huzzler Way
        </h2>
        <p className="mt-4 max-w-lg text-base text-slate-500 sm:text-lg">
          From zero to your first client — Huzzler's AI does the heavy
          lifting at every step of your freelance journey.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.eyebrow}
className="flex flex-col h-[489px] w-[384px] rounded-3xl border border-slate-200/80 bg-white/60 p-6"
            >
              <p className="mb-4 text-xs font-semibold tracking-wide text-indigo-600">
                <span className="mr-1.5">●</span>
                {step.eyebrow}
              </p>

              {step.visual}

              <h3 className="mt-4 text-lg font-bold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}