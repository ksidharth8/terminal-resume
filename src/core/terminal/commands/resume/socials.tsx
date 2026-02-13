import profile from "@/data/profile.json";
import { Command } from "../../types";
import {
	printAccent,
	printError,
	printLinkLine,
	printDivider,
} from "../../output";

export const socialsCommand: Command = {
	name: "socials",
	description: "Social profiles",
	usage: "socials [--github|--linkedin|--leetcode|--codolio]",
	flags: ["--github", "--linkedin", "--leetcode", "--codolio"],
	examples: ["socials", "socials --github"],
	async execute(args, ctx) {
		const flag = args[0];

		if (flag) {
			const map: Record<string, string> = {
				"--github": profile.links.github,
				"--linkedin": profile.links.linkedin,
				"--leetcode": profile.links.leetcode,
				"--codolio": profile.links.codolio,
			};

			if (!map[flag]) {
				await printError(`unknown flag ${flag}`, ctx);
				return;
			}

			printAccent(`Opening ${flag.replace("--", "")} profile...`, ctx);
			window.open(map[flag], "_blank");
			return;
		}

		await printAccent("Social Links", ctx);
		await printLinkLine("GitHub", profile.links.github, ctx);
		await printLinkLine("LinkedIn", profile.links.linkedin, ctx);
		await printLinkLine("LeetCode", profile.links.leetcode, ctx);
		await printLinkLine("Codolio", profile.links.codolio, ctx);
		await printDivider(ctx);
	},
};
