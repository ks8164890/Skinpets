"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Nav } from "../components/nav";
import { PageTransition } from "../components/page-transition";
import {
  getScans,
  type ScanResult,
  type SkinResult,
  type DogResult,
} from "../../lib/scan-store";
import {
  getAchievements,
  checkAndUnlockAchievements,
  ACHIEVEMENT_DEFS,
  type Achievement,
} from "../../lib/achievements";

// ── Badge Card ────────────────────────────────────────────────────────────────

function BadgeCard({
  achievement,
  isNew,
}: {
  achievement: Achievement;
  isNew: boolean;
}) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      initial={isNew && !prefersReduced ? { scale: 0.6, opacity: 0 } : { opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={
        isNew && !prefersReduced
          ? { type: "spring", stiffness: 400, damping: 20 }
          : { duration: 0.3 }
      }
      className={`glass-card rounded-[12px] p-4 text-center flex flex-col items-center gap-2 ${
        achievement.unlocked ? "" : "opacity-40 grayscale"
      }`}
    >
      <div className="text-3xl" role="img" aria-label={achievement.title}>
        {achievement.unlocked ? achievement.icon : "🔒"}
      </div>
      <div className="text-xs font-semibold leading-tight">{achievement.title}</div>
      <div className="text-xs text-muted-foreground leading-tight">
        {achievement.description}
      </div>
    </motion.div>
  );
}

// ── Timeline Entry ────────────────────────────────────────────────────────────

function TimelineEntry({
  scan,
  index,
}: {
  scan: ScanResult;
  index: number;
}) {
  const prefersReduced = useReducedMotion();
  const isSkin = scan.type === "skin";
  const skinResult = scan as SkinResult;
  const dogResult = scan as DogResult;

  return (
    <motion.div
      initial={prefersReduced ? { opacity: 0 } : { opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay: index * 0.07, ease: "easeOut" }}
      className="relative pl-8"
    >
      {/* Timeline dot */}
      <div
        className={`absolute left-0 top-4 w-3 h-3 rounded-full border-2 border-background ${
          isSkin ? "bg-primary" : "bg-accent"
        }`}
      />
      {/* Connector line */}
      <div className="absolute left-[5px] top-7 bottom-0 w-px bg-border" aria-hidden="true" />

      <Link href={`/result?id=${scan.id}`} className="block group">
        <div className="glass-card rounded-[12px] p-4 mb-4 group-hover:shadow-[var(--shadow-hover)] transition-shadow duration-200">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span
                className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${
                  isSkin
                    ? "bg-primary/10 text-primary"
                    : "bg-accent/20 text-secondary"
                }`}
              >
                {isSkin ? "Skin" : "Dog"}
              </span>
              <span className="text-xs text-muted-foreground">
                {new Date(scan.createdAt).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <motion.span
              whileHover={{ x: 3 }}
              className="text-muted-foreground text-sm"
              aria-hidden="true"
            >
              →
            </motion.span>
          </div>
          <p className="font-medium text-sm">
            {isSkin
              ? `${skinResult.skinType} skin — Hydration: ${skinResult.hydrationScore}/100`
              : `${dogResult.breedName} — ${dogResult.calories} cal/day`}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

// ── Achievement Toast ─────────────────────────────────────────────────────────

function AchievementToast({
  id,
  onDismiss,
}: {
  id: string;
  onDismiss: () => void;
}) {
  const prefersReduced = useReducedMotion();
  const def = ACHIEVEMENT_DEFS.find((a) => a.id === id);

  useEffect(() => {
    const t = setTimeout(onDismiss, 4000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  if (!def) return null;

  return (
    <motion.div
      initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 380, damping: 22 }}
      role="alert"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 glass-card rounded-[14px] px-5 py-3 flex items-center gap-3 shadow-[var(--shadow-elevated)]"
      style={{ minWidth: 280 }}
    >
      <span className="text-2xl">{def.icon}</span>
      <div>
        <div className="text-xs text-muted-foreground font-medium">Achievement Unlocked!</div>
        <div className="font-semibold text-sm">{def.title}</div>
      </div>
      <button
        onClick={onDismiss}
        className="ml-auto text-muted-foreground hover:text-foreground text-lg leading-none"
        aria-label="Dismiss"
      >
        ×
      </button>
    </motion.div>
  );
}

// ── Empty State ───────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="text-center py-16"
    >
      <div className="text-5xl mb-4">📊</div>
      <p className="text-muted-foreground mb-6">No scans yet — start your wellness journey!</p>
      <div className="flex gap-4 justify-center">
        <Link
          href="/scan/skin"
          className="text-primary font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
        >
          Scan your skin
        </Link>
        <span className="text-border" aria-hidden="true">|</span>
        <Link
          href="/scan/dog"
          className="text-primary font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
        >
          Scan your dog
        </Link>
      </div>
    </motion.div>
  );
}

// ── Dashboard Page ────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [scans, setScans] = useState<ScanResult[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [toastQueue, setToastQueue] = useState<string[]>([]);
  const [newIds, setNewIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loaded = getScans();
    setScans(loaded);

    const hasSkin = loaded.some((s) => s.type === "skin");
    const hasDog = loaded.some((s) => s.type === "dog");
    const unlocked = checkAndUnlockAchievements({
      total: loaded.length,
      hasSkin,
      hasDog,
    });

    setAchievements(getAchievements());
    if (unlocked.length > 0) {
      setNewIds(new Set(unlocked));
      setToastQueue(unlocked);
    }
  }, []);

  function dismissToast() {
    setToastQueue((q) => q.slice(1));
  }

  return (
    <>
      <Nav />
      <PageTransition>
        <main className="max-w-2xl mx-auto px-4 py-12">
          {/* Achievements */}
          <section aria-labelledby="badges-heading" className="mb-12">
            <h2
              id="badges-heading"
              className="text-xl font-bold mb-1"
            >
              Achievements
            </h2>
            <p className="text-sm text-muted-foreground mb-5">
              Unlock badges as you build your wellness routine.
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {achievements.map((a) => (
                <BadgeCard
                  key={a.id}
                  achievement={a}
                  isNew={newIds.has(a.id)}
                />
              ))}
            </div>
          </section>

          {/* Scan History Timeline */}
          <section aria-labelledby="history-heading">
            <h2
              id="history-heading"
              className="text-xl font-bold mb-1"
            >
              Scan History
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Your recent scans are stored locally on this device.
            </p>

            {scans.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="relative">
                {/* Vertical rail */}
                <div
                  className="absolute left-[5px] top-4 bottom-4 w-px bg-border"
                  aria-hidden="true"
                />
                <div>
                  {scans.map((scan, i) => (
                    <TimelineEntry key={scan.id} scan={scan} index={i} />
                  ))}
                </div>
              </div>
            )}
          </section>
        </main>
      </PageTransition>

      {/* Achievement toasts */}
      <AnimatePresence mode="wait">
        {toastQueue.length > 0 && (
          <AchievementToast
            key={toastQueue[0]}
            id={toastQueue[0]}
            onDismiss={dismissToast}
          />
        )}
      </AnimatePresence>
    </>
  );
}
