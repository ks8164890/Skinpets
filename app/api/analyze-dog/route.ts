import { NextRequest, NextResponse } from "next/server";
import { breeds, calculateDogDiet, type ActivityLevel } from "../../../lib/breeds";

export async function POST(req: NextRequest) {
  try {
    const { breedName, ageYears, weightKg, activityLevel } = await req.json();

    if (!breedName || typeof ageYears !== "number" || typeof weightKg !== "number") {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const breed = breeds.find((b) => b.name === breedName);
    if (!breed) {
      return NextResponse.json({ error: "Unknown breed" }, { status: 400 });
    }

    const validActivity: ActivityLevel = ["low", "moderate", "high", "very_high"].includes(activityLevel)
      ? activityLevel
      : "moderate";

    const result = calculateDogDiet(breed, weightKg, ageYears, validActivity);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Dog analysis error:", error);
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
  }
}
