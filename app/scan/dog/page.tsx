"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Nav } from "../../components/nav";
import { PageTransition } from "../../components/page-transition";
import { MotionButton } from "../../components/motion-button";
import { ScanLoading } from "../../components/scan-loading";
import { breeds, type ActivityLevel } from "../../../lib/breeds";
import { saveScan, generateId, canScanFree } from "../../../lib/scan-store";
import type { DogResult } from "../../../lib/scan-store";

export default function DogScanPage() {
  const [breedName, setBreedName] = useState(breeds[0].name);
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState<ActivityLevel>("moderate");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleAnalyze = async () => {
    if (!age || !weight) {
      setError("Please fill in age and weight.");
      return;
    }
    if (!canScanFree()) {
      setError("Free tier: 1 scan per week. Upgrade for unlimited scans!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/analyze-dog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          breedName,
          ageYears: parseFloat(age),
          weightKg: parseFloat(weight),
          activityLevel: activity,
        }),
      });

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      const id = generateId();
      const result: DogResult = {
        id,
        type: "dog",
        breedName,
        weightKg: parseFloat(weight),
        ageYears: parseFloat(age),
        ...data,
        createdAt: new Date().toISOString(),
      };
      saveScan(result);
      router.push(`/result?id=${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Nav />
        <PageTransition>
          <main className="max-w-2xl mx-auto px-4 py-12">
            <ScanLoading label="Calculating diet plan..." />
          </main>
        </PageTransition>
      </>
    );
  }

  return (
    <>
      <Nav />
      <PageTransition>
        <main className="max-w-2xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-2">Dog Health Scanner</h1>
          <p className="text-muted-foreground mb-8">
            Enter your dog&apos;s details for a personalized diet and health plan.
          </p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Breed</label>
              <select
                value={breedName}
                onChange={(e) => setBreedName(e.target.value)}
                className="w-full px-4 py-3 bg-card border border-border rounded-[10px] text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {breeds.map((b) => (
                  <option key={b.name} value={b.name}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Age (years)
                </label>
                <input
                  type="number"
                  min="0"
                  max="25"
                  step="0.5"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 3"
                  className="w-full px-4 py-3 bg-card border border-border rounded-[10px] text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  min="0.5"
                  max="100"
                  step="0.5"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g. 25"
                  className="w-full px-4 py-3 bg-card border border-border rounded-[10px] text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Activity Level
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(
                  [
                    { value: "low", label: "Low", desc: "Mostly resting" },
                    { value: "moderate", label: "Moderate", desc: "Daily walks" },
                    { value: "high", label: "High", desc: "Active play" },
                    { value: "very_high", label: "Very High", desc: "Working dog" },
                  ] as const
                ).map(({ value, label, desc }) => (
                  <button
                    key={value}
                    onClick={() => setActivity(value)}
                    className={`p-3 rounded-[10px] border text-left transition-colors ${
                      activity === value
                        ? "border-primary bg-primary-light text-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="text-sm font-medium">{label}</div>
                    <div className="text-xs text-muted-foreground">{desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <MotionButton onClick={handleAnalyze} className="w-full" size="lg">
              Get Diet Plan
            </MotionButton>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-destructive/10 text-destructive rounded-[10px] text-sm">
              {error}
            </div>
          )}
        </main>
      </PageTransition>
    </>
  );
}
