import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const DEFAULT_RESULT = {
  skinType: "Normal",
  hydrationScore: 65,
  issues: ["Unable to perform detailed analysis — using estimated defaults"],
  recommendations: [
    "Drink at least 8 glasses of water daily",
    "Apply SPF 30+ sunscreen every morning",
    "Use a gentle cleanser suited to your skin type",
    "Moisturize after cleansing",
  ],
};

export async function POST(req: NextRequest) {
  try {
    const { image } = await req.json();

    if (!image || typeof image !== "string") {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    if (!GEMINI_API_KEY) {
      return NextResponse.json(DEFAULT_RESULT);
    }

    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Analyze this skin photo. Return ONLY valid JSON with no markdown formatting, no code blocks, just the raw JSON object: {"skinType": "Oily|Dry|Combination|Normal|Sensitive", "hydrationScore": <0-100>, "issues": ["issue1", "issue2"], "recommendations": ["rec1", "rec2", "rec3"]}. Be specific and helpful. If unsure about anything, provide reasonable estimates.`,
                },
                {
                  inlineData: {
                    mimeType: "image/jpeg",
                    data: base64Data,
                  },
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    if (!response.ok) {
      console.error("Gemini API error:", response.status);
      return NextResponse.json(DEFAULT_RESULT);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(DEFAULT_RESULT);
    }

    const parsed = JSON.parse(jsonMatch[0]);

    return NextResponse.json({
      skinType: parsed.skinType || DEFAULT_RESULT.skinType,
      hydrationScore:
        typeof parsed.hydrationScore === "number"
          ? Math.max(0, Math.min(100, parsed.hydrationScore))
          : DEFAULT_RESULT.hydrationScore,
      issues: Array.isArray(parsed.issues) ? parsed.issues : DEFAULT_RESULT.issues,
      recommendations: Array.isArray(parsed.recommendations)
        ? parsed.recommendations
        : DEFAULT_RESULT.recommendations,
    });
  } catch (error) {
    console.error("Skin analysis error:", error);
    return NextResponse.json(DEFAULT_RESULT);
  }
}
