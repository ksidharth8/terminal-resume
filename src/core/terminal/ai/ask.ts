export async function askAI(question: string) {
	const res = await fetch("/api/ask", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ question }),
	});

	if (!res.ok) {
		throw new Error("AI request failed");
	}

	const data = await res.json();
	return data.answer;
}
