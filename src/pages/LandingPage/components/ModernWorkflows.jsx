import React from "react";

export default function WorkflowsSection() {
  return (
    <section className="w-full bg-white py-20 px-6 font-[Plus_Jakarta_Sans,sans-serif]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-widest text-indigo-500 mb-3">
            WHY HUZZLER?
          </p>
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Built for modern
            <br />
            workflows
          </h2>
        </div>

       

        {/* Divider */}
        <div className="border-t border-gray-200 mb-10" />

        {/* Row 1: 4 cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {/* Card 1: Image - Verified Professionals */}
          <div className="relative rounded-3xl overflow-hidden aspect-[3/4] bg-purple-200">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
              alt="Verified professional"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <p className="font-bold text-sm">Huzzler</p>
              <p className="text-xs opacity-80">Verified Professionals</p>
            </div>
          </div>

          {/* Card 2: Yellow - Escrow Protected */}
          <div className="rounded-3xl bg-[#FFFF7B] p-5 flex flex-col justify-between aspect-[3/4]">
            <div>
              <span className="inline-block bg-[#0000001F] text-[10px] font-bold tracking-wide px-3 py-1 rounded-full mb-4">
                Escrow Protected
              </span>
              <p className="text-[10px] text-gray-800 leading-relaxed mb-4">
                Your capital is protected. Funds are locked securely upfront
                and never released until you are 100% satisfied with the
                final deliverable.
              </p>
              <div className="flex -space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
                  className="w-7 h-7 rounded-full border-2 border-yellow-300 object-cover"
                  alt="avatar"
                />
                <img
                  src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80"
                  className="w-7 h-7 rounded-full border-2 border-yellow-300 object-cover"
                  alt="avatar"
                />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-gray-900 leading-tight">
                Ironclad
                <br />
                Escrow
                <br />
                Protection
              </h3>
              <p className="text-[10px] text-gray-600 mt-3 tracking-wide">
                HUZZLER.COM &middot; FASTER, SIMPLER
              </p>
            </div>
          </div>

          {/* Card 3: Image - Elite Global Talent */}
          <div className="relative rounded-3xl overflow-hidden aspect-[3/4] bg-blue-200">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80"
              alt="Elite global talent"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <p className="font-bold text-sm">Huzzler</p>
              <p className="text-xs opacity-80">Elite Global Talent</p>
            </div>
          </div>

          {/* Card 4: Green - Proven Track Record */}
          <div className="rounded-3xl bg-[#6EF0A2] p-5 flex flex-col justify-between aspect-[3/4]">
            <div>
              <span className="inline-block bg-[#FFFFFF40] text-[10px] font-bold tracking-wide px-3 py-1 rounded-full mb-4">
                Backed by Results
              </span>
              <p className="text-sm text-gray-800 leading-relaxed">
                Backed by a history of successful enterprise deployments, our
                ecosystem is strictly built to consistently deliver
                high-stakes outcomes.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-gray-900 leading-tight">
                Proven
                <br />
                Track
                <br />
                Record
              </h3>
              <p className="text-[10px] text-gray-600 mt-3 tracking-wide">
                HUZZLER.COM &middot; FASTER, SIMPLER
              </p>
            </div>
          </div>
        </div>

        {/* Row 2: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Card 5: Blue - Work with verified professionals */}
          <div className="relative rounded-3xl bg-[#80C9FF] p-6 flex flex-col justify-between min-h-[220px] overflow-hidden">
            <div>
              <span className="inline-flex items-center gap-1 bg-[#FFFFFF14] text-white text-[10px] font-bold tracking-wide px-3 py-1 rounded-full mb-4">
                #HUZZLER &middot; SECURE
              </span>
              <h3 className="text-xl font-extrabold text-white leading-snug mb-3">
                Work with verified
                <br />
                professionals only
              </h3>
              <p className="text-xs text-sky-100 leading-relaxed max-w-[85%]">
                Every freelancer is ID-verified, skill-tested, and
                reference-checked before listing on our platform.
              </p>
            </div>
            <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-sky-600/60" />
          </div>

          {/* Card 6: White - Every freelancer screened */}
          <div className="rounded-3xl bg-white border border-gray-100 shadow-sm p-6 flex flex-col justify-between min-h-[220px]">
            <h3 className="text-xl font-extrabold text-gray-900 leading-snug mb-4">
              Every <br></br>freelancer is<br></br> screened<br></br> for<br></br> quality
            </h3>
            <ul className="space-y-2">
              {[
                "Portfolio Review",
                "Skill Validation Tests",
                "Reference Checks",
                "ID Verification",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-xs text-gray-700">
                  <span className="flex items-center justify-center w-4 h-4 rounded-full bg-green-500 text-white text-[10px]">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-[10px] text-[#BBBBBB] mt-4">
  QUALITY · ©2026
</p>
          </div>

          {/* Card 7: Purple - Secure payments */}
          <div className="rounded-3xl bg-[#7C3AED80] p-6 flex flex-col justify-between min-h-[220px]">
            <div>
              <span className="inline-block bg-[#FFFFFF26] text-white text-[10px] font-bold tracking-wide px-3 py-1 rounded-full mb-4">
                #ESCROW
              </span>
              <h3 className="text-xl font-extrabold text-white leading-snug mb-3">
                Secure <br></br>payments.
                <br />
                Always<br></br> protected.
              </h3>
              <p className="text-xs text-purple-100 leading-relaxed">
                Funds are locked securely upfront and never released until
                you're 100% satisfied with the final deliverable.
              </p>
            </div>
           
            
          </div>
        </div>

        {/* Row 3: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 8: Yellow - No more risk */}
          <div className="rounded-2xl bg-[#FFFF7B] p-6 flex flex-col justify-between min-h-[260px]">
            <h3 className="text-2xl font-extrabold text-gray-900 leading-snug">
              No more risk<br></br> of paying for<br></br> incomplete<br></br> work.
            </h3>
            <p className="text-[10px] text-[#00000066] tracking-wide mt-4">
              #HUZZLER &middot; ©2026
            </p>
          </div>

          {/* Card 9: Green - Fast delivery */}
          <div className="rounded-3xl bg-emerald-400 p-6 flex flex-col justify-between min-h-[260px]">
            <div>
              <span className="inline-block bg-[#F5D547] text-gray-800 text-[10px] font-bold tracking-wide px-3 py-1 rounded-full mb-4">
                24H TURNAROUND AVAILABLE
              </span>
              <h3 className="text-2xl font-extrabold text-gray-900 leading-snug mb-4">
                Fast delivery.<br></br> Reliable<br></br> results.
              </h3>
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-[#CCFF00] border-2 border-emerald-400" />
                <div className="w-7 h-7 rounded-full bg-[#6C5CE7] border-2 border-emerald-400" />
              </div>
            </div>
            <p className="text-[10px] text-gray-700 tracking-wide mt-4">
              VELOCITY &middot; 24/7
            </p>
          </div>

          {/* Card 10: Gray - 4.9 stars */}
          <div className="rounded-3xl bg-gray-100 p-6 flex flex-col justify-between min-h-[260px]">
           <div className="mt-4">
  <p className="text-5xl font-extrabold text-gray-900 flex items-center gap-2">
    4.9 <span className="text-purple-500">★</span>
  </p>
  <p className="text-[10px] text-gray-500 tracking-wide mt-2">
    AVERAGE RATING
  </p>
</div>
            <div className="mb-6">
  <p className="text-5xl font-extrabold text-gray-900">10K+</p>
  <p className="text-[10px] text-gray-500 tracking-wide mt-2">
    TASKS COMPLETED
  </p>
</div>
          </div>
        </div>
      </div>
    </section>
  );
}