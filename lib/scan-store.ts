export interface SkinResult {
  id: string;
  type: "skin";
  skinType: string;
  hydrationScore: number;
  issues: string[];
  recommendations: string[];
  createdAt: string;
}

export interface DogResult {
  id: string;
  type: "dog";
  breedName: string;
  weightKg: number;
  ageYears: number;
  calories: number;
  proteinG: number;
  fatG: number;
  carbG: number;
  waterMl: number;
  cupsPerDay: number;
  lifeStage: string;
  recommendations: string[];
  coatNotes?: string;
  createdAt: string;
}

export type ScanResult = SkinResult | DogResult;

const STORAGE_KEY = "skinpet_scans";
const LAST_SCAN_KEY = "skinpet_last_scan";

export function saveScan(result: ScanResult): void {
  if (typeof window === "undefined") return;
  const existing = getScans();
  existing.unshift(result);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  localStorage.setItem(LAST_SCAN_KEY, JSON.stringify(result));
}

export function getScans(): ScanResult[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function getScanById(id: string): ScanResult | null {
  return getScans().find((s) => s.id === id) || null;
}

export function getLastScan(): ScanResult | null {
  if (typeof window === "undefined") return null;
  try {
    const data = localStorage.getItem(LAST_SCAN_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function canScanFree(): boolean {
  if (typeof window === "undefined") return true;
  const scans = getScans();
  if (scans.length === 0) return true;
  const lastScan = new Date(scans[0].createdAt);
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  return lastScan < weekAgo;
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
