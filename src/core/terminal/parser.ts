export function parseInput(input: string) {
	const parts = input.trim().split(/\s+/);
	const command = parts[0];
	const args = parts.slice(1);
	return { command, args };
}
