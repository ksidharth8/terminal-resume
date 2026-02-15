"use client";

import { useState, useRef, useEffect } from "react";
import { TerminalLine } from "@/core/terminal/types";
import TerminalOutput from "./TerminalOutput";
import TerminalInput from "./TerminalInput";
import { parseInput } from "@/core/terminal/parser";
import { findCommand } from "@/core/terminal/commands";
import { THEMES } from "@/core/terminal/themes";
import {
	print,
	printError,
	printPre,
	printSubtle,
} from "@/core/terminal/output";
import { APP_VERSION, BOOT_ART } from "@/core/terminal/constants";
import { suggestCommand } from "@/core/terminal/utils/suggest";
import { handleContactFlow } from "@/core/terminal/interactive/contactFlow";

type Ctx = {
	appendLine: (node: React.ReactNode) => void;
	theme: keyof typeof THEMES;
	clear?: () => void;
	setTheme?: (t: keyof typeof THEMES) => void;
};

async function runBootSequence(ctx: Ctx) {
	await printPre(BOOT_ART, ctx, 10);
}

async function printWelcome(ctx: Ctx) {
	await print(
		[`Welcome to Sidharth's Terminal Resume v${APP_VERSION}`],
		ctx,
		0,
	);

	await print(
		[
			`Type 'man' to get started.`,
			`Type 'repo' to view the GitHub repository.`,
		],
		ctx,
		0,
	);
}

export default function Terminal() {
	// 🔹 STATE
	const [theme, setTheme] = useState<keyof typeof THEMES>("default");
	const [lines, setLines] = useState<TerminalLine[]>([]);
	const [history, setHistory] = useState<string[]>([]);
	const [historyIndex, setHistoryIndex] = useState<number | null>(null);
	const [booted, setBooted] = useState(false);
	const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
	const [interactive, setInteractive] = useState<{
		type: "contact" | null;
		step: number;
		data: any;
	} | null>(null);

	// 🔹 REFS
	const containerRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	// 🔹 HELPERS
	const appendLine = (content: React.ReactNode) => {
		setLines((prev) => [...prev, { id: crypto.randomUUID(), content }]);
	};

	const clear = () => setLines([]);

	const ctx: Ctx = { appendLine, theme };

	// 🔹 LOAD HISTORY
	useEffect(() => {
		const stored = localStorage.getItem("history");
		if (stored) setHistory(JSON.parse(stored));
	}, []);

	useEffect(() => {
		localStorage.setItem("history", JSON.stringify(history));
	}, [history]);

	// 🔹 LOAD THEME
	useEffect(() => {
		const saved = localStorage.getItem("theme") as keyof typeof THEMES;
		if (saved && THEMES[saved]) setTheme(saved);
	}, []);

	useEffect(() => {
		localStorage.setItem("theme", theme);
	}, [theme]);

	// 🔹 AUTO SCROLL
	useEffect(() => {
		containerRef.current?.scrollTo({
			top: containerRef.current.scrollHeight,
			behavior: "smooth",
		});
	}, [lines]);

	// 🔹 BOOT
	useEffect(() => {
		const hasBooted = sessionStorage.getItem("booted");

		(async () => {
			if (!hasBooted) {
				await runBootSequence(ctx);
				sessionStorage.setItem("booted", "true");
			}

			await printWelcome(ctx);
			setBooted(true);
		})();
	}, []);

	// 🔹 RENDER
	return (
		<div
			ref={containerRef}
			onClick={() => inputRef.current?.focus()}
			className={`h-screen w-full font-mono text-sm sm:text-base leading-relaxed p-3 sm:p-6 overflow-y-auto ${THEMES[theme].bg} ${THEMES[theme].text}`}
		>
			<div className="max-w-4xl mx-auto">
				<TerminalOutput lines={lines} />

				{booted && (
					<TerminalInput
						inputRef={inputRef as React.RefObject<HTMLInputElement>}
						theme={theme}
						history={history}
						historyIndex={historyIndex}
						setHistoryIndex={setHistoryIndex}
						hidePrompt={!!interactive}
						activeQuestion={activeQuestion}
						onSubmit={async (input) => {
							if (interactive?.type === "contact") {
								if (input === "__ESC__") {
									appendLine(
										<span className={THEMES[theme].error}>
											✖ Interaction cancelled.
										</span>,
									);

									setInteractive(null);
									setActiveQuestion(null);
									return;
								}

								await handleContactFlow({
									input,
									interactive,
									theme,
									appendLine,
									setInteractive,
									setActiveQuestion,
									setLines,
								});

								return;
							}

							appendLine(
								<div>
									<span className="opacity-60">
										{THEMES[theme].prompt}
									</span>{" "}
									{input}
								</div>,
							);

							if (input.trim()) {
								setHistory((prev) => [...prev, input].slice(-20));
								setHistoryIndex(null);
							}

							const { command, args } = parseInput(input);
							if (!command) return;

							const cmd = findCommand(command);
							const suggestion = suggestCommand(command);

							if (!cmd) {
								await printError(`command not found: ${command}`, ctx);

								if (suggestion) {
									await printSubtle(
										`Did you mean: ${suggestion} ?`,
										ctx,
									);
								}

								return;
							}

							await cmd.execute(args, {
								appendLine,
								clear,
								setTheme,
								theme,
								setInteractive,
								setActiveQuestion,
							});
						}}
					/>
				)}
			</div>
		</div>
	);
}
