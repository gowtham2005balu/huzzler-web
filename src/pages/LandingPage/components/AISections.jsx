import React from "react";
import {
  ArrowRight,
  Bot,
  Brain,
  Code2,
  Zap,
  CheckCircle2,
  Target,
  TrendingUp,
  Users,
  ClipboardCheck,
} from "lucide-react";

const agentSteps = [
  {
    number: "01",
    title: "Understand & Capture",
    description:
      "The AI Agent listens, understands your instructions, and captures all relevant context with smart intent recognition.",
    visual: (
      <div className="flex items-center justify-between gap-2 px-2">
        <div className="space-y-1.5">
          <div className="h-1.5 w-12 rounded-full bg-blue-200" />
          <div className="h-1.5 w-9 rounded-full bg-blue-200" />
          <div className="h-1.5 w-10 rounded-full bg-blue-200" />
        </div>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
          <Bot className="h-4 w-4 text-blue-400" />
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3 w-3 text-blue-300" />
            <div className="h-1.5 w-10 rounded-full bg-blue-200" />
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3 w-3 text-blue-300" />
            <div className="h-1.5 w-8 rounded-full bg-blue-200" />
          </div>
          <div className="h-1.5 w-12 rounded-full bg-blue-200" />
        </div>
      </div>
    ),
  },
  {
    number: "02",
    title: "Think & Plan",
    description:
      "It analyzes the information, breaks it down, and creates an action plan to achieve the best results.",
    visual: (
      <div className="flex items-center justify-between gap-2 px-2">
        <div className="flex h-16 w-16 shrink-0 flex-col gap-1 rounded-xl bg-white p-2.5 shadow-sm">
          <div className="h-1.5 w-3/4 rounded-full bg-blue-300" />
          <div className="flex items-center gap-1">
            <CheckCircle2 className="h-2.5 w-2.5 text-blue-300" />
            <div className="h-1.5 w-2/3 rounded-full bg-blue-100" />
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="h-2.5 w-2.5 text-blue-300" />
            <div className="h-1.5 w-3/4 rounded-full bg-blue-100" />
          </div>
          <div className="h-1.5 w-1/2 rounded-full bg-blue-100" />
        </div>
        <div className="h-px flex-1 border-t border-dashed border-blue-200" />
        <Brain className="h-7 w-7 shrink-0 text-blue-300" />
        <div className="h-px flex-1 border-t border-dashed border-blue-200" />
        <div className="flex h-14 w-14 shrink-0 items-end gap-1 rounded-xl bg-white p-2.5 shadow-sm">
          <div className="h-2.5 w-1.5 rounded-sm bg-blue-200" />
          <div className="h-4 w-1.5 rounded-sm bg-blue-300" />
          <div className="h-6 w-1.5 rounded-sm bg-blue-500" />
        </div>
      </div>
    ),
  },
  {
    number: "03",
    title: "Act & Execute",
    description:
      "The AI Agent takes action, performs tasks, integrates tools, and works seamlessly on your behalf.",
    visual: (
      <div className="flex items-center justify-between gap-2 px-2">
        <div className="flex h-12 w-14 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
          <Code2 className="h-4 w-4 text-blue-400" />
        </div>
        <div className="h-px flex-1 border-t border-dashed border-blue-200" />
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-400 shadow-sm">
          <Zap className="h-5 w-5 text-white" />
        </div>
        <div className="h-px flex-1 border-t border-dashed border-blue-200" />
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
          </div>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
          </div>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-200">
            <Target className="h-3.5 w-3.5 text-blue-500" />
          </div>
        </div>
      </div>
    ),
  },
  {
    number: "04",
    title: "Learn & Improve",
    description:
      "It learns from outcomes and feedback to continuously improve and deliver smarter results over time.",
    visual: (
      <div className="flex items-center justify-between gap-2 px-2">
        <div className="flex h-16 flex-1 flex-col gap-1.5 rounded-xl bg-white p-2.5 shadow-sm">
          <div className="h-1.5 w-1/2 rounded-full bg-blue-200" />
          <div className="relative mt-auto flex items-end gap-1">
            <div className="h-3 w-1.5 rounded-sm bg-blue-100" />
            <div className="h-4 w-1.5 rounded-sm bg-blue-200" />
            <div className="h-6 w-1.5 rounded-sm bg-blue-300" />
            <div className="h-8 w-1.5 rounded-sm bg-blue-500" />
            <TrendingUp className="absolute -top-2 right-0 h-5 w-5 text-blue-400" />
          </div>
        </div>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 ring-4 ring-blue-50">
          <CheckCircle2 className="h-5 w-5 text-blue-500" />
        </div>
      </div>
    ),
  },
];

const plannerSteps = [
  {
    number: "01",
    title: "CREATE YOUR PLAN",
    description:
      "Define project goals, timelines, priorities, and deliverables. Build a clear roadmap before execution begins.",
    icon: Target,
    accent: {
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600",
      underline: "bg-violet-500",
      number: "text-violet-500",
      arrowBg: "bg-violet-500",
      corner: "bg-violet-100",
    },
  },
  {
    number: "02",
    title: "ASSIGN TASKS & RESOURCES",
    description:
      "Allocate responsibilities, assign team members, and organize resources for efficient project execution.",
    icon: Users,
    accent: {
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      underline: "bg-emerald-500",
      number: "text-emerald-500",
      arrowBg: "bg-emerald-500",
      corner: "bg-emerald-100",
    },
  },
  {
    number: "03",
    title: "TRACK PROGRESS",
    description:
      "Monitor milestones, deadlines, and task completion through real-time updates and activity tracking.",
    icon: TrendingUp,
    accent: {
      iconBg: "bg-cyan-100",
      iconColor: "text-cyan-600",
      underline: "bg-cyan-500",
      number: "text-cyan-500",
      arrowBg: "bg-cyan-500",
      corner: "bg-cyan-100",
    },
  },
  {
    number: "04",
    title: "REVIEW & COMPLETE",
    description:
      "Evaluate outcomes, approve completed tasks, generate reports, and close projects successfully.",
    icon: ClipboardCheck,
    accent: {
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      underline: "bg-amber-500",
      number: "text-amber-500",
      arrowBg: "bg-amber-500",
      corner: "bg-amber-100",
    },
  },
];

