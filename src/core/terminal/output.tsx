import { THEMES } from "./themes";

type OutputCtx = {
	appendLine: (node: React.ReactNode) => void;
	theme: keyof typeof THEMES;
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function print(lines: string[], ctx: OutputCtx, delay = 20) {
	for (const line of lines) {
		ctx.appendLine(<div className={THEMES[ctx.theme].text}>{line}</div>);
		await sleep(delay);
	}
}

export async function printAccent(text: string, ctx: OutputCtx) {
	ctx.appendLine(<div className={THEMES[ctx.theme].accent}>{text}</div>);
}

export async function printSubtle(text: string, ctx: OutputCtx) {
	ctx.appendLine(<div className={THEMES[ctx.theme].subtle}>{text}</div>);
}

export async function printError(text: string, ctx: OutputCtx) {
	ctx.appendLine(<div className={THEMES[ctx.theme].error}>error: {text}</div>);
}

export async function printDivider(ctx: OutputCtx) {
	ctx.appendLine(
		<div className={`${THEMES[ctx.theme].subtle} select-none`}>
			────────────────────────────────
		</div>,
	);
}

export async function printKeyValue(
	key: string,
	value: string,
	ctx: OutputCtx,
) {
	ctx.appendLine(
		<div>
			<span className={THEMES[ctx.theme].accent}>{key}:</span>{" "}
			<span className={THEMES[ctx.theme].text}>{value}</span>
		</div>,
	);
}

// old

export async function printLink(label: string, url: string, ctx: OutputCtx) {
	ctx.appendLine(
		<a href={url} target="_blank" className={`${THEMES[ctx.theme].accent}`}>
			{label}
		</a>,
	);
}

export async function printLinkLine(key: string, url: string, ctx: OutputCtx) {
	ctx.appendLine(
		<div>
			<span className={THEMES[ctx.theme].accent}>{key}:</span>{" "}
			<a
				href={url}
				target="_blank"
				rel="noopener noreferrer"
				className={`${THEMES[ctx.theme].accent}`}
			>
				{url}
			</a>
		</div>,
	);
}

export async function printPre(lines: string[], ctx: OutputCtx, delay = 10) {
	for (const line of lines) {
		ctx.appendLine(
			<pre
				className={`${THEMES[ctx.theme].text} font-mono leading-tight whitespace-pre`}
			>
				{line}
			</pre>,
		);
		await new Promise((r) => setTimeout(r, delay));
	}
}
