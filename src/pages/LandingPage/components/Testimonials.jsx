import React from "react";
import { ArrowRight } from "lucide-react";

const reviews = [
  {
    stars: 5,
    text: "Within minutes the friendly sales assistant had secured me a spectacular result. Right next to my expectations, literally a second walk!",
    name: "Stephen A.",
    badge: "Delivered in 18h",
    bg: "bg-blue-400",
    textColor: "text-white",
    nameColor: "text-white",
    badgeBg: "transparent",
    badgeColor: "text-white",
  },
  {
    stars: 5,
    text: "Super professional, organised and great to work with. These guys were invaluable on our last major project. Can't recommend enough.",
    name: "Marcus L.",
    badge: "Hired in 10 mins",
    bg: "bg-violet-400",
    textColor: "text-white",
    nameColor: "text-white",
    badgeBg: "transparent",
    badgeColor: "text-white",
  },
  {
    stars: 1,
    text: "Really useful system. We got an amazing service for our company and events going forward. Highly recommended to all.",
    name: "Barry W.",
    badge: "4.9 rating",
    bg: "bg-white border border-slate-100",
    textColor: "text-slate-600",
    nameColor: "text-slate-900",
    badgeBg: "bg-violet-50",
    badgeColor: "text-violet-600",
  },
  {
    stars: 1,
    text: "Sorted out our frontend bugs in very timely manner. Excellent rates and highly recommended. Will definitely come back!",
    name: "Simon F.",
    badge: "Delivered in 24h",
    bg: "bg-lime-300",
    textColor: "text-slate-800",
    nameColor: "text-slate-900",
    badgeBg: "bg-white/40",
    badgeColor: "text-slate-800",
  },
];

export default function TrustedByPeople() {
  return (
    <section className="bg-white py-20 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-bold tracking-widest text-[#4F46FF] uppercase mb-3">
              Rating &amp; Reviews
            </p>
            <h2 className="text-5xl sm:text-6xl font-extrabold text-slate-900 leading-tight">
              Trusted by people
            </h2>
          </div>

          <a
            href="#"
            className="inline-flex items-center gap-2 self-start sm:self-auto bg-white rounded-full px-6 py-3 text-sm font-semibold text-[#4F46FF] shadow-sm border border-[#D7D2FF] hover:shadow-md transition-shadow"
          >
            Read all reviews
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map(
            ({ stars, text, name, badge, bg, textColor, nameColor, badgeBg, badgeColor }) => (
              <div
                key={name}
                className={`${bg} rounded-2xl p-6 flex flex-col justify-between min-h-[200px]`}
              >
                <div>
                  <div className="mb-5 text-lg">
  ⭐⭐⭐⭐⭐
</div>
                  <p className={`text-sm leading-relaxed ${textColor}`}>{text}</p>
                </div>

                <div className="mt-6">
                  <div
                    className={`border-t mb-3 ${
                      textColor === "text-white" ? "border-white/20" : "border-slate-100"
                    }`}
                  />
                  <p className={`font-bold mb-3 ${nameColor}`}>{name}</p>
                 <span
  className={`inline-flex items-center gap-1 ${badgeBg} ${badgeColor} text-[11px] font-semibold uppercase tracking-wide rounded-full px-3 py-1 border ${
    textColor === "text-white"
      ? "border-white/40"
      : "border-black/20"
  }`}
>
  {badge}
</span>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}