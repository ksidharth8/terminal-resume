"use client";

import { useState } from "react";
import TerminalPrompt from "./TerminalPrompt";
import { getSuggestions } from "@/core/terminal/autocomplete";
import { THEMES } from "@/core/terminal/themes";

export default function TerminalInput({
	onSubmit,
	history,
	historyIndex,
	setHistoryIndex,
	theme,
	inputRef,
	hidePrompt,
	activeQuestion,
}: {
	onSubmit: (value: string) => void;
	history: string[];
	historyIndex: number | null;
	setHistoryIndex: (v: number | null) => void;
	theme: keyof typeof THEMES;
	inputRef: React.RefObject<HTMLInputElement>;
	hidePrompt?: boolean;
	activeQuestion?: string | null;
}) {
	const [value, setValue] = useState("");
	const [tabIndex, setTabIndex] = useState(0);
	const [tabBase, setTabBase] = useState<string | null>(null);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		// ESC — exit interactive mode
		if (e.key === "Escape") {
			e.preventDefault();
			onSubmit("__ESC__");
			return;
		}

		// Prevent cursor movement
		if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
			e.preventDefault();
			return;
		}

		// Enter
		if (e.key === "Enter") {
			onSubmit(value);
			setValue("");
			return;
		}

		// History up
		if (e.key === "ArrowUp") {
			e.preventDefault();
			if (!history.length) return;

			const newIndex =
				historyIndex === null
					? history.length - 1
					: Math.max(0, historyIndex - 1);

			setHistoryIndex(newIndex);
			setValue(history[newIndex]);
			return;
		}

		// History down
		if (e.key === "ArrowDown") {
			e.preventDefault();
			if (historyIndex === null) return;

			const newIndex =
				historyIndex + 1 >= history.length ? null : historyIndex + 1;

			setHistoryIndex(newIndex);
			setValue(newIndex === null ? "" : history[newIndex]);
			return;
		}

		// Autocomplete
		if (e.key === "Tab") {
			e.preventDefault();

			const base = tabBase ?? value;
			const suggestions = getSuggestions(base);

			if (!suggestions.length) return;

			const next = suggestions[tabIndex % suggestions.length];

			const parts = base.trim().split(" ");
			const newValue = parts.length === 1 ? next : `${parts[0]} ${next}`;

			setValue(newValue);
			setTabBase(base);
			setTabIndex((i) => i + 1);
		}
	};

	return (
		<div className="flex items-center gap-2 select-none opacity-95 focus-within:opacity-100">
			{activeQuestion ? (
				<span className={THEMES[theme].accent}>{activeQuestion}</span>
			) : (
				!hidePrompt && <TerminalPrompt theme={theme} />
			)}

			<div className="flex-1 relative">
				<div className="flex items-center">
					<span className="whitespace-pre">{value}</span>
					<span className="animate-blink ml-0.5 opacity-80 select-none">
						▌
					</span>
				</div>

				<input
					ref={inputRef}
					className="absolute inset-0 w-full bg-transparent outline-none text-transparent caret-transparent"
					value={value}
					autoFocus
					onChange={(e) => {
						setValue(e.target.value);
						setTabIndex(0);
						setTabBase(null);
					}}
					onKeyDown={handleKeyDown}
				/>
			</div>
		</div>
	);
}
