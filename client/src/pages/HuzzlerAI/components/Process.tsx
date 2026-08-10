import { useEffect, useRef, useState } from "react";

const steps = [
  {
    num: "1",
    step: "STEP 01",
    title: "Create a Project",
    desc: "Describe your project needs with our AI-guided brief builder. It asks the right questions to attract the best talent profiles immediately.",
    color: "bg-[#dcd3fb]",
  },
  {
    num: "2",
    step: "STEP 02",
    title: "AI Finds the Right Talent",
    desc: "Our AI recommends freelancers based on your project requirements, skills, and expertise to help you discover suitable matches faster.",
    color: "bg-[#e2f178]",
  },
  {
    num: "3",
    step: "STEP 03",
    title: "Review Applications",
    desc: "Browse applications, compare profiles and portfolios, and choose the freelancer that best fits your project.",
    color: "bg-[#aedcf9]",
  },
  {
    num: "4",
    step: "STEP 04",
    title: "Connect & Collaborate",
    desc: "Start conversations, discuss project details, and collaborate seamlessly through Huzzler's built-in chat.",
    color: "bg-[#fbe199]",
  },
  {
    num: "5",
    step: "STEP 05",
    title: "Discover More Opportunities",
    desc: "Keep exploring projects and connect with new clients or freelancers as your network grows.",
    color: "bg-[#a6ecc9]",
  },
  {
    num: "6",
    step: "STEP 06",
    title: "Complete Successfully",
    desc: "Close out projects, leave reviews, and build lasting relationships with freelancers who truly understand your business.",
    color: "bg-[#fbcdb9]",
  },
];

function StepCard({
  s,
  index,
}: {
  s: (typeof steps)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${index * 60}ms`,
      }}
      className={`${s.color} rounded-2xl p-6 sm:p-7 min-h-[180px] sm:min-h-[195px] h-full relative overflow-hidden flex flex-col items-start text-left transition-all duration-500 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
    >
      <span className="absolute top-3 right-4 sm:right-5 text-[28px] sm:text-[36px] font-medium text-black/10 leading-none select-none">
        {s.num}
      </span>
      <span className="text-[11px] font-semibold text-gray-600/60 tracking-wide relative z-10">
        {s.step}
      </span>
      <h3 className="text-[17px] sm:text-[18px] font-medium text-gray-900 mt-2 mb-2 relative z-10 pr-8">
        {s.title}
      </h3>
      <p className="text-[13px] text-gray-700/70 leading-relaxed relative z-10">
        {s.desc}
      </p>
    </div>
  );
}

export default function Process() {
  return (
    <section className="bg-[#ece7fb] py-16 sm:py-20 lg:py-24 px-5 sm:px-8 md:px-12 lg:px-[100px]">
      <div className="max-w-[1456px] mx-auto sm:px-4 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            {/* <span className="inline-block text-[11px] font-semibold tracking-wide text-violet-600 bg-white rounded-full px-3 py-1.5 mb-4 sm:mb-5">
              THE PROCESS
            </span> */}
            <h2 className="text-[28px] sm:text-[32px] lg:text-[34px] leading-tight font-medium text-gray-900 tracking-tight">
              How Huzzler
              <br />
              Works
            </h2>
            <br />
            <p className="text-gray-600 text-[15px] leading-relaxed max-w-[420px] text-left">
              From idea to delivered project — our streamlined workflow removes
              friction at every step, powered by intelligent AI every step of
              the way.
            </p>
          </div>

        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {steps.map((s, i) => (
            <StepCard key={s.title} s={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}