import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { Discord, Slash } from "discordx";
import { getChangelog, getLatestVersionNumberWithChangelog } from "../../internal/changelog.js";
import { createInfoEmbed } from "../../util/embeds.js";

/**
 * Class for holding the /about command.
 */
@Discord()
export class About {
	/**
	 * Displays the changelog for the specified version.
	 *
	 * @param interaction
	 */
	@Slash({
		name: "about",
		description: "Displays general information about the bot"
	})
	async about(interaction: CommandInteraction): Promise<void> {
		const latestVersion = getLatestVersionNumberWithChangelog();
		await interaction.reply({
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
				)
			]
		});
	}
}
