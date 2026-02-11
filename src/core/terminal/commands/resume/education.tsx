import education from "@/data/education.json";
import { Command } from "../../types";
import {
	print,
	printAccent,
	printDivider,
	printKeyValue,
	printSubtle,
} from "../../output";

export const educationCommand: Command = {
	name: "education",
	description: "Academic background",
	examples: ["education", "ask What is his educational background?"],
	async execute(_, ctx) {
		for (const edu of education) {
			await printAccent(edu.institution, ctx);
			await printSubtle(edu.degree, ctx);
			await print([edu.duration], ctx);
			await printKeyValue("Score", edu.score, ctx);

			await printDivider(ctx);
		}
	},
};
