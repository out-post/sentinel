import { ApplicationCommandOptionType, CommandInteraction, EmbedBuilder } from "discord.js";
import { Discord, Slash, SlashChoice, SlashOption } from "discordx";
import { getAllManpageNames, getAllManpageNamesButFancy, getManpage } from "../../internal/manpage.js";
import { createErrorEmbed, createInfoEmbed } from "../../util/embeds.js";

/**
 * Class for holding the /man command.
 */
@Discord()
export class Man {
	/**
	 * Displays the manpage for the specified command.
	 *
	 * @param command
	 * @param interaction
	 */
	@Slash({
		name: "man",
		description: "Displays the manpage for the specified command"
	})
	async man(
		@SlashChoice(...getAllManpageNamesButFancy())
		@SlashOption({
			name: "command",
			description: "The command to get the manpage for",
			type: ApplicationCommandOptionType.String,
			required: true
		})
			command: string,
		interaction: CommandInteraction
	): Promise<void> {
		command = command.slice(1); // skipcq: JS-0083
		let response: EmbedBuilder;
		if (!getAllManpageNames().includes(command)) {
			response = createErrorEmbed(
				`Invalid command for Sentinel: ${command}`,
				"You might have mistyped the command, or the command might not exist.",
				"Choose one command from the autocomplete list."
			);
		} else {
			response = createInfoEmbed("Command", `**Command:** ${command}\n\n>>> ${getManpage(command)}`);
		}
		await interaction.editReply({ embeds: [response] });
	}
}
