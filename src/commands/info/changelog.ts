import { Category } from "@discordx/utilities";
import { ApplicationCommandOptionType, CommandInteraction, EmbedBuilder } from "discord.js";
import { Discord, Slash, SlashChoice, SlashOption } from "discordx";
import { getAllVersionStrings, getChangelog, getLatestVersionNumber } from "../../util/changelogs.js";
import { createErrorEmbed, createInfoEmbed } from "../../util/embed.js";
import { ModularCategory } from "../types.js";

/**
 * Class for holding the /changelog command.
 */
@Discord()
@Category(ModularCategory.Information)
export class Changelog {
	/**
	 * Displays the changelog for the specified version.
	 *
	 * @param version
	 * @param broadcast
	 * @param interaction
	 */
	@Slash({
		name: "changelog",
		description: "Displays the changelog for the specified version",
	})
	async changelog(
		@SlashChoice(...getAllVersionStrings())
		@SlashOption({
			name: "version",
			description: "The version to display the changelog for. If not specified, the latest version will be used.",
			type: ApplicationCommandOptionType.String,
			required: false,
		})
		version: string = process.env.npm_package_version!,
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
		if (!getAllVersionStrings().includes(version) && version !== getLatestVersionNumber()) {
			response = createErrorEmbed(
				`Invalid version for Sentinel: ${version}`, // skipcq: JS-0378
				"You might have mistyped the version, or the version might not exist.",
				"Choose one version from the autocomplete list."
			);
		} else {
			response = createInfoEmbed(
				"Changelog",
				// skipcq: JS-0378
				`**Version:** ${version}\n\n>>> ${getChangelog(version)}`
			);
		}
		await interaction.editReply({ embeds: [response] });
	}
}
