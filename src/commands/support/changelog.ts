import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { Discord, Slash, SlashChoice, SlashOption } from "discordx";
import { blockquoteChangelog, getAllVersionStrings, getChangelog } from "../../util/changelog.js";
import { createErrorEmbed, createInfoEmbed, createWarningEmbed } from "../../util/embed.js";

@Discord()
export class Changelog {
	@Slash({
		name: "changelog",
		description: "Displays the changelog for the specified version"
	})
	async changelog(
		@SlashChoice(...getAllVersionStrings())
		@SlashOption({
			name: "version",
			description: "The version to display the changelog for",
			type: ApplicationCommandOptionType.String,
			required: false
		})
			version: string | undefined,
		interaction: CommandInteraction
	) {
		await interaction.deferReply({ ephemeral: true});
		let embedArray = [];
		if (version === undefined) {
			version = <string>process.env.npm_package_version;
			embedArray.push(
				createWarningEmbed("No arguments for `version` was provided, defaulting to the latest version.")
			);
		} else if (!getAllVersionStrings().includes(version)) {
			embedArray.push(createErrorEmbed(
				`Invalid version for TSentinel: ${version}`,
				"You might have mistyped the version, or the version might not exist.",
				"Choose one version from the autocomplete list."
			));
			return;
		}
		embedArray.push(
			createInfoEmbed(
				`Viewing changelog for version ${version}`,
				`**Version:** ${version}\n\n${blockquoteChangelog(getChangelog(version))}`
			)
		);
		await interaction.editReply({ embeds: embedArray });
	}
}