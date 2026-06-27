import React from "react";
import { ArrowUpRight, ArrowDown, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="bg-white px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl ml-32">
        {/* Header */}
        <p className="text-xs font-bold tracking-wide text-emerald-500">
          OUR PROCESS
        </p>

       <div className="mt-3 flex items-start justify-between">
  <h2 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl">
    How it
    <br />
    works
  </h2>

  <p className="max-w-xs text-sm leading-relaxed text-slate-500 mt-2 mr-60">
    From sharing your requirement to approving delivery, every step
    is designed to make freelance hiring simpler, faster, and more
    reliable.
  </p>
</div>



        {/* Grid */}
        <div className="mt-8 grid gap-5 lg:grid-cols-[420px_260px_260px]">
          {/* Left big card */}
          <div className="relative col-span-1 row-span-2 min-h-[420px] overflow-hidden rounded-2xl bg-sky-100 p-6 sm:min-h-[480px] sm:p-8">
            {/* decorative circles */}
            <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-sky-200/70" />
            <div className="pointer-events-none absolute -bottom-16 -right-8 h-48 w-48 rounded-full bg-sky-200/70" />

            <div className="relative z-10">
              <p className="text-[10px] font-semibold tracking-widest text-slate-400">
                HOW IT WORKS — A CLEAR &amp; RELIABLE FLOW
              </p>

              <h3 className="mt-4 text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-slate-900 sm:text-4xl">
                How it
                <br />
                works,
                <br />
                a clear
                <br />
                and
                <br />
                reliable
                <br />
                flow.
              </h3>

              <p className="mt-6 max-w-xs text-sm leading-relaxed text-slate-500">
                We've optimized the process so you can focus on outcomes,
                not operations — even taking care of the most complex
                coordination challenges.
              </p>
            </div>
          </div>

          {/* Step 1 */}
          <div className="relative flex min-h-[170px] flex-col justify-between overflow-hidden rounded-2xl bg-violet-200 p-5">
            <div>
              <h3 className="text-xl font-extrabold leading-tight text-slate-900">
                Scope your
                <br />
                project
              </h3>
              <p className="mt-2 max-w-[200px] text-xs leading-relaxed text-slate-600">
                Define strict criteria, set your timeline, and launch your
                requirement to our elite network.
              </p>
            </div>

            <span className="pointer-events-none absolute right-4 top-2 text-5xl font-extrabold text-slate-900/15 sm:text-6xl">
              1
            </span>

            <div className="mt-4 flex justify-end">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/10">
                <ArrowUpRight className="h-4 w-4 text-slate-700" />
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative flex min-h-[170px] flex-col justify-between overflow-hidden rounded-2xl bg-lime-300 p-5">
            <div>
              <h3 className="text-xl font-extrabold leading-tight text-slate-900">
                Select
                <br />
                your
                <br />
                expert
              </h3>
            </div>

            <span className="pointer-events-none absolute right-4 top-2 text-5xl font-extrabold text-slate-900/15 sm:text-6xl">
              2
            </span>

            <div className="mt-4 flex justify-end">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/10">
                <ArrowDown className="h-4 w-4 text-slate-700" />
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative flex min-h-[170px] flex-col justify-between overflow-hidden rounded-2xl bg-emerald-400 p-5">
            <div>
              <h3 className="text-xl font-extrabold leading-tight text-slate-900">
                Collaborate
                <br />
                &amp; Track
              </h3>
              <p className="mt-2 max-w-[200px] text-xs leading-relaxed text-slate-700">
                Work with your expert through our managed workspace with
                milestone tracking.
              </p>
            </div>

            <span className="pointer-events-none absolute right-4 top-2 text-5xl font-extrabold text-slate-900/15 sm:text-6xl">
              3
            </span>

            <div className="mt-4 flex justify-end">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/10">
                <ArrowRight className="h-4 w-4 text-slate-700" />
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="relative flex min-h-[170px] flex-col justify-between overflow-hidden rounded-2xl bg-yellow-300 p-5">
            <div>
              <h3 className="text-xl font-extrabold leading-tight text-slate-900">
                Approve &amp;
                <br />
                Release
              </h3>
              <p className="mt-2 max-w-[200px] text-xs leading-relaxed text-slate-700">
                Review deliverables and release escrow payment only when
                100% satisfied.
              </p>
            </div>

            <span className="pointer-events-none absolute right-4 top-2 text-5xl font-extrabold text-slate-900/15 sm:text-6xl">
              4
            </span>

            <div className="mt-4 flex justify-end">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/10">
                <ArrowRight className="h-4 w-4 text-slate-700" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}