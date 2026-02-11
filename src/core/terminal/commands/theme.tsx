import { THEMES } from "../themes";
import { Command } from "../types";

export const themeCommand: Command = {
	name: "theme",
	description: "Change terminal theme",
	usage: "theme <theme-name>",
	examples: ["theme dracula", "theme nord"],

	execute(args, ctx) {
		const name = args[0] as keyof typeof THEMES;

		if (!name || !THEMES[name]) {
			ctx.appendLine(
				<div>Available themes: {Object.keys(THEMES).join(", ")}</div>,
			);
			return;
		}

		ctx.setTheme(name);
		ctx.appendLine(<div>Theme changed to {name}</div>);
	},
};
