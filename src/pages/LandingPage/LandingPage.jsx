import React from "react";
import Hero from "./components/Hero";
import MarqueeStrip from "./components/MarqueeStrip";
import Categories from "./components/Categories";
import ModernWorkflows from "./components/ModernWorkflows";
import PerfectService from "./components/PerfectService";
import Testimonials from "./components/Testimonials";
import HuzzlerWay from "./components/HuzzlerWay";
import HuzzlerAdvantage from "./components/HuzzlerAdvantage";
import HowItWorks from "./components/HowItWorks";
import { AIAgentWorks, PlannerWorks } from "./components/AISections";
import { CTASection, Footer } from "./components/CTAAndFooter";

export default function LandingPage() {
  return (
    <div className="font-sans antialiased">
      <Hero />
      <MarqueeStrip />
      <Categories />
      <ModernWorkflows />
      <PerfectService />
      <Testimonials />
      <HuzzlerWay />
      <HuzzlerAdvantage />
      <HowItWorks />
      <MarqueeStrip />
      <AIAgentWorks />
      <PlannerWorks />
      <CTASection />
      <Footer />
    </div>
  );
}
