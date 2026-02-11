import { THEMES } from "../themes";
import { Command } from "../types";
import { COMMANDS } from "../commands";
import {
	printAccent,
	print,
	printDivider,
	printError,
	printSubtle,
} from "../output";

export const manCommand: Command = {
	name: "man",
	description: "Show manual for commands",
	usage: "man [command]",
	examples: ["man", "man projects"],

	async execute(args, ctx) {
		// 🔹 If no argument → list all commands
		if (!args.length) {
			await printAccent("Available commands:", ctx);

			for (const cmd of COMMANDS) {
				ctx.appendLine(
					<div>
						<span className={THEMES[ctx.theme].accent}>
							{cmd.name.padEnd(14)}
						</span>
						<span className={THEMES[ctx.theme].subtle}>
							{" - "}
							{cmd.description}
						</span>
					</div>,
				);
			}

			return;
		}

		// 🔹 man <command>
		const target = COMMANDS.find((c) => c.name === args[0]);

		if (!target) {
			await printError(`No manual entry for ${args[0]}`, ctx);
			return;
		}

		await print([`${target.name} - ${target.description}`], ctx);

		await printDivider(ctx);

		if (target.usage) {
			await printAccent("USAGE", ctx);
			await print([target.usage], ctx);
			await printDivider(ctx);
		}

		if (target.flags?.length) {
			await printAccent("FLAGS", ctx);
			for (const flag of target.flags) {
				await print([flag], ctx, 10);
			}
			await printDivider(ctx);
		}

		if (target.examples?.length) {
			await printAccent("EXAMPLES", ctx);
			for (const example of target.examples) {
				await print([example], ctx, 10);
			}
		}
	},
};
