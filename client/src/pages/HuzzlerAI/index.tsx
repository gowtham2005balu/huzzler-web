import Hero from "./components/Hero";
import Journey from "./components/Journey";
import StandFor from "./components/StandFor";
import Metrics from "./components/Metrics";
import Team from "./components/Team";
import Advantage from "./components/Advantage";
import Process from "./components/Process";
import Impact from "./components/Impact";
import Testimonials from "./components/Testimonials";
import JoinMission from "./components/JoinMission";
import CTA from "./components/CTA";

export default function HuzzlerAI() {
  return (
    <div className="bg-white huzzler-ai-page">
      <Hero />
      <Journey />
      <StandFor />
      <Metrics />
      {/* <Team /> */}
      <Advantage />
      <Process />
      <Impact />
      {/* <Testimonials /> */}
      {/* <JoinMission /> */}
      <CTA />
      <style>{`
        @media (max-width: 900px) {
          .huzzler-ai-page h1, 
          .huzzler-ai-page h2, 
          .huzzler-ai-page h3, 
          .huzzler-ai-page h1.text-\\[44px\\] { 
            font-size: clamp(26px, 5vw, 36px) !important; 
            line-height: 1.25 !important; 
          }
          .huzzler-ai-page p.text-\\[15px\\], 
          .huzzler-ai-page p.text-\\[17px\\] { 
            font-size: 14px !important; 
            line-height: 1.5 !important; 
          }
        }
      `}</style>
    </div>
  );
}
