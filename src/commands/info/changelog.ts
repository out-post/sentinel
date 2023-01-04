import { ApplicationCommandOptionType, CommandInteraction, EmbedBuilder } from "discord.js";
import { Discord, Slash, SlashChoice, SlashOption } from "discordx";
import {
	getAllVersionNamesButFancy,
	getChangelog,
	getLatestVersionNumberWithChangelog
} from "../../internal/changelog.js";
import { createErrorEmbed, createInfoEmbed } from "../../util/embeds.js";

/**
 * Class for holding the /changelog command.
 */
@Discord()
export class Changelog {
	/**
	 * Displays the changelog for the specified version.
	 *
	 * @param version
	 * @param interaction
	 */
	@Slash({
		name: "changelog",
		description: "Displays the changelog for the specified version"
	})
	async changelog(
		@SlashChoice(...getAllVersionNamesButFancy())
		@SlashOption({
			name: "version",
			description: "The version to display the changelog for. If not specified, the latest version will be used.",
			type: ApplicationCommandOptionType.String,
			required: false
		})
			version: string = getLatestVersionNumberWithChangelog(),
		interaction: CommandInteraction
	): Promise<void> {
		await interaction.deferReply();
		let response: EmbedBuilder;
		if (!getAllVersionNamesButFancy().includes(version) && version !== getLatestVersionNumberWithChangelog()) {
			response = createErrorEmbed(
				`Invalid version for Sentinel: ${version}`, // skipcq: JS-0378
				"You might have mistyped the version, or the version might not exist.",
				"Choose one version from the autocomplete list."
			);
		} else {
			version = version.split(" ")[0]; // skipcq JS-0083
			response = createInfoEmbed(
				"Changelog",
				// skipcq: JS-0378
				`**Version:** ${version}\n\n>>> ${getChangelog(version)}`
			);
		}
		await interaction.editReply({ embeds: [response] });
	}
}
