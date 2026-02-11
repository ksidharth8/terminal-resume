import profile from "@/data/profile.json";
import { Command } from "../../types";
import { print, printAccent, printSubtle, printKeyValue } from "../../output";

export const aboutCommand: Command = {
	name: "about",
	description: "Who I am",
	examples: ["about", "ask Who is he?"],
	async execute(_, ctx) {
		await printAccent(profile.name, ctx);
		await printSubtle(profile.role, ctx);
		await print([""], ctx);

		await print([profile.summary], ctx);
		await print([""], ctx);

		await printKeyValue("Location", profile.location, ctx);
		await printKeyValue("Email", profile.email, ctx);
	},
};
