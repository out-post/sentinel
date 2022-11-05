import {
	ApplicationCommandOptionType,
	CommandInteraction,
	GuildMember,
	PermissionsBitField,
} from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { Compare } from "../../util/compare.js";
import {
	createErrorEmbed,
	createInfoEmbed,
	createSuccessEmbed,
} from "../../util/embed.js";
import { compareRoles } from "../../util/precheck.js";
import { getName } from "../../util/query.js";

/**
 * Class for holding the /kick command.
 */
@Discord()
export class Kick {
	/**
	 * Kicks a user.
	 *
	 * @param target
	 * @param reason
	 * @param interaction
	 */
	@Slash({
		defaultMemberPermissions: PermissionsBitField.Flags.KickMembers,
		description: "Kicks a user",
		name: "kick",
	})
	async kick(
		@SlashOption({
			name: "target",
			description: "The target to kick",
			type: ApplicationCommandOptionType.User,
			required: true,
		})
		target: GuildMember,
		@SlashOption({
			name: "reason",
			description: "The reason for the kick",
			type: ApplicationCommandOptionType.String,
			required: false,
		})
		reason = "Unspecified",
		interaction: CommandInteraction
	): Promise<void> {
		await interaction.deferReply();
		const commander = interaction.member as GuildMember;
		const embedArray = [];

		if (compareRoles(commander, target) === Compare.LARGER) {
			await target.send({
				embeds: [
					createInfoEmbed(
						"Kicked!",
						`You have been kicked from ${interaction.guild!.name}.`
					)
						.setTitle("Kicked! :mans_shoe:")
						.addFields([
							{ name: "Reason", value: reason, inline: true },
						])
						.setTimestamp(interaction.createdTimestamp),
				],
			});

			await target.kick(reason);

			embedArray.push(
				createSuccessEmbed(
					`Successfully kicked ${getName(target.user)}.`
				).addFields([{ name: "Reason", value: reason, inline: false }])
			);
		} else {
			embedArray.push(
				createErrorEmbed(
					`Failed to kick ${getName(
						target.user
					)}, because __you don't have enough permissions.__`,
					"_**Insufficient permissions**_: User's highest role is **smaller** than the target's highest role.",
					"Make sure **your** highest role is **larger than the target's** highest role." +
						" How would kicking upwards even work logistically?"
				)
			);
		}

		await interaction.followUp({ embeds: embedArray });
	}
}
