import { buildResumeContext } from "./buildContext";
import { buildPrompt } from "./prompt";

export async function askAI(question: string) {
  const proxyUrl = process.env.NEXT_PUBLIC_AI_PROXY_URL;

  if (!proxyUrl) {
    throw new Error("AI proxy URL not configured.");
  }

  const context = buildResumeContext();
  const prompt = buildPrompt(question, context);

  const res = await fetch(proxyUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`AI request failed: ${errText}`);
  }

  const data = await res.json();
  return data.answer;
}
