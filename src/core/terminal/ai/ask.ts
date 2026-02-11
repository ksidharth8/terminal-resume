import { buildResumeContext } from "./buildContext";
import { buildPrompt } from "./prompt";

const API_URL = "https://api.pawan.krd/v1/chat/completions";
const MODEL = "gpt-oss-20b";

export async function askAI(question: string) {
	const context = buildResumeContext();
	const prompt = buildPrompt(question, context);

	const response = await fetch(API_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAWAN_KEY}`,
		},
		body: JSON.stringify({
			model: MODEL,
			temperature: 0.2,
			messages: [{ role: "user", content: prompt }],
		}),
	});

	const data = await response.json();
	return data.choices?.[0]?.message?.content ?? "Error generating response.";
}
