import { THEMES } from "../themes";

const urlRegex = /(https?:\/\/[^\s<>]+)/g;

export function formatAIResponse(text: string) {
	let cleaned = text.replace(/\*\*/g, "");
	cleaned = cleaned.replace(/- /g, "• ");

	const lines = cleaned.split("\n").map((l) => l.trim());

	return lines.filter(Boolean);
}

export function parseLineWithLinks(line: string) {
	const parts = line.split(urlRegex);

	return parts.map((part) => {
		const clean = part.replace(/[<>]/g, "");

		if (clean.match(urlRegex)) {
			return { type: "link", value: clean };
		}

		return { type: "text", value: part.replace(/[<>]/g, "") };
	});
}

export async function renderAIResponse(lines: string[], ctx: any) {
	for (const line of lines) {
		const segments = parseLineWithLinks(line);

		ctx.appendLine(
			<div>
				{segments.map((seg, i) => {
					if (seg.type === "link") {
						return (
							<a
								key={i}
								href={seg.value}
								target="_blank"
								rel="noopener noreferrer"
								className={`${THEMES[ctx.theme as keyof typeof THEMES].accent}`}
							>
								{seg.value}
							</a>
						);
					}

					return <span key={i}>{seg.value}</span>;
				})}
			</div>,
		);

		await new Promise((r) => setTimeout(r, 15));
	}
}
