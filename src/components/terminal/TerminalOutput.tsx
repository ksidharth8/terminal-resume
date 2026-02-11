import { TerminalLine } from "@/core/terminal/types";

export default function TerminalOutput({ lines }: { lines: TerminalLine[] }) {
	return (
		<div className="space-y-1">
			{lines.map((line) => (
				<div key={line.id}>{line.content}</div>
			))}
		</div>
	);
}
