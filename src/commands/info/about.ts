import { CommandInteraction } from "discord.js";
import { Discord, Slash } from "discordx";
import { getChangelog } from "../../util/changelogs.js";
import { createInfoEmbed } from "../../util/embed.js";

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
		description: "Displays general information about the bot",
	})
	async about(interaction: CommandInteraction): Promise<void> {
		const latestVersion = process.env.npm_package_version!;
		await interaction.reply({
			embeds: [
				createInfoEmbed(
					"About",
					`
					A Discord bot for **moderation**, for _entertainment_, and for the __enjoyment and ease__ of using Discord.
				
					**Version:** ${latestVersion}

					**Developer:** [Developer Ramen](https://github.com/developer-ramen/)

					**Repository:** [GitHub](https://github.com/developer-ramen/sentinel.git)

					**License:** [Sentinel-License](https://github.com/developer-ramen/sentinel/blob/main/LICENSE)

					**Changelog:**\n>>> ${getChangelog(latestVersion)}
				`
				),
			],
		});
	}
}
