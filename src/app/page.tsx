import Terminal from "@/components/terminal/Terminal";

export default function Home() {
	return (
		<>
			<noscript>
				<div>
					<h1>Sidharth Kumar — Software Developer</h1>
					<p>Interactive terminal-style resume.</p>
					<a href="/resume.pdf">Download Resume</a>
				</div>
			</noscript>
			<Terminal />
		</>
	);
}
