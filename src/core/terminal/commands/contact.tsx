import { Command } from "../types";

export const contactCommand: Command = {
	name: "contact",
	description: "Send a message directly via email",
	async execute(_, ctx) {
		ctx.setActiveQuestion?.("? Name:");

		ctx.setInteractive?.({
			type: "contact",
			step: 0,
			data: {},
		});
	},
};
