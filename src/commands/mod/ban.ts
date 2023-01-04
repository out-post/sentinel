import {
	ApplicationCommandOptionType,
	CommandInteraction,
	EmbedBuilder,
	GuildMember,
	PermissionsBitField
} from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { Compare } from "../../util/compare.js";
import { createErrorEmbed, createInfoEmbed, createSuccessEmbed, createWarningEmbed } from "../../util/embeds.js";
import { compareRoles } from "../../util/prechecks.js";
import { UserOrMember } from "../types.js";

/**
 * Class for holding the /ban command.
 */
@Discord()
export class Ban {
	/**
	 * Bans a target.
	 *
	 * @param target
	 * @param cleanup
	 * @param notify
	 * @param reason
	 * @param interaction
	 */
	@Slash({
		description: "Bans a user",
		name: "ban",
		defaultMemberPermissions: PermissionsBitField.Flags.BanMembers
	})
	async ban(
		@SlashOption({
			name: "target",
			description: "The target to ban",
			type: ApplicationCommandOptionType.User,
			required: true
		})
			target: UserOrMember,
		@SlashOption({
			name: "cleanup",
			description: "Whether to cleanup messages from the banned user",
			type: ApplicationCommandOptionType.Boolean,
			required: true
		})
			cleanup: boolean,
		@SlashOption({
			name: "notify",
			description: "Send a DM to notify the target",
			type: ApplicationCommandOptionType.Boolean,
			required: true
		})
			notify: boolean,
		@SlashOption({
			name: "reason",
			description: "The reason for the ban",
			type: ApplicationCommandOptionType.String,
			required: false
		})
			reason = "<no reason specified>",
		interaction: CommandInteraction
	): Promise<void> {
		await interaction.deferReply();
		const embeds: EmbedBuilder[] = [];
		if (target instanceof GuildMember) {
			if (compareRoles(interaction.member as GuildMember, target) === Compare.LARGER) {
				embeds.push(createSuccessEmbed(`Successfully banned ${target.user.toString()}.`));

				if (notify) {
					await target
						.send({
							embeds: [
								createInfoEmbed(
									"Banned!",
									`You have been banned from ${interaction.guild!.name}!\nReason: ${reason}`
								)
							]
						})
						.then(() => {
							embeds.push(createSuccessEmbed(`Notified ${target.user.toString()} of their ban.`));
						})
						.catch(() => {
							embeds.push(
								createWarningEmbed(
									`Unable to DM ${target.toString()}. \
									They will not be notified of their ban from this server.`
								)
							);
						});
				}

				await target.ban({
					deleteMessageSeconds: cleanup ? 60 * 60 * 24 * 7 : undefined,
					reason
				});
			} else {
				embeds.push(
					createErrorEmbed(
						`Unable to ban ${target.user.toString()}.`,
						"Insufficient permissions: You can't ban a user that has a higher role than you!",
						"Make sure your highest role is larger than the target's highest role."
					)
				);
			}
		} else {
			embeds.push(
				createErrorEmbed(
					"You can't ban a user that isn't in the server!",
					`${target.toString()} isn't in the server!`,
					`Check if the user is actually in the server, though we do doubt that they are anyways. \
					If you manually typed out the user's ID, make sure that it's correct.`
				)
			);
		}
		await interaction.editReply({ embeds });
	}
}
