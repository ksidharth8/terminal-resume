import { THEMES } from "./themes";

export type CommandContext = {
	appendLine: (content: React.ReactNode) => void;
	clear: () => void;
	setTheme: (theme: keyof typeof THEMES) => void;
	theme: keyof typeof THEMES;
};

export type Command = {
	name: string;
	description: string;
	usage?: string;
	aliases?: string[];
	flags?: string[];
	examples?: string[];
	execute: (args: string[], ctx: CommandContext) => void | Promise<void>;
};

export type TerminalLine = {
	id: string;
	content: React.ReactNode;
};

export type TerminalState = {
	lines: TerminalLine[];
};
