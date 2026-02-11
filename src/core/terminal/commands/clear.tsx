import { Command } from "../types";

export const clearCommand: Command = {
	name: "clear",
	description: "Clear the terminal",
	execute(_, ctx) {
		ctx.clear();
	},
};
