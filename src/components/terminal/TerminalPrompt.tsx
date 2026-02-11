import { THEMES } from "@/core/terminal/themes";

export default function TerminalPrompt({
	theme,
}: {
	theme: keyof typeof THEMES;
}) {
	return <span className={THEMES[theme].accent}>{THEMES[theme].prompt}</span>;
}
