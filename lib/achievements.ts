const STORAGE_KEY = "skinpet_achievements";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export const ACHIEVEMENT_DEFS: Omit<Achievement, "unlocked" | "unlockedAt">[] = [
  { id: "first_scan", title: "First Steps", description: "Completed your first scan", icon: "🌱" },
  { id: "glow_up", title: "Glow Up", description: "Analyzed your skin health", icon: "✨" },
  { id: "dog_parent", title: "Dog Parent", description: "Checked your dog's nutrition", icon: "🐕" },
  { id: "five_scans", title: "Dedicated", description: "Completed 5 scans", icon: "⭐" },
  { id: "ten_scans", title: "Wellness Pro", description: "Completed 10 scans", icon: "🏆" },
  { id: "dual_expert", title: "Dual Expert", description: "Used both scanners", icon: "🎯" },
];

export function getAchievements(): Achievement[] {
  if (typeof window === "undefined")
    return ACHIEVEMENT_DEFS.map((a) => ({ ...a, unlocked: false }));
  try {
    const stored: Record<string, string> = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "{}"
    );
    return ACHIEVEMENT_DEFS.map((a) => ({
      ...a,
      unlocked: !!stored[a.id],
      unlockedAt: stored[a.id] || undefined,
    }));
  } catch {
    return ACHIEVEMENT_DEFS.map((a) => ({ ...a, unlocked: false }));
  }
}

function unlockOne(id: string, stored: Record<string, string>): boolean {
  if (stored[id]) return false;
  stored[id] = new Date().toISOString();
  return true;
}

export function checkAndUnlockAchievements(params: {
  total: number;
  hasSkin: boolean;
  hasDog: boolean;
}): string[] {
  if (typeof window === "undefined") return [];
  const { total, hasSkin, hasDog } = params;
  const stored: Record<string, string> = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "{}"
  );
  const newlyUnlocked: string[] = [];

  if (total >= 1 && unlockOne("first_scan", stored)) newlyUnlocked.push("first_scan");
  if (hasSkin && unlockOne("glow_up", stored)) newlyUnlocked.push("glow_up");
  if (hasDog && unlockOne("dog_parent", stored)) newlyUnlocked.push("dog_parent");
  if (total >= 5 && unlockOne("five_scans", stored)) newlyUnlocked.push("five_scans");
  if (total >= 10 && unlockOne("ten_scans", stored)) newlyUnlocked.push("ten_scans");
  if (hasSkin && hasDog && unlockOne("dual_expert", stored)) newlyUnlocked.push("dual_expert");

  if (newlyUnlocked.length > 0) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  }
  return newlyUnlocked;
}
