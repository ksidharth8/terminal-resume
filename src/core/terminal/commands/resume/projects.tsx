import projects from "@/data/projects.json";
import { Command } from "../../types";
import {
	print,
	printAccent,
	printSubtle,
	printKeyValue,
	printDivider,
	printLinkLine,
} from "../../output";

export const projectsCommand: Command = {
	name: "projects",
	description: "View projects",
	examples: ["projects", "ask What projects has he built?"],
	async execute(_, ctx) {
		for (const p of projects) {
			await printAccent(p.name, ctx);
			await printSubtle(p.oneLiner, ctx);
			await print([""], ctx);

			await print([p.description], ctx);
			await print([""], ctx);

			await printKeyValue("Tech", p.tech.join(", "), ctx);
			await printLinkLine("Live", p.live, ctx);
			await printLinkLine("Repo", p.repo, ctx);

			if (p.npm) {
				await printLinkLine("NPM", p.npm, ctx);
			}

			await printDivider(ctx);
		}
	},
};
