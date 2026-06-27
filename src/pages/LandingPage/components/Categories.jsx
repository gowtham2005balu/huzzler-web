import React from "react";
import {
  Smile,
  Code2,
  TrendingUp,
  Clapperboard,
  PenLine,
  Bot,
  Music2,
  BarChart3,
  Briefcase,
  Camera,
  Sprout,
  Wallet,
  ArrowRight,
  ShieldCheck,
  Star,
  HelpCircle,
} from "lucide-react";

const categories = [
  {
    name: "Graphics & Design",
    count: "12,400 services",
    icon: Smile,
    bg: "bg-violet-100",
    fg: "text-violet-600",
  },
  {
    name: "Programming & Tech",
    count: "8,200 services",
    icon: Code2,
    bg: "bg-sky-100",
    fg: "text-sky-600",
  },
  {
    name: "Digital Marketing",
    count: "6,800 services",
    icon: TrendingUp,
    bg: "bg-amber-100",
    fg: "text-amber-600",
  },
  {
    name: "Video & Animation",
    count: "4,100 services",
    icon: Clapperboard,
    bg: "bg-pink-100",
    fg: "text-pink-600",
  },
  {
    name: "Writing & Translation",
    count: "5,600 services",
    icon: PenLine,
    bg: "bg-emerald-100",
    fg: "text-emerald-600",
  },
  {
    name: "AI Services",
    count: "3,200 services",
    icon: Bot,
    bg: "bg-indigo-100",
    fg: "text-indigo-600",
  },
  {
    name: "Music & Audio",
    count: "2,900 services",
    icon: Music2,
    bg: "bg-teal-100",
    fg: "text-teal-600",
  },
  {
    name: "Data & Analytics",
    count: "1,800 services",
    icon: BarChart3,
    bg: "bg-rose-100",
    fg: "text-rose-600",
  },
  {
    name: "Business",
    count: "2,400 services",
    icon: Briefcase,
    bg: "bg-blue-100",
    fg: "text-blue-600",
  },
  {
    name: "Photography",
    count: "1,600 services",
    icon: Camera,
    bg: "bg-purple-100",
    fg: "text-purple-600",
  },
  {
    name: "Personal Growth",
    count: "980 services",
    icon: Sprout,
    bg: "bg-green-100",
    fg: "text-green-600",
  },
  {
    name: "Finance",
    count: "1,200 services",
    icon: Wallet,
    bg: "bg-orange-100",
    fg: "text-orange-600",
  },
];

const features = [
  {
    title: "Trusted Professionals",
    desc: "Verified experts you can rely on.",
    icon: ShieldCheck,
  },
  {
    title: "Quality Services",
    desc: "Top-rated services, guaranteed.",
    icon: Star,
  },
  {
    title: "24/7 Support",
    desc: "We're here to help anytime.",
    icon: HelpCircle,
  },
];

export default function ExploreCategories() {
  return (
    <section className="bg-gradient-to-br from-rose-50 via-white to-indigo-50 py-20 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-2 w-2 rounded-full bg-violet-600" />
              <span className="text-[10px] font-bold tracking-widest text-violet-600 uppercase">
                Browse Services
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
              Explore <span className="text-violet-600">Categories</span>
            </h2>
            <p className="mt-4 text-slate-500 text-lg max-w-md">
              Discover thousands of services across 12+ categories.
              <br />
              Find the perfect service for your needs.
            </p>
          </div>

          <a
            href="#"
            className="inline-flex items-center gap-2 self-start sm:self-auto bg-white rounded-full px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:shadow-md transition-shadow"
          >
            All Categories
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-12">
          {categories.map(({ name, count, icon: Icon, bg, fg }) => (
            <div
              key={name}
              className="bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all p-4 flex flex-col items-center text-center"
            >
              <div className={`h-14 w-14 rounded-full ${bg} flex items-center justify-center mb-4`}>
                <Icon className={`h-6 w-6 ${fg}`} />
              </div>
              <h3 className="font-bold text-slate-900 text-xs">{name}</h3>
              <p className="text-xs text-slate-400 mt-1 mb-4">{count}</p>
              <button
                aria-label={`Browse ${name}`}
                className="h-9 w-9 rounded-full border border-slate-200 flex items-center justify-center text-violet-600 hover:bg-violet-50 transition-colors"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Feature strip */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {features.map(({ title, desc, icon: Icon }, i) => (
            <div
              key={title}
              className={`flex items-start gap-4 flex-1 ${i > 0 ? "pt-6 sm:pt-0 sm:pl-8" : ""}`}
            >
              <div className="h-11 w-11 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
                <Icon className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{title}</h4>
                <p className="text-sm text-slate-400 mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}