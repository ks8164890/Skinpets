"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { MotionButton } from "./components/motion-button";
import { MotionCard } from "./components/motion-card";
import { Nav } from "./components/nav";
import { PageTransition } from "./components/page-transition";

export default function LandingPage() {
  return (
    <>
      <Nav />
      <PageTransition>
        <main className="flex-1">
          <section className="max-w-4xl mx-auto px-4 pt-16 pb-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-light text-primary text-sm font-medium rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-primary" />
                AI-Powered Wellness Scanner
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
                Your skin and your pet,
                <br />
                <span className="text-primary">analyzed in seconds</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
                Upload a photo for an instant AI skin analysis, or enter your
                dog&apos;s details for a personalized diet and health plan. Free
                to start.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/scan/skin">
                <MotionButton size="lg" className="w-full sm:w-auto">
                  <SkinIcon className="mr-2" />
                  Scan Your Skin
                </MotionButton>
              </Link>
              <Link href="/scan/dog">
                <MotionButton size="lg" variant="outline" className="w-full sm:w-auto">
                  <DogIcon className="mr-2" />
                  Scan Your Dog
                </MotionButton>
              </Link>
            </motion.div>
          </section>

          <section className="max-w-4xl mx-auto px-4 pb-20">
            <div className="grid sm:grid-cols-3 gap-6">
              <MotionCard delay={0.1}>
                <div className="w-10 h-10 rounded-[10px] bg-primary-light flex items-center justify-center mb-4">
                  <SkinIcon className="text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Skin Analysis</h3>
                <p className="text-muted-foreground text-sm">
                  Get your skin type, hydration score, and personalized recommendations powered by AI vision.
                </p>
              </MotionCard>
              <MotionCard delay={0.2}>
                <div className="w-10 h-10 rounded-[10px] bg-primary-light flex items-center justify-center mb-4">
                  <DogIcon className="text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Dog Diet Plan</h3>
                <p className="text-muted-foreground text-sm">
                  Breed-specific calorie calculations, nutrient breakdowns, and feeding recommendations.
                </p>
              </MotionCard>
              <MotionCard delay={0.3}>
                <div className="w-10 h-10 rounded-[10px] bg-primary-light flex items-center justify-center mb-4">
                  <ShareIcon className="text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Share Results</h3>
                <p className="text-muted-foreground text-sm">
                  Generate beautiful result cards and share your scores with friends on any platform.
                </p>
              </MotionCard>
            </div>
          </section>

          <section className="max-w-4xl mx-auto px-4 pb-20 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-muted-foreground text-sm mb-2">
                Trusted by pet owners and skincare enthusiasts
              </p>
              <div className="flex justify-center gap-8 text-muted-foreground">
                <div>
                  <div className="text-2xl font-bold text-foreground">10K+</div>
                  <div className="text-xs">Scans completed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">4.8</div>
                  <div className="text-xs">Average rating</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">40+</div>
                  <div className="text-xs">Dog breeds</div>
                </div>
              </div>
            </motion.div>
          </section>
        </main>

        <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SkinPet. All rights reserved.</p>
        </footer>
      </PageTransition>
    </>
  );
}

function SkinIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  );
}

function DogIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5" />
      <path d="M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5" />
      <path d="M8 14v.5" /><path d="M16 14v.5" />
      <path d="M11.25 16.25h1.5L12 17l-.75-.75Z" />
      <path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444c0-1.061-.162-2.2-.493-3.309m-9.243-6.082A8.801 8.801 0 0 1 12 5c.78 0 1.5.108 2.161.306" />
    </svg>
  );
}

function ShareIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}
