import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { getChangelog, getLatestVersionNumber } from "../../internal/changelog.js";
import { createInfoEmbed } from "../../util/embeds.js";

/**
 * Class for holding the /about command.
 */
@Discord()
export class About {
	/**
	 * Displays the changelog for the specified version.
	 *
	 * @param broadcast
	 * @param interaction
	 */
	@Slash({
		name: "about",
		description: "Displays general information about the bot",
	})
	async about(
		@SlashOption({
			name: "broadcast",
			description: "Whether to broadcast the output to the current channel",
			type: ApplicationCommandOptionType.Boolean,
			required: false,
		})
		broadcast = false,
		interaction: CommandInteraction
	): Promise<void> {
		const latestVersion = getLatestVersionNumber();
		await interaction.reply({
			ephemeral: !broadcast,
			embeds: [
				createInfoEmbed(
					"About Sentinel",
					`
					A Discord bot for **moderation**, for _entertainment_, and for the __enjoyment and ease__ of using Discord,\
					bringing automated, reliable and customizable security to each and every Discord server.
				
					**Version:** ${latestVersion}

					**Developers:** [Developer Ramen](https://github.com/developer-ramen/) \
					& [Kisuzume (Kageroumaru)](https://github.com/kisuzume/)

					**Repository:** [GitHub](https://github.com/out-post/sentinel)

					**License:** [Sentinel-License](https://github.com/out-post/sentinel/blob/main/LICENSE)

					**Changelog:**\n>>> ${getChangelog(latestVersion)}
				`
				),
			],
		});
	}
}
