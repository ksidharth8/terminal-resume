import { Command } from "../types";
import { printAccent } from "../output";
import { REPO_URL } from "../constants";

export const repoCommand: Command = {
	name: "repo",
	description: "View project repository",
	examples: ["repo", "ask Can I see the github repository?"],
	async execute(_, ctx) {
		await printAccent("Opening github repository...", ctx);
		window.open(REPO_URL, "_blank");
	},
};