function DotGrid() {
  return (
    <div className="grid grid-cols-5 gap-1">
      {Array.from({ length: 15 }).map((_, i) => (
        <span key={i} className="h-1 w-1 rounded-full bg-slate-200" />
      ))}
    </div>
  );
}

export function AIAgentWorks() {
  return (
    <section className="bg-slate-50 px-6 py-14 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[300px_1fr] lg:gap-10">
          {/* Left column */}
          <div>
            <p className="text-xs font-bold tracking-wide text-blue-500">
              OUR PROCESS
            </p>

            <h2 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              How AI Agent
              <br />
              Works
            </h2>

            <div className="mt-4 h-0.5 w-12 rounded-full bg-blue-500" />

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              Huzzler AI Agent understands, acts, and delivers — so you can
              focus on what truly matters.
            </p>

            {/* Robot illustration */}
            <div className="relative mt-10 flex h-52 items-center justify-center">
              <div className="absolute h-44 w-44 rounded-full bg-blue-100" />

              <span className="absolute left-0 top-2 flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 shadow-sm">
                <Target className="h-3 w-3 text-amber-400" />
                Smart Intent
              </span>

              <span className="absolute bottom-6 right-0 flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 shadow-sm">
                <Zap className="h-3 w-3 text-blue-400" />
                Auto Execute
              </span>

              <div className="relative z-10 flex h-32 w-28 flex-col items-center">
                <div className="h-4 w-1 rounded-full bg-blue-300" />
                <div className="mt-1 flex h-14 w-24 items-center justify-around rounded-2xl bg-blue-300 px-3">
                  <div className="h-5 w-5 rounded-full bg-blue-700" />
                  <div className="flex flex-col items-center gap-1">
                    <div className="h-2 w-7 rounded-full bg-blue-200" />
                  </div>
                  <div className="h-5 w-5 rounded-full bg-blue-700" />
                </div>
                <div className="-mt-1 h-9 w-9 rounded-xl bg-blue-200" />
                <div className="-mt-1.5 flex h-6 w-20 items-center justify-center gap-1.5 rounded-xl bg-blue-300">
                  <div className="h-2 w-2 rounded-full bg-blue-700" />
                  <div className="h-2 w-2 rounded-full bg-blue-700" />
                </div>
              </div>
            </div>
          </div>

          {/* Right grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {agentSteps.map((step) => (
             <div
  key={step.number}
  className="flex h-[330px] w-[300px] flex-col rounded-2xl bg-white p-5 shadow-sm"
>
                <p className="text-xs font-bold text-blue-500">
                  {step.number}
                </p>

                <div className="mt-3 h-[180px] w-[255px] rounded-xl bg-gradient-to-b from-[#EBF0FF] to-[#D6E1FF] flex items-center justify-center">
  {step.visual}
</div>
                 

                <h3 className="mt-4 text-base font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                  {step.description}
                </p>

                <div className="mt-4 flex justify-end">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                    <ArrowRight className="h-3.5 w-3.5 text-blue-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function PlannerWorks() {
  return (
    <section className="bg-white px-6 py-14 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[320px_1fr] lg:gap-10">
          {/* Left column */}
          <div>
            <p className="text-xs font-bold tracking-wide text-emerald-500">
              OUR PROCESS
            </p>

            <h2 className="mt-2 text-5xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              How Planner
              <br />
              Works
            </h2>

            <div className="mt-4 h-0.5 w-12 rounded-full bg-emerald-500" />

            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-slate-500">
              From planning and resource allocation to execution and
              reporting, every step is designed to help teams stay
              productive, organized, and aligned with project goals.
            </p>
          </div>

          {/* Right grid */}
          <div className="grid grid-cols-1 sm:grid-cols-[355px_355px] gap-x-2 gap-y-4">
            {plannerSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="relative flex h-[225px] w-[280px] flex-col overflow-hidden rounded-2xl bg-slate-50 p-5"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-xl ${step.accent.iconBg}`}
                    >
                      <Icon className={`h-4 w-4 ${step.accent.iconColor}`} />
                    </div>
                    <DotGrid />
                    <span
                      className={`text-2xl font-extrabold ${step.accent.number}`}
                    >
                      {step.number}
                    </span>
                  </div>

                  <div className={`mt-3 h-0.5 w-6 ${step.accent.underline}`} />

                  <h3 className="mt-2.5 text-sm font-extrabold tracking-wide text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                    {step.description}
                  </p>

                  <div className="mt-4 flex justify-end">
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full ${step.accent.arrowBg}`}
                    >
                      <ArrowRight className="h-3.5 w-3.5 text-white" />
                    </div>
                  </div>

                  {/* corner accent */}
                  <div
                    className={`absolute -bottom-2 -right-2 h-9 w-9 rounded-tl-xl ${step.accent.corner}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}