import {
	ActionRowBuilder,
	ApplicationCommandOptionType,
	ButtonBuilder,
	ButtonInteraction,
	ButtonStyle,
	CommandInteraction,
	GuildMember,
	PermissionsBitField,
	TextChannel,
	WebhookEditMessageOptions
} from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import pluralize from "pluralize";
import { purgeFilter } from "../../internal/purge.js";
import { createInfoEmbed, createSuccessEmbed, createWarningEmbed } from "../../util/embeds.js";
import { selectOnceButton } from "../../util/operations.js";
import { PurgeConfiguration } from "../types.js";

// prettier-ignore
/**
 * Function for constructing a row of response buttons used in precaution embeds.
 */
function responseButtons(): ActionRowBuilder<ButtonBuilder> {
	return new ActionRowBuilder<ButtonBuilder>().addComponents([
		new ButtonBuilder()
			.setCustomId("forcePurge")
			.setLabel("Yes, still proceed.")
			.setStyle(ButtonStyle.Danger),

		new ButtonBuilder()
			.setCustomId("cancelPurge")
			.setLabel("Oh, heavens no.")
			.setStyle(ButtonStyle.Primary)
	]);
}

/**
 * Class for holding the /purge command.
 */
@Discord()
export class Purge {
	/**
	 * Purges messages.
	 *
	 * @param amount
	 * @param target
	 * @param keyword
	 * @param suppress
	 * @param reason
	 * @param invert
	 * @param interaction
	 */
	@Slash({
		name: "purge",
		description: "Purges messages from a channel",
		defaultMemberPermissions: PermissionsBitField.Flags.ManageMessages
	})
	async purge(
		@SlashOption({
			name: "amount",
			description: "The maximum amount of messages to purge",
			type: ApplicationCommandOptionType.Integer,
			minValue: 1,
			maxValue: 100,
			required: false
		})
			amount: number | undefined,
		@SlashOption({
			name: "target",
			description: "The target to purge messages from",
			type: ApplicationCommandOptionType.User,
			required: false
		})
			target: GuildMember | undefined,
		@SlashOption({
			name: "keyword",
			description: "The keyword to purge messages that contain it (case-insensitive)",
			type: ApplicationCommandOptionType.String,
			minLength: 1,
			maxLength: 1000,
			required: false
		})
			keyword: string | undefined,
		@SlashOption({
			name: "suppress",
			description: "Whether to suppress warning messages and output. False by default",
			type: ApplicationCommandOptionType.Boolean,
			required: false
		})
			suppress = false,
		@SlashOption({
			name: "reason",
			description: "The reason for purging messages",
			type: ApplicationCommandOptionType.String,
			required: false
		})
			reason = "<no reason specified>",
		@SlashOption({
			name: "invert",
			description: "Whether to invert the filter specified. False by default",
			type: ApplicationCommandOptionType.Boolean,
			required: false
		})
			invert = false,
		interaction: CommandInteraction
	): Promise<void> {
		await interaction.deferReply({ ephemeral: suppress });
		const config: PurgeConfiguration = {
			channel: interaction.channel as TextChannel,
			interactor: interaction.user,
			invert,
			suppress,
			reason,
			amount,
			target,
			keyword,
			replyId: suppress ? undefined : (await interaction.fetchReply()).id // skipcq JS-0127
		};
		if (suppress) {
			await interaction.editReply({
				embeds: [createWarningEmbed("All output has been disabled for this command execution.")]
			});
		}
		await this.purgeAction(config, false, interaction, null);
	}

	/**
	 * The actual deletion of the /purge command.
	 * @param config
	 */
	async purgeDelete(config: PurgeConfiguration): Promise<number> {
		const { channel } = config;
		let { amount } = config;
		amount ??= 100;

		const twoWeeksAgo = new Date();
		twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

		// prettier-ignore
		const messages = (await channel.messages.fetch({ limit: 100 })).filter((message) =>
			message.deletable
			&& message.createdAt > twoWeeksAgo
			&& message.id !== config.replyId
		);

		const purgeList = messages.filter((message) => purgeFilter(message, config));
		const purgeAmount = amount ? Math.min(amount, purgeList.size) : purgeList.size;
		await channel.bulkDelete(purgeList.first(purgeAmount));

		return purgeAmount;
	}

	/**
	 * Handles the purge deletion, and the relevant dialogs.
	 *
	 * @param config
	 * @param fromForcePurge
	 * @param safePurgeCommandInteraction
	 * @param forcePurgeButtonInteraction
	 */
	async purgeAction(
		config: PurgeConfiguration,
		fromForcePurge: boolean,
		safePurgeCommandInteraction: CommandInteraction | null,
		forcePurgeButtonInteraction: ButtonInteraction | null
	): Promise<void> {
		const { channel, invert, amount, target, keyword, suppress, reason } = config;
		await this.purgeDelete(config).then(async (purgedCount) => {
			if (!suppress) {
				let purgeMessage;
				if (purgedCount === 0) {
					purgeMessage = "No messages";
				} else if (amount && purgedCount < amount) {
					purgeMessage = `Only ${pluralize("message", purgedCount, true)}`;
				} else {
					purgeMessage = `${pluralize("message", purgedCount, true)}`;
				}
				purgeMessage += ` ${pluralize("was", purgedCount)} purged.`;

				const aftermath: WebhookEditMessageOptions = {
					embeds: [
						createSuccessEmbed(purgeMessage).addFields([
							{
								name: "Inverted?",
								value: invert ? "Yes" : "No",
								inline: true
							},
							{
								name: "Amount",
								value: purgedCount.toString(),
								inline: true
							},
							{
								name: "Target",
								value: target ? target.toString() : "None",
								inline: true
							},
							{
								name: "Keyword",
								value: keyword ?? "None"
							},
							{
								name: "Channel",
								value: channel.toString() // eslint-disable-line @typescript-eslint/no-base-to-string
							},
							{
								name: "Reason",
								value: reason
							}
						])
					]
				};
				if (fromForcePurge) {
					aftermath.embeds!.push(
						createInfoEmbed(
							"Okay, *here goes nothing*.",
							"You have chosen to proceed with the purge operation."
						)
					);
					aftermath.components = [selectOnceButton(responseButtons(), 0, "Proceeded.", ButtonStyle.Success)];
					await forcePurgeButtonInteraction!.editReply(aftermath); // skipcq: JS-0349
				} else {
					await safePurgeCommandInteraction!.editReply(aftermath); // skipcq: JS-0349
				}
			}
		});
	}
}
