"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Nav } from "../../components/nav";
import { PageTransition } from "../../components/page-transition";
import { MotionButton } from "../../components/motion-button";
import { ScanLoading } from "../../components/scan-loading";
import { saveScan, generateId, canScanFree } from "../../../lib/scan-store";
import type { SkinResult } from "../../../lib/scan-store";

function compressImage(file: File, maxWidth: number = 800): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height, 1);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.8));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function SkinScanPage() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file.");
      return;
    }
    setError(null);
    const compressed = await compressImage(file);
    setImage(compressed);
  }, []);

  const handleAnalyze = async () => {
    if (!image) return;
    if (!canScanFree()) {
      setError("Free tier: 1 scan per week. Upgrade for unlimited scans!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/analyze-skin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      const data = await res.json();
      const id = generateId();
      const result: SkinResult = {
        id,
        type: "skin",
        skinType: data.skinType || "Normal",
        hydrationScore: data.hydrationScore ?? 65,
        issues: data.issues || [],
        recommendations: data.recommendations || [],
        createdAt: new Date().toISOString(),
      };
      saveScan(result);
      router.push(`/result?id=${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed. Please try again.");
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
            <ScanLoading label="Analyzing your skin..." />
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
          <h1 className="text-3xl font-bold mb-2">Skin Analysis</h1>
          <p className="text-muted-foreground mb-8">
            Upload a clear photo of your face or skin area for AI analysis.
          </p>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />

          {!image ? (
            <div
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file) handleFile(file);
              }}
              className="border-2 border-dashed border-border rounded-[16px] p-16 text-center cursor-pointer hover:border-primary hover:bg-primary-light/30 transition-colors"
            >
              <div className="text-4xl mb-4">📸</div>
              <p className="text-lg font-medium mb-1">
                Tap to take a photo or upload
              </p>
              <p className="text-sm text-muted-foreground">
                Drag and drop also works. Max 800px, compressed automatically.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative rounded-[16px] overflow-hidden shadow-[var(--shadow-card)]">
                <img
                  src={image}
                  alt="Skin photo preview"
                  className="w-full max-h-96 object-cover"
                />
                <button
                  onClick={() => {
                    setImage(null);
                    setError(null);
                  }}
                  className="absolute top-3 right-3 bg-card/80 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center text-sm hover:bg-card transition-colors"
                >
                  ✕
                </button>
              </div>
              <MotionButton onClick={handleAnalyze} className="w-full" size="lg">
                Analyze My Skin
              </MotionButton>
            </div>
          )}

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
