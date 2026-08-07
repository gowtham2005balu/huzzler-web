import { Route, Switch } from "wouter";
import MainLayout from "@/layouts/MainLayout";

import Home from "@/pages/FAQ"; // FAQ
import DesignJS from "@/pages/DesignJS"; // Browse Talent
import HuzzlerAI from "@/pages/HuzzlerAI"; // About
import Component1 from "@/pages/Component1"; // Landing Page
 // Dashboard
import Features from "@/pages/Features";
import NotFound from "@/pages/NotFound";

export default function AppRoutes() {
  return (
    <Switch>
      {/* Home */}
      <Route
        path="/"
        component={() => (
          <MainLayout>
            <Component1 />
          </MainLayout>
        )}
      />

      {/* Blog */}
      <Route
        path="/blog"
        component={() => (
          <MainLayout>
            <DesignJS />
          </MainLayout>
        )}
      />

      {/* Features */}
      <Route
        path="/features"
        component={() => (
          <MainLayout>
            <Features />
          </MainLayout>
        )}
      />

      {/* About */}
      <Route
        path="/about"
        component={() => (
          <MainLayout>
            <HuzzlerAI />
          </MainLayout>
        )}
      />

      {/* FAQ */}
      <Route
        path="/faq"
        component={() => (
          <MainLayout>
            <Home />
          </MainLayout>
        )}
      />

      {/* Become Freelancer */}
      <Route
        path="/become-freelancer"
        component={() => (
          <MainLayout>
            <Component1 />
          </MainLayout>
        )}
      />
      

      {/* 404 */}
      <Route path="/404" component={NotFound} />

      {/* Fallback */}
      <Route component={NotFound} />
    </Switch>
  );
}