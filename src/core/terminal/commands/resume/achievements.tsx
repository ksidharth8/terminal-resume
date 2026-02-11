import achievements from "@/data/achievements.json";
import { Command } from "../../types";
import { print, printAccent, printDivider } from "../../output";

export const achievementsCommand: Command = {
	name: "achievements",
	description: "Scholarships & achievements",
	examples: ["achievements", "ask What are his achievements?"],
	async execute(_, ctx) {
		for (const a of achievements) {
			await printAccent(a.title, ctx);
			await print([a.details], ctx);
			await printDivider(ctx);
			await printDivider(ctx);
		}
	},
};
