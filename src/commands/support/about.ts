import { CommandInteraction } from "discord.js";
import { Discord, Slash } from "discordx";
import { blockquoteChangelog, getChangelog } from "../../util/changelog.js";
import { createInfoEmbed } from "../../util/embed.js";

@Discord()
export class About {
	@Slash({
		name: "about",
		description: "Displays general information about the bot"
	})
	async about(interaction: CommandInteraction) {
		const latestVersion = <string>process.env.npm_package_version;
		await interaction.reply({
			embeds: [
				createInfoEmbed("About", `
					A Discord bot for **moderation**, for _entertainment_, and for the __enjoyment and ease__ of using Discord.
				
					**Version:** ${latestVersion}

					**Developer:** [Developer Ramen](https://github.com/developer-ramen/)

					**Repository:** [GitHub](https://github.com/developer-ramen/tsentinel.git)

					**License:** [MIT](https://opensource.org/licenses/MIT)

					**Changelog:**\n${blockquoteChangelog(getChangelog(latestVersion))}
				`)
			]
		});
	}
}