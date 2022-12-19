import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { cleanWhitespace } from "../../internal/regexes.js";

/**
 * Class for holding the /how-to-manpage command.
 */
@Discord()
export class HowToManpage {
	/**
	 * The /how-to-manpage command.
	 * @param broadcast
	 * @param interaction
	 */
	@Slash({
		name: "how-to-manpage",
		description: "Displays information on how to read, write and make sense of manpages.",
	})
	async howToManpage(
		@SlashOption({
			name: "broadcast",
			description: "Whether to broadcast the output to the current channel",
			type: ApplicationCommandOptionType.Boolean,
			required: false,
		})
		broadcast = false,
		interaction: CommandInteraction
	): Promise<void> {
		await interaction.reply({
			ephemeral: !broadcast,
			content: cleanWhitespace(
				"Head here: [Manpages 101](https://github.com/out-post/sentinel/blob/main/res/manpages/how-to-manpage.md)"
			),
		});
	}
}
