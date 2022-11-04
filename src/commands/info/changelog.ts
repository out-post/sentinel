import {ApplicationCommandOptionType, CommandInteraction} from "discord.js";
import {Discord, Slash, SlashChoice, SlashOption} from "discordx";
import {getAllVersionStrings, getChangelog, getLatestVersionNumber,} from "../../util/changelogs.js";
import {createErrorEmbed, createInfoEmbed} from "../../util/embed.js";

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
		description: "Displays the changelog for the specified version",
	})
	async changelog(
		@SlashChoice(...getAllVersionStrings())
		@SlashOption({
			name: "version",
			description:
				"The version to display the changelog for. If not specified, the latest version will be used.",
			type: ApplicationCommandOptionType.String,
			required: false,
		})
		version: string | undefined,
		interaction: CommandInteraction
	): Promise<void> {
		await interaction.deferReply({ ephemeral: true });
		version = version ?? process.env.npm_package_version!;
		if (
			!getAllVersionStrings().includes(version) &&
			version !== getLatestVersionNumber()
		) {
			await interaction.editReply({
				embeds: [
					createErrorEmbed(
						`Invalid version for Sentinel: ${version}`, // skipcq: JS-0378
						"You might have mistyped the version, or the version might not exist.",
						"Choose one version from the autocomplete list."
					),
				],
			});
		} else {
			await interaction.editReply({
				embeds: [
					createInfoEmbed(
						"Changelog",
						// skipcq: JS-0378
						`**Version:** ${version}\n\n>>> ${getChangelog(
							version
						)}`
					),
				], // skipcq: JS-0378
			});
		}
	}
}
