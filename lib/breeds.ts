export interface BreedInfo {
  name: string;
  avgWeight: number;
  activityMultiplier: number;
  lifeStageMultiplier: { puppy: number; adult: number; senior: number };
}

export const breeds: BreedInfo[] = [
  { name: "Labrador Retriever", avgWeight: 30, activityMultiplier: 1.6, lifeStageMultiplier: { puppy: 2.0, adult: 1.0, senior: 0.8 } },
  { name: "German Shepherd", avgWeight: 34, activityMultiplier: 1.7, lifeStageMultiplier: { puppy: 2.0, adult: 1.0, senior: 0.8 } },
  { name: "Golden Retriever", avgWeight: 30, activityMultiplier: 1.5, lifeStageMultiplier: { puppy: 2.0, adult: 1.0, senior: 0.8 } },
  { name: "French Bulldog", avgWeight: 11, activityMultiplier: 1.2, lifeStageMultiplier: { puppy: 2.0, adult: 1.0, senior: 0.85 } },
  { name: "Bulldog", avgWeight: 23, activityMultiplier: 1.2, lifeStageMultiplier: { puppy: 2.0, adult: 1.0, senior: 0.85 } },
  { name: "Poodle", avgWeight: 27, activityMultiplier: 1.5, lifeStageMultiplier: { puppy: 2.0, adult: 1.0, senior: 0.8 } },
  { name: "Beagle", avgWeight: 10, activityMultiplier: 1.6, lifeStageMultiplier: { puppy: 2.0, adult: 1.0, senior: 0.8 } },
  { name: "Rottweiler", avgWeight: 45, activityMultiplier: 1.6, lifeStageMultiplier: { puppy: 2.0, adult: 1.0, senior: 0.8 } },
  { name: "Dachshund", avgWeight: 9, activityMultiplier: 1.3, lifeStageMultiplier: { puppy: 2.0, adult: 1.0, senior: 0.85 } },
  { name: "German Shorthaired Pointer", avgWeight: 27, activityMultiplier: 1.8, lifeStageMultiplier: { puppy: 2.0, adult: 1.0, senior: 0.8 } },
  { name: "Pembroke Welsh Corgi", avgWeight: 12, activityMultiplier: 1.5, lifeStageMultiplier: { puppy: 2.0, adult: 1.0, senior: 0.85 } },
  { name: "Australian Shepherd", avgWeight: 25, activityMultiplier: 1.8, lifeStageMultiplier: { puppy: 2.0, adult: 1.0, senior: 0.8 } },
  { name: "Yorkshire Terrier", avgWeight: 3, activityMultiplier: 1.3, lifeStageMultiplier: { puppy: 2.0, adult: 1.0, senior: 0.85 } },
  { name: "Cavalier King Charles Spaniel", avgWeight: 7, activityMultiplier: 1.3, lifeStageMultiplier: { puppy: 2.0, adult: 1.0, senior: 0.85 } },
  { name: "Doberman Pinscher", avgWeight: 38, activityMultiplier: 1.7, lifeStageMultiplier: { puppy: 2.0, adult: 1.0, senior: 0.8 } },
  { name: "Boxer", avgWeight: 29, activityMultiplier: 1.6, lifeStageMultiplier: { puppy: 2.0, adult: 1.0, senior: 0.8 } },
  { name: "Miniature Schnauzer", avgWeight: 6, activityMultiplier: 1.4, lifeStageMultiplier: { puppy: 2.0, adult: 1.0, senior: 0.85 } },
  { name: "Cane Corso", avgWeight: 45, activityMultiplier: 1.5, lifeStageMultiplier: { puppy: 2.0, adult: 1.0, senior: 0.8 } },
  { name: "Great Dane", avgWeight: 60, activityMultiplier: 1.4, lifeStageMultiplier: { puppy: 2.0, adult: 1.0, senior: 0.8 } },
  { name: "Shih Tzu", avgWeight: 5, activityMultiplier: 1.2, lifeStageMultiplier: { puppy: 2.0, adult: 1.0, senior: 0.85 } },
  { name: "Siberian Husky", avgWeight: 23, activityMultiplier: 1.8, lifeStageMultiplier: { puppy: 2.0, adult: 1.0, senior: 0.8 } },
  { name: "Bernese Mountain Dog", avgWeight: 42, activityMultiplier: 1.5, lifeStageMultiplier: { puppy: 2.0, adult: 1.0, senior: 0.8 } },
  { name: "Pomeranian", avgWeight: 3, activityMultiplier: 1.3, lifeStageMultiplier: { puppy: 2.0, adult: 1.0, senior: 0.85 } },
  { name: "Boston Terrier", avgWeight: 8, activityMultiplier: 1.4, lifeStageMultiplier: { puppy: 2.0, adult: 1.0, senior: 0.85 } },
  { name: "Havanese", avgWeight: 5, activityMultiplier: 1.3, lifeStageMultiplier: { puppy: 2.0, adult: 1.0, senior: 0.85 } },
  { name: "Shetland Sheepdog", avgWeight: 10, activityMultiplier: 1.6, lifeStageMultiplier: { puppy: 2.0, adult: 1.0, senior: 0.8 } },
  { name: "Brittany", avgWeight: 18, activityMultiplier: 1.8, lifeStageMultiplier: { puppy: 2.0, adult: 1.0, senior: 0.8 } },
  { name: "English Springer Spaniel", avgWeight: 23, activityMultiplier: 1.7, lifeStageMultiplier: { puppy: 2.0, adult: 1.0, senior: 0.8 } },
  { name: "Cocker Spaniel", avgWeight: 13, activityMultiplier: 1.5, lifeStageMultiplier: { puppy: 2.0, adult: 1.0, senior: 0.85 } },
  { name: "Miniature Pinscher", avgWeight: 4, activityMultiplier: 1.4, lifeStageMultiplier: { puppy: 2.0, adult: 1.0, senior: 0.85 } },
  { name: "Border Collie", avgWeight: 18, activityMultiplier: 1.9, lifeStageMultiplier: { puppy: 2.0, adult: 1.0, senior: 0.8 } },
  { name: "Vizsla", avgWeight: 23, activityMultiplier: 1.8, lifeStageMultiplier: { puppy: 2.0, adult: 1.0, senior: 0.8 } },
  { name: "Pug", avgWeight: 7, activityMultiplier: 1.1, lifeStageMultiplier: { puppy: 2.0, adult: 1.0, senior: 0.85 } },
  { name: "Chihuahua", avgWeight: 2, activityMultiplier: 1.2, lifeStageMultiplier: { puppy: 2.0, adult: 1.0, senior: 0.85 } },
  { name: "Maltese", avgWeight: 3, activityMultiplier: 1.2, lifeStageMultiplier: { puppy: 2.0, adult: 1.0, senior: 0.85 } },
  { name: "Weimaraner", avgWeight: 32, activityMultiplier: 1.8, lifeStageMultiplier: { puppy: 2.0, adult: 1.0, senior: 0.8 } },
  { name: "Belgian Malinois", avgWeight: 28, activityMultiplier: 1.9, lifeStageMultiplier: { puppy: 2.0, adult: 1.0, senior: 0.8 } },
  { name: "Collie", avgWeight: 27, activityMultiplier: 1.6, lifeStageMultiplier: { puppy: 2.0, adult: 1.0, senior: 0.8 } },
  { name: "Basset Hound", avgWeight: 25, activityMultiplier: 1.2, lifeStageMultiplier: { puppy: 2.0, adult: 1.0, senior: 0.85 } },
  { name: "Mixed Breed", avgWeight: 20, activityMultiplier: 1.5, lifeStageMultiplier: { puppy: 2.0, adult: 1.0, senior: 0.82 } },
];

