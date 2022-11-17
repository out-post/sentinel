import {
	ApplicationCommandOptionType,
	CommandInteraction,
	EmbedBuilder,
	GuildMember,
	PermissionsBitField,
} from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { Compare } from "../../util/compare.js";
import { createErrorEmbed, createInfoEmbed, createSuccessEmbed, createWarningEmbed } from "../../util/embeds.js";
import { editReplyIfSuppressed } from "../../util/operations.js";
import { compareRoles } from "../../util/prechecks.js";
import { UserOrMember } from "../types.js";

/**
 * Class for holding the /kick command.
 */
@Discord()
export class Kick {
	/**
	 * Kicks a target.
	 *
	 * @param target
	 * @param notify
	 * @param suppress
	 * @param reason
	 * @param interaction
	 */
	@Slash({
		name: "kick",
		description: "Kicks a user",
		defaultMemberPermissions: PermissionsBitField.Flags.KickMembers,
	})
	async kick(
		@SlashOption({
			name: "target",
			description: "The target to kick",
			type: ApplicationCommandOptionType.User,
			required: true,
		})
		target: UserOrMember,
		@SlashOption({
			name: "notify",
			description: "Send a DM to notify the target",
			type: ApplicationCommandOptionType.Boolean,
			required: true,
		})
		notify: boolean,
		@SlashOption({
			name: "suppress",
			description: "Whether to suppress output",
			type: ApplicationCommandOptionType.Boolean,
			required: false,
		})
		suppress = false,
		@SlashOption({
			name: "reason",
			description: "The reason for the kick",
			type: ApplicationCommandOptionType.String,
			required: false,
		})
		reason = "Unspecified",
		interaction: CommandInteraction
	): Promise<void> {
		await interaction.deferReply({ ephemeral: suppress });
		const embeds: EmbedBuilder[] = [];
		if (target instanceof GuildMember) {
			if (compareRoles(interaction.member as GuildMember, target) === Compare.LARGER) {
				embeds.push(createSuccessEmbed(`Successfully kicked ${target.user.toString()}.`));

				if (notify) {
					await target
						.send({
							embeds: [
								createInfoEmbed(
									"Kicked!",
									`You have been kicked from ${interaction.guild!.name}!\nReason: ${reason}`
								),
							],
						})
						.then(() => {
							embeds.push(createSuccessEmbed(`Notified ${target.user.toString()} of their kick.`));
						})
						.catch(() => {
							embeds.push(
								createWarningEmbed(
									`Failed to notify ${target.user.toString()} of their kick. \
									They will not be notified of their kick from this server.`
								)
							);
						});
				}

				await target.kick(reason);
			} else {
				embeds.push(
					createErrorEmbed(
						`Unable to kick ${target.user.toString()}`,
						"Insufficient permissions: You can't kick a user that has a higher role than you!",
						"Make sure your highest role is larger than the target's highest role."
					)
				);
			}
		} else {
			embeds.push(
				createErrorEmbed(
					"You can't kick a user that isn't in the server!",
					`${target.toString()} isn't in the server!`,
					`Check if the user is actually in the server, though we do doubt that they are anyways. \
				If you manually typed out the user's ID, make sure that it's correct.`
				)
			);
		}
		await editReplyIfSuppressed(interaction, suppress, embeds);
	}
}
