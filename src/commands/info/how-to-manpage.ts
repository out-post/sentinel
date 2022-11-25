import { Discord, Slash, SlashOption } from "discordx";
import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { readFileSync } from "fs";

@Discord()
export class HowToManpage {
	@Slash({
		name: "how-to-manpage",
		description: "I see how it is."
	})
	async howToManpage(
		@SlashOption({
			name: "broadcast",
			description: "Whether to broadcast the output to the current channel",
			type: ApplicationCommandOptionType.Boolean,
			required: false
		})
		broadcast = false,
		interaction: CommandInteraction
	): Promise<void> {
		await interaction.reply({
			ephemeral: !broadcast,
			content: readFileSync("res/manpages/how-to-manpage.md", "utf-8")
		});
	}
}