import { Command } from "./types";
import { repoCommand } from "./commands/repo";
import { themeCommand } from "./commands/theme";
import { clearCommand } from "./commands/clear";
import { manCommand } from "./commands/man";
import { aboutCommand } from "./commands/resume/about";
import { projectsCommand } from "./commands/resume/projects";
import { skillsCommand } from "./commands/resume/skills";
import { experienceCommand } from "./commands/resume/experience";
import { socialsCommand } from "./commands/resume/socials";
import { educationCommand } from "./commands/resume/education";
import { achievementsCommand } from "./commands/resume/achievements";
import { resumeCommand } from "./commands/resume/resume";
import { contactCommand } from "./commands/contact";
import { askCommand } from "./commands/ask";

export const COMMANDS: Command[] = [
	clearCommand,
	themeCommand,
	manCommand,
	repoCommand,
	aboutCommand,
	projectsCommand,
	skillsCommand,
	experienceCommand,
	educationCommand,
	achievementsCommand,
	socialsCommand,
	resumeCommand,
	contactCommand,
	askCommand,
];

export function findCommand(name: string): Command | undefined {
	return COMMANDS.find(
		(cmd) => cmd.name === name || cmd.aliases?.includes(name),
	);
}
