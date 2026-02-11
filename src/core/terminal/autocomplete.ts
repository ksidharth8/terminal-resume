import { THEMES } from "./themes";
import { COMMANDS } from "./commands";

export function getSuggestions(input: string) {
	const parts = input.trim().split(" ");
	const first = parts[0];
	const second = parts[1] || "";

	// 🔹 First word suggestions
	if (parts.length === 1) {
		return COMMANDS.map((c) => c.name).filter((cmd) => cmd.startsWith(first));
	}

	// 🔹 man <command>
	if (first === "man") {
		return COMMANDS.map((c) => c.name).filter((cmd) =>
			cmd.startsWith(second),
		);
	}

	// 🔹 theme <theme>
	if (first === "theme") {
		return Object.keys(THEMES).filter((theme) => theme.startsWith(second));
	}

	// 🔹 socials flags
	if (first === "socials") {
		const flags = ["--github", "--linkedin", "--leetcode", "--codolio"];
		return flags.filter((f) => f.startsWith(second));
	}

	return [];
}
