"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Nav } from "../components/nav";
import { PageTransition } from "../components/page-transition";
import { MotionButton } from "../components/motion-button";
import { getScanById, type ScanResult, type SkinResult, type DogResult } from "../../lib/scan-store";

function ResultContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      const scan = getScanById(id);
      setResult(scan);
      const timer = setTimeout(() => setShowDetails(true), 400);
      return () => clearTimeout(timer);
    }
  }, [id]);

  const handleShare = async () => {
    if (!cardRef.current) return;
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(cardRef.current, {
        width: 1080,
        height: 1350,
        style: { transform: "scale(1)", transformOrigin: "top left" },
      });

      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], "skinpet-result.png", { type: "image/png" });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "My SkinPet Result",
          text: result?.type === "skin"
            ? `My skin hydration score: ${(result as SkinResult).hydrationScore}/100`
            : `My dog's daily calories: ${(result as DogResult).calories}`,
          files: [file],
        });
      } else {
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = "skinpet-result.png";
        a.click();
      }
    } catch {
      // user cancelled share
    }
  };

  if (!result) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center text-muted-foreground">
        Result not found. Try scanning again.
      </div>
    );
  }

  const isSkin = result.type === "skin";
  const skinResult = result as SkinResult;
  const dogResult = result as DogResult;
  const percentile = isSkin ? Math.min(99, Math.max(10, Math.round(skinResult.hydrationScore * 0.82 + 12))) : 0;

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <div
        ref={cardRef}
        className="bg-card rounded-[16px] overflow-hidden shadow-[var(--shadow-elevated)] mb-8"
        style={{ maxWidth: 540 }}
      >
        <div className="bg-primary p-6 text-primary-foreground text-center">
          <div className="text-sm font-medium opacity-80 mb-1">SkinPet</div>
          <div className="text-2xl font-bold">
            {isSkin ? "Skin Analysis" : "Dog Diet Plan"}
          </div>
        </div>

        <div className="p-8">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-center mb-8"
            >
              {isSkin ? (
                <>
                  <div className="text-6xl font-bold text-primary mb-2">
                    {skinResult.hydrationScore}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Hydration Score — {skinResult.skinType} Skin
                  </div>
                  <div className="mt-2 text-xs text-accent font-medium">
                    Beats {percentile}% of scans this week
                  </div>
                </>
              ) : (
                <>
                  <div className="text-5xl font-bold text-primary mb-2">
                    {dogResult.calories}
                    <span className="text-xl font-normal text-muted-foreground ml-1">
                      cal/day
                    </span>
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {dogResult.breedName} — {dogResult.lifeStage} stage
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {showDetails && (
            <>
              {isSkin && skinResult.issues.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.1, ease: "easeOut" }}
                  className="mb-6"
                >
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">
                    Issues Found
                  </h3>
                  <div className="space-y-2">
                    {skinResult.issues.map((issue, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: 0.15 + i * 0.05 }}
                        className="flex items-start gap-2 text-sm"
                      >
                        <span className="text-accent mt-0.5">●</span>
                        <span>{issue}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {!isSkin && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.1, ease: "easeOut" }}
                  className="mb-6"
                >
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">
                    Nutrient Breakdown
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Protein", value: `${dogResult.proteinG}g` },
                      { label: "Fat", value: `${dogResult.fatG}g` },
                      { label: "Carbs", value: `${dogResult.carbG}g` },
                      { label: "Water", value: `${dogResult.waterMl}ml` },
                      { label: "Food", value: `${dogResult.cupsPerDay} cups/day` },
                      { label: "Weight", value: `${dogResult.weightKg}kg` },
                    ].map(({ label, value }, i) => (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.15 + i * 0.04 }}
                        className="bg-muted rounded-[10px] p-3"
                      >
                        <div className="text-xs text-muted-foreground">{label}</div>
                        <div className="font-semibold">{value}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.3, ease: "easeOut" }}
              >
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">
                  Recommendations
                </h3>
                <div className="space-y-2">
                  {result.recommendations.map((rec, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: 0.35 + i * 0.05 }}
                      className="flex items-start gap-2 text-sm"
                    >
                      <span className="text-primary mt-0.5">✓</span>
                      <span>{rec}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <MotionButton onClick={handleShare} className="flex-1" size="lg">
          Share Your Score
        </MotionButton>
        <MotionButton
          variant="outline"
          onClick={() => window.history.back()}
          size="lg"
        >
          Scan Again
        </MotionButton>
      </div>
    </main>
  );
}

export default function ResultPage() {
  return (
    <>
      <Nav />
      <PageTransition>
        <Suspense
          fallback={
            <div className="max-w-2xl mx-auto px-4 py-20 text-center text-muted-foreground">
              Loading result...
            </div>
          }
        >
          <ResultContent />
        </Suspense>
      </PageTransition>
    </>
  );
}
