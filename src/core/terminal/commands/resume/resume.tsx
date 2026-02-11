import profile from "@/data/profile.json";
import { Command } from "../../types";

export const resumeCommand: Command = {
	name: "resume",
	description: "Download resume",
	examples: ["resume", "ask Can I download his resume?"],
	async execute(_, ctx) {
		ctx.appendLine(
			<a
				href={profile.links.resume}
				target="_blank"
				className="text-green-400"
			>
				Download Resume (PDF)
			</a>,
		);
	},
};
