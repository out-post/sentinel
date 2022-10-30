import {ApplicationCommandOptionType, CommandInteraction, GuildMember, PermissionsBitField} from "discord.js";
import {Discord, Slash, SlashOption} from "discordx";
import {Compare} from "../../util/compare.js";
import {createErrorEmbed, createInfoEmbed, createSuccessEmbed, createWarningEmbed} from "../../util/embed.js";
import {compareRoles} from "../../util/precheck.js";
import {getName} from "../../util/query.js";

@Discord()
export class Ban {
	@Slash({
		description: "Bans a user",
		name: "ban",
		defaultMemberPermissions: PermissionsBitField.Flags.BanMembers,
	})
	async ban(
		@SlashOption({
			name: "target",
			description: "The target to ban",
			type: ApplicationCommandOptionType.User,
			required: true,
		})
			target: GuildMember,
		@SlashOption({
			name: "cleanup",
			description: "Whether to cleanup messages from the banned user",
			type: ApplicationCommandOptionType.Boolean,
			required: true,
		})
			cleanup: boolean,
		@SlashOption({
			name: "reason",
			description: "The reason for the ban",
			type: ApplicationCommandOptionType.String,
			required: false,
		})
			reason: string | undefined,
		interaction: CommandInteraction
	): Promise<void> {
		await interaction.deferReply();

		const commander = interaction.member as GuildMember;
		reason = reason ?? "Unspecified";

		const embedArray = [];
		if (compareRoles(commander, target) === Compare.LARGER) {
			await target.ban(cleanup ? {reason: reason} : {deleteMessageDays: 7, reason: reason});

			embedArray.push(
				createSuccessEmbed(`Successfully banned ${getName(target.user)}.`).addFields([
					{name: "Reason", value: reason, inline: false},
				])
			);

			await target
				.send({
					embeds: [
						createInfoEmbed("Banned!", `You have been banned from ${interaction.guild!.name}.`)
							.setTitle("Banned! :hammer:")
							.addFields([{name: "Reason", value: reason, inline: true}])
							.setTimestamp(interaction.createdTimestamp),
					],
				})
				.then(() => {
					embedArray.push(
						createSuccessEmbed(`Target ${getName(target.user)} has been notified of their ban.`)
					);
				})
				.catch(() => {
					embedArray.push(
						createWarningEmbed(
							`Unable to DM ${target.displayName}. They will not be notified that they have been banned from this server.`
						)
					);
				});
		} else {
			embedArray.push(
				createErrorEmbed(
					`Failed to ban ${getName(target.user)}, because __you don't have enough permissions.__`,
					"_**Insufficient permissions**_: User's highest role is **smaller** than the target's highest role.",
					"Make sure **your** highest role is **larger than the target's** highest role. After all, you can't ban upwards, can you?"
				)
			);
		}

		await interaction.followUp({embeds: embedArray});
	}
}
