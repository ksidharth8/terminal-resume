import experience from "@/data/experience.json";
import { Command } from "../../types";
import { printAccent, printSubtle, print, printDivider } from "../../output";

export const experienceCommand: Command = {
	name: "experience",
	description: "Engineering experience",
	examples: ["experience", "ask What experience does he have?"],
	async execute(_, ctx) {
		for (const exp of experience) {
			await printAccent(exp.title, ctx);
			await printSubtle(exp.organization, ctx);
			await print([exp.duration, ""], ctx);

			for (const point of exp.description) {
				await print([`• ${point}`], ctx, 10);
			}

			await printDivider(ctx);
		}
	},
};
