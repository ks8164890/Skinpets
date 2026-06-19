"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Nav } from "../components/nav";
import { PageTransition } from "../components/page-transition";
import { MotionCard } from "../components/motion-card";
import { MotionButton } from "../components/motion-button";

const GUMROAD_URL = "https://skinpet.gumroad.com/l/pro";

export default function PricingPage() {
  const [isPro, setIsPro] = useState(false);
  const [showActivate, setShowActivate] = useState(false);
  const activateTimerRef = { current: null as ReturnType<typeof setTimeout> | null };

  useEffect(() => {
    setIsPro(localStorage.getItem("skinpet_pro") === "true");
    return () => {
      if (activateTimerRef.current) clearTimeout(activateTimerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleUpgrade() {
    window.open(GUMROAD_URL + "?wanted=true", "_blank");
    activateTimerRef.current = setTimeout(() => setShowActivate(true), 2000);
  }

  function handleActivate() {
    localStorage.setItem("skinpet_pro", "true");
    setIsPro(true);
    setShowActivate(false);
  }

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

          <AnimatePresence>
            {isPro && (
              <motion.div
                initial={{ opacity: 0, y: -12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.97 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="mb-8 p-4 rounded-[12px] bg-primary/10 border border-primary/20 text-center"
              >
                <span className="text-lg mr-2">🎉</span>
                <span className="font-semibold text-primary">Pro activated!</span>
                <span className="text-sm text-muted-foreground ml-2">
                  Enjoy unlimited scans and all premium features.
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid sm:grid-cols-2 gap-6">
            <MotionCard delay={0.1}>
              <div className="text-sm font-medium text-muted-foreground mb-1">Free</div>
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
              <MotionButton variant="outline" className="w-full" disabled={!isPro}>
                {isPro ? "Previous Plan" : "Current Plan"}
              </MotionButton>
            </MotionCard>

            <MotionCard delay={0.2} className="ring-2 ring-primary relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                Most Popular
              </div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Pro</div>
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

              {isPro ? (
                <MotionButton className="w-full" disabled>
                  ✓ Pro Active
                </MotionButton>
              ) : (
                <div className="space-y-3">
                  <MotionButton className="w-full" onClick={handleUpgrade}>
                    Upgrade to Pro
                  </MotionButton>
                  <AnimatePresence>
                    {showActivate && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                      >
                        <MotionButton
                          variant="outline"
                          className="w-full text-sm"
                          onClick={handleActivate}
                        >
                          I've completed purchase — Activate Pro
                        </MotionButton>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </MotionCard>
          </div>
        </main>
      </PageTransition>
    </>
  );
}
