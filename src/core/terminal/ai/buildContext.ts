import profile from "@/data/profile.json";
import projects from "@/data/projects.json";
import skills from "@/data/skills.json";
import education from "@/data/education.json";
import experience from "@/data/experience.json";
import achievements from "@/data/achievements.json";

export function buildResumeContext() {
	return `
=== PROFILE ===
name: ${profile.name}
role: ${profile.role}
location: ${profile.location}
phone: ${profile.phone}
email: ${profile.email}
summary: ${profile.summary}
links: ${Object.entries(profile.links)
		.map(([k, v]) => `${k}: ${v}`)
		.join(" | ")}

=== EDUCATION ===
${education
	.map(
		(e) => `
institution: ${e.institution}
degree: ${e.degree}
duration: ${e.duration}
score: ${e.score}
`,
	)
	.join("\n")}

=== PROJECTS ===
${projects
	.map(
		(p) => `
name: ${p.name}
status: ${p.status}
one_liner: ${p.oneLiner}
description: ${p.description}
highlights: ${p.highlights.join(" | ")}
tech: ${p.tech.join(", ")}
live: ${p.live}
repo: ${p.repo}
${p.npm ? `npm: ${p.npm}` : ""}
`,
	)
	.join("\n")}

=== SKILLS ===
${Object.entries(skills)
	.map(([k, v]) => `${k}: ${(v as string[]).join(", ")}`)
	.join("\n")}

=== EXPERIENCE ===
${experience
	.map(
		(e) => `
title: ${e.title}
organization: ${e.organization}
duration: ${e.duration}
description: ${e.description.join(" | ")}
`,
	)
	.join("\n")}

=== ACHIEVEMENTS ===
${achievements
	.map(
		(a) => `
title: ${a.title}
details: ${a.details}
`,
	)
	.join("\n")}
`;
}
