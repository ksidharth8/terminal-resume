import skills from "@/data/skills.json";
import { Command } from "../../types";
import { printAccent, print, printDivider } from "../../output";

export const skillsCommand: Command = {
	name: "skills",
	description: "Technical skills",
	examples: ["skills", "ask What technical skills does he have?"],
	async execute(_, ctx) {
		for (const [category, list] of Object.entries(skills)) {
			await printAccent(category.toUpperCase(), ctx);
			await print([(list as string[]).join(", ")], ctx, 10);
			await printDivider(ctx);
		}
	},
};
