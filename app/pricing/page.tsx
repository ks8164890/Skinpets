"use client";

import { Nav } from "../components/nav";
import { PageTransition } from "../components/page-transition";
import { MotionCard } from "../components/motion-card";
import { MotionButton } from "../components/motion-button";

export default function PricingPage() {
  return (
    <>
      <Nav />
      <PageTransition>
        <main className="max-w-3xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-2">Simple Pricing</h1>
            <p className="text-muted-foreground">
              Start free, upgrade when you need more.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <MotionCard delay={0.1}>
              <div className="text-sm font-medium text-muted-foreground mb-1">
                Free
              </div>
              <div className="text-3xl font-bold mb-4">
                $0<span className="text-base font-normal text-muted-foreground">/mo</span>
              </div>
              <ul className="space-y-3 text-sm mb-8">
                {[
                  "1 scan per week",
                  "Skin analysis with AI",
                  "Dog diet calculator",
                  "Shareable result cards",
                  "Scan history (local)",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <MotionButton variant="outline" className="w-full">
                Current Plan
              </MotionButton>
            </MotionCard>

            <MotionCard delay={0.2} className="ring-2 ring-primary relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                Most Popular
              </div>
              <div className="text-sm font-medium text-muted-foreground mb-1">
                Pro
              </div>
              <div className="text-3xl font-bold mb-4">
                $4<span className="text-base font-normal text-muted-foreground">/mo</span>
              </div>
              <ul className="space-y-3 text-sm mb-8">
                {[
                  "Unlimited scans",
                  "Detailed PDF reports",
                  "Progress tracking over time",
                  "Priority AI analysis",
                  "Cloud sync across devices",
                  "Early access to new features",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <MotionButton className="w-full">
                Upgrade to Pro
              </MotionButton>
            </MotionCard>
          </div>
        </main>
      </PageTransition>
    </>
  );
}
