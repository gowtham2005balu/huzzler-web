import React from "react";

const articles = [
  {
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=500&q=80",
    tag: "Apr 12, 2026",
    title: "Revolutionizing Team Collaboration: The Huzzler Way",
    desc: "Discover how distributed teams are leveraging Huzzler's tools to streamline workflows and boost productivity.",
  },
  {
    img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=500&q=80",
    tag: "Mar 28, 2026",
    title: "Unleashing Creativity: How Our Talent Inspires Innovation",
    desc: "See how brands are partnering with creative freelancers to push the boundaries of design and storytelling.",
  },
  {
    img: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=500&q=80",
    tag: "Feb 15, 2026",
    title: "Efficiency Redefined: The Power of Smart Project Matching",
    desc: "Learn how Huzzler's AI dramatically reduces hiring time while improving the quality of project matches.",
  },
];

export default function HuzzlerAdvantage() {
  return (
    <section className="bg-gradient-to-b from-white via-white to-sky-200 py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <span className="text-violet-500 text-xs font-semibold uppercase tracking-wide flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 bg-[#6C4CF5] rounded-full inline-block" />
              Insights &amp; Stories
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Discover the Huzzler advantage
            </h2>
          </div>
          <a href="#" className="text-sm font-medium text-violet-500 hover:underline">
            Read all stories →
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((a, i) => (
            <div
  key={i}
  className="flex flex-col gap-4 bg-white rounded-3xl border border-slate-100 p-5"
>
              <div className="rounded-2xl overflow-hidden h-48">
                <img src={a.img} alt={a.title} className="w-full h-full object-cover" />
              </div>
              <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">
                {a.tag}
              </span>
              <h3 className="font-bold text-gray-900 text-sm leading-snug">{a.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
