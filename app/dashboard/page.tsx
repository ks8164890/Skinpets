"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Nav } from "../components/nav";
import { PageTransition } from "../components/page-transition";
import { MotionCard } from "../components/motion-card";
import { getScans, type ScanResult, type SkinResult, type DogResult } from "../../lib/scan-store";

export default function DashboardPage() {
  const [scans, setScans] = useState<ScanResult[]>([]);

  useEffect(() => {
    setScans(getScans());
  }, []);

  return (
    <>
      <Nav />
      <PageTransition>
        <main className="max-w-2xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-2">Scan History</h1>
          <p className="text-muted-foreground mb-8">
            Your recent scans are stored locally on this device.
          </p>

          {scans.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-4">📊</div>
              <p className="text-muted-foreground mb-4">No scans yet</p>
              <div className="flex gap-3 justify-center">
                <Link
                  href="/scan/skin"
                  className="text-primary font-medium hover:underline"
                >
                  Scan your skin
                </Link>
                <span className="text-border">|</span>
                <Link
                  href="/scan/dog"
                  className="text-primary font-medium hover:underline"
                >
                  Scan your dog
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {scans.map((scan, i) => (
                <Link key={scan.id} href={`/result?id=${scan.id}`}>
                  <MotionCard delay={i * 0.05} className="cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${
                              scan.type === "skin"
                                ? "bg-primary-light text-primary"
                                : "bg-accent/20 text-secondary"
                            }`}
                          >
                            {scan.type === "skin" ? "Skin" : "Dog"}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(scan.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="font-medium">
                          {scan.type === "skin"
                            ? `${(scan as SkinResult).skinType} — Score: ${(scan as SkinResult).hydrationScore}`
                            : `${(scan as DogResult).breedName} — ${(scan as DogResult).calories} cal/day`}
                        </p>
                      </div>
                      <motion.div
                        whileHover={{ x: 4 }}
                        className="text-muted-foreground"
                      >
                        →
                      </motion.div>
                    </div>
                  </MotionCard>
                </Link>
              ))}
            </div>
          )}
        </main>
      </PageTransition>
    </>
  );
}
