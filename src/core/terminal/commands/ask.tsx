import { Command } from "../types";
import { printAccent, print, printError } from "../output";
import { formatAIResponse, renderAIResponse } from "../ai/format";
import { askAI } from "../ai/ask";

export const askCommand: Command = {
	name: "ask",
	description: "Ask about the resume",
	examples: [
		"ask What is his educational background?",
		"ask What technical skills does he have?",
		"ask Who is he?",
	],
	async execute(args, ctx) {
		if (!args.length) {
			await printError("Please provide a question.", ctx);
			return;
		}

		const question = args.join(" ");

		await printAccent("Thinking...", ctx);

		try {
			const answer = await askAI(question);

			await print([""], ctx);
			const formatted = formatAIResponse(answer);
			await renderAIResponse(formatted, ctx);
		} catch (err) {
			await printError("AI request failed.", ctx);
		}
	},
};