export type ActivityLevel = "low" | "moderate" | "high" | "very_high";

const activityModifiers: Record<ActivityLevel, number> = {
  low: 0.8,
  moderate: 1.0,
  high: 1.2,
  very_high: 1.4,
};

export function getLifeStage(ageYears: number, avgWeight: number): "puppy" | "adult" | "senior" {
  const isLargeBreed = avgWeight > 25;
  if (ageYears < (isLargeBreed ? 2 : 1)) return "puppy";
  if (ageYears > (isLargeBreed ? 6 : 8)) return "senior";
  return "adult";
}

export function calculateDogDiet(
  breed: BreedInfo,
  weightKg: number,
  ageYears: number,
  activityLevel: ActivityLevel
) {
  const lifeStage = getLifeStage(ageYears, breed.avgWeight);
  const baseCal = 70 * Math.pow(weightKg, 0.75);
  const calories = Math.round(
    baseCal *
      breed.activityMultiplier *
      breed.lifeStageMultiplier[lifeStage] *
      activityModifiers[activityLevel]
  );

  const proteinG = Math.round(calories * 0.25 / 4);
  const fatG = Math.round(calories * 0.15 / 9);
  const carbG = Math.round(calories * 0.5 / 4);
  const waterMl = Math.round(weightKg * 60);

  const cupsPerDay = Math.round((calories / 350) * 10) / 10;

  return {
    calories,
    proteinG,
    fatG,
    carbG,
    waterMl,
    cupsPerDay,
    lifeStage,
    recommendations: getDietRecommendations(lifeStage, weightKg, breed, activityLevel),
  };
}

function getDietRecommendations(
  lifeStage: string,
  weightKg: number,
  breed: BreedInfo,
  activityLevel: ActivityLevel
): string[] {
  const recs: string[] = [];

  if (lifeStage === "puppy") {
    recs.push("Feed 3-4 smaller meals per day instead of 1-2 large meals");
    recs.push("Choose a puppy-specific formula with DHA for brain development");
  } else if (lifeStage === "senior") {
    recs.push("Consider a senior formula with joint support (glucosamine/chondroitin)");
    recs.push("Monitor weight closely — metabolism slows with age");
  }

  if (weightKg > breed.avgWeight * 1.15) {
    recs.push("Your dog may be overweight — consider a weight management formula");
  } else if (weightKg < breed.avgWeight * 0.85) {
    recs.push("Your dog may be underweight — consult your vet about caloric intake");
  }

  if (activityLevel === "very_high") {
    recs.push("High-performance dogs benefit from higher protein (30%+) formulas");
  }

  recs.push("Always ensure fresh water is available throughout the day");
  recs.push("Consult your veterinarian for personalized dietary advice");

  return recs;
}
