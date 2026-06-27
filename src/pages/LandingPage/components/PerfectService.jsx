import React from "react";
import {
  Grid2x2,
  Code2,
  Megaphone,
  User,
  PenLine,
  BarChart3,
  Video,
  Cpu,
  Camera,
  Globe,
  ArrowRight,
} from "lucide-react";

const services = [
  { name: "UI/UX Design", icon: Grid2x2, bg: "bg-rose-100", fg: "text-rose-500" },
  { name: "Development", icon: Code2, bg: "bg-orange-100", fg: "text-orange-500" },
  { name: "Marketing", icon: Megaphone, bg: "bg-violet-100", fg: "text-violet-500" },
  { name: "Consulting", icon: User, bg: "bg-blue-100", fg: "text-blue-500" },
  { name: "Copywriting", icon: PenLine, bg: "bg-emerald-100", fg: "text-emerald-500" },
  { name: "SEO & Growth", icon: BarChart3, bg: "bg-teal-100", fg: "text-teal-500" },
  { name: "Video Editing", icon: Video, bg: "bg-amber-100", fg: "text-amber-500" },
  { name: "AI Services", icon: Cpu, bg: "bg-fuchsia-100", fg: "text-fuchsia-500" },
  { name: "Photography", icon: Camera, bg: "bg-sky-100", fg: "text-sky-500" },
  { name: "Translation", icon: Globe, bg: "bg-orange-100", fg: "text-orange-600" },
];

export default function PopularServices() {
  return (
    <section className="bg-white py-20 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
  <p className="text-[10px] font-bold tracking-widest text-[#4F46FF] uppercase mb-3">
    Popular Services
  </p>

  <h2 className="text-5xl sm:text-6xl font-extrabold text-slate-900 leading-tight">
    Find the <span className="text-[#4F46FF]">Perfect</span>
    <br />
    Service
  </h2>

  <p className="text-slate-500 mt-3 max-w-md">
    Explore top-rated services across various categories.
    <br />
    Discover the right expertise to bring your ideas to life.
  </p>
</div>
          
            
          <div className="flex flex-col gap-3 lg:items-end lg:text-right max-w-sm">
           
            <a
              href="#"
              className="inline-flex items-center gap-2 text-[#4F46FF]  text-sm font-semibold hover:underline"
            >
              Browse all services
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Service pills grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {services.map(({ name, icon: Icon, bg, fg }) => (
            <div
              key={name}
              className={`${bg} rounded-full pl-2 pr-5 py-2 flex items-center justify-between gap-3 hover:shadow-md transition-shadow cursor-pointer`}
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-white flex items-center justify-center shrink-0">
                  <Icon className={`h-5 w-5 ${fg}`} />
                </div>
                <span className="font-semibold text-slate-900 text-sm whitespace-nowrap">
                  {name}
                </span>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-700 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
