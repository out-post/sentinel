import { Category } from "@discordx/utilities";
import { ApplicationCommandOptionType, CommandInteraction, EmbedBuilder } from "discord.js";
import { Discord, Slash, SlashChoice, SlashOption } from "discordx";
import { createErrorEmbed, createInfoEmbed } from "../../util/embed.js";
import { getAllManpageStrings, getManpage } from "../../util/manpages.js";
import { ModularCategory } from "../types.js";

/**
 * Class for holding the /man command.
 */
@Discord()
@Category(ModularCategory.Information)
export class Man {
	/**
	 * Displays the manpage for the specified command.
	 *
	 * @param command
	 * @param broadcast
	 * @param interaction
	 */
	@Slash({
		name: "man",
		description: "Displays the manpage for the specified command",
	})
	async man(
		@SlashChoice(...getAllManpageStrings())
		@SlashOption({
			name: "command",
			description: "The command to get the manpage for",
			type: ApplicationCommandOptionType.String,
			required: true,
		})
		command: string,
		@SlashOption({
			name: "broadcast",
			description: "Whether to broadcast the output to the current channel",
			type: ApplicationCommandOptionType.Boolean,
			required: false,
		})
		broadcast = false,
		interaction: CommandInteraction
	): Promise<void> {
		await interaction.deferReply({ ephemeral: !broadcast });
		let response: EmbedBuilder;
		if (!getAllManpageStrings().includes(command)) {
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
