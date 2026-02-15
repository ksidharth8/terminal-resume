import { THEMES } from "../themes";

type ContactFlowArgs = {
	input: string;
	interactive: any;
	theme: keyof typeof THEMES;
	appendLine: (node: React.ReactNode) => void;
	setInteractive: (value: any) => void;
	setActiveQuestion: (value: string | null) => void;
	setLines: React.Dispatch<any>;
};

export async function handleContactFlow({
	input,
	interactive,
	theme,
	appendLine,
	setInteractive,
	setActiveQuestion,
	setLines,
}: ContactFlowArgs) {
	if (!interactive) return;

	const { step, data } = interactive;
	const accent = THEMES[theme].accent;
	const subtle = THEMES[theme].subtle;
	const err = THEMES[theme].error;

	const replaceLastLine = (node: React.ReactNode) => {
		setLines((prev: any[]) => {
			const copy = [...prev];
			copy[copy.length - 1] = {
				...copy[copy.length - 1],
				content: node,
			};
			return copy;
		});
	};

	const validateName = (name: string) =>
		name.trim().length < 2 ? "Name must be at least 2 characters." : null;

	const validateEmail = (email: string) =>
		/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
			? null
			: "Please enter a valid email address.";

	const validateMessage = (message: string) =>
		message.trim().length < 10
			? "Message must be at least 10 characters."
			: null;

	// STEP 0 — Name
	if (step === 0) {
		const error = validateName(input);
		if (error) {
			appendLine(<span className={err}>✖ {error}</span>);
			return;
		}

		appendLine(
			<span>
				<span className={accent}>? Name:</span> {input}
			</span>,
		);

		setInteractive({ type: "contact", step: 1, data: { name: input } });
		setActiveQuestion("? Email:");
		return;
	}

	// STEP 1 — Email
	if (step === 1) {
		const error = validateEmail(input);
		if (error) {
			appendLine(<span className={err}>✖ {error}</span>);
			return;
		}

		appendLine(
			<span>
				<span className={accent}>? Email:</span> {input}
			</span>,
		);

		setInteractive({
			type: "contact",
			step: 2,
			data: { ...data, email: input },
		});

		setActiveQuestion("? Message:");
		return;
	}

	// STEP 2 — Message
	if (step === 2) {
		const error = validateMessage(input);
		if (error) {
			appendLine(<span className={err}>✖ {error}</span>);
			return;
		}

		appendLine(
			<span>
				<span className={accent}>? Message:</span> {input}
			</span>,
		);

		setInteractive({
			type: "contact",
			step: 3,
			data: { ...data, message: input },
		});

		setActiveQuestion("? Confirm send? (y/n)");
		return;
	}

	// STEP 3 — Confirm
	if (step === 3) {
		const isYes = input.toLowerCase() === "y";

		appendLine(
			<span>
				<span className={accent}>? Confirm send?</span>{" "}
				{isYes ? "Yes" : "No"}
			</span>,
		);

		setActiveQuestion(null);

		if (!isYes) {
			appendLine(<span className={err}>✖ Cancelled.</span>);
			setInteractive(null);
			return;
		}

		appendLine(<span className={subtle}>Sending...</span>);

		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			if (!res.ok) throw new Error();

			replaceLastLine(
				<span className={accent}>✔ Message sent successfully.</span>,
			);

			setInteractive({ type: "contact", step: 4, data });
			setActiveQuestion("? Connect on LinkedIn? (y/n)");
		} catch {
			replaceLastLine(
				<span className={err}>
					✖ Unable to send message. Please try again later.
				</span>,
			);

			setInteractive(null);
		}

		return;
	}

	// STEP 4 — LinkedIn
	if (step === 4) {
		const isYes = input.toLowerCase() === "y";

		appendLine(
			<span>
				<span className={accent}>? Connect on LinkedIn?</span>{" "}
				{isYes ? "Yes" : "No"}
			</span>,
		);

		if (isYes) {
			window.open("https://www.linkedin.com/in/ksidharth8/", "_blank");
			appendLine(
				<span className={accent}>Opening LinkedIn profile...</span>,
			);
		} else {
			appendLine(
				<span className={subtle}>No problem. Have a great day!</span>,
			);
		}

		setInteractive(null);
		setActiveQuestion(null);
	}
}
