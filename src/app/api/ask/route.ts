import { NextResponse } from "next/server";
import { buildResumeContext } from "@/core/terminal/ai/buildContext";
import { buildPrompt } from "@/core/terminal/ai/prompt";

const API_URL = "https://api.pawan.krd/v1/chat/completions";
const MODEL = "gpt-oss-20b";

export async function POST(req: Request) {
	try {
		const { question } = await req.json();

		const context = buildResumeContext();
		const prompt = buildPrompt(question, context);

		const response = await fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${process.env.PAWAN_API_KEY}`,
			},
			body: JSON.stringify({
				model: MODEL,
				temperature: 0.2,
				messages: [{ role: "user", content: prompt }],
			}),
		});

		const data = await response.json();

		if (!response.ok) {
			console.error("AI provider error:", data);
			return NextResponse.json(
				{ answer: "AI provider error." },
				{ status: 500 },
			);
		}

		return NextResponse.json({
			answer:
				data.choices?.[0]?.message?.content || "Error generating response.",
		});
	} catch (err) {
		console.error("Server error:", err);
		return NextResponse.json(
			{ answer: "Error generating response." },
			{ status: 500 },
		);
	}
}
