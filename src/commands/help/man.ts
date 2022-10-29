import { ApplicationCommandOptionType, CommandInteraction, EmbedBuilder } from "discord.js";
import { Discord, Slash, SlashChoice, SlashOption } from "discordx";
import { createErrorEmbed, createInfoEmbed } from "../../util/embed.js";
import { getAllManpageStrings, getManpage } from "../../util/manpages.js";

@Discord()
export class Man {
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
		interaction: CommandInteraction
	): Promise<void> {
		await interaction.deferReply({ ephemeral: true });
		let response: EmbedBuilder;
		if (!getAllManpageStrings().includes(command)) {
			response = createErrorEmbed(
				`Invalid command for TSentinel: ${command}`,
				"You might have mistyped the command, or the command might not exist.",
				"Choose one command from the autocomplete list."
			);
		} else {
			response = createInfoEmbed("Command", `**Command:** ${command}\n\n>>> ${getManpage(command)}`);
		}
		await interaction.editReply({ embeds: [response] });
	}
}
