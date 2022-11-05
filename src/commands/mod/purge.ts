import { ButtonComponent, Discord, Slash, SlashOption } from "discordx";
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
	WebhookEditMessageOptions,
} from "discord.js";
import { EdgeCaseState, PurgeConfiguration } from "../types.js";
import { noParametersProvided } from "../../util/precheck.js";
import {
	createErrorEmbed,
	createInfoEmbed,
	createSuccessEmbed,
	createWarningEmbed,
} from "../../util/embed.js";
import pluralize from "pluralize";
import { selectOnceButton, tryDeferring } from "../../util/operation.js";

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
	//prettier-ignore
	/**
	 * A map of channels to their respective edge case purge configurations.
	 * This is only used to store edge case purge configurations. Do not put
	 * any other configurations in here.
	 */
	edgeCasePurgeStates: Map<TextChannel, PurgeConfiguration>
		= new Map<TextChannel, PurgeConfiguration>();

	/**
	 * Internal method.
	 * Purges messages.
	 *
	 * @param amount
	 * @param target
	 * @param keyword
	 * @param reason
	 * @param invert
	 * @param interaction
	 */
	@Slash({
		name: "purge",
		description: "Purges messages from a channel",
		defaultMemberPermissions: PermissionsBitField.Flags.ManageMessages,
	})
	async purge(
		@SlashOption({
			name: "amount",
			description: "The maximum amount of messages to purge",
			type: ApplicationCommandOptionType.Integer,
			minValue: 1,
			maxValue: 100,
			required: false,
		})
		amount: number | undefined,
		@SlashOption({
			name: "target",
			description: "The target to purge messages from",
			type: ApplicationCommandOptionType.User,
			required: false,
		})
		target: GuildMember | undefined,
		@SlashOption({
			name: "keyword",
			description: "The keyword to purge messages that contain it",
			type: ApplicationCommandOptionType.String,
			minLength: 1,
			maxLength: 1000,
			required: false,
		})
		keyword: string | undefined,
		@SlashOption({
			name: "reason",
			description: "The reason for purging messages",
			type: ApplicationCommandOptionType.String,
			required: false,
		})
		reason: string | undefined,
		@SlashOption({
			name: "invert",
			description: "Whether to invert the filter specified",
			type: ApplicationCommandOptionType.Boolean,
			required: false,
		})
		invert: boolean | undefined,
		interaction: CommandInteraction
	): Promise<void> {
		await interaction.deferReply();
		const config: PurgeConfiguration = {
			channel: interaction.channel as TextChannel,
			replyId: (await interaction.fetchReply()).id,
			interactor: interaction.user,
			invert: invert ?? false,
			amount: amount,
			target: target,
			keyword: keyword,
			reason: reason,
		};
		if (this.isEdgeCase(config).isEdgeCase) {
			await this.handleEdgeCases(interaction, config);
		} else {
			await this.purgeAction(config, false, interaction, null);
		}
	}

	/**
	 * Checks if a purge configuration is an edge case.
	 * @param config
	 */
	isEdgeCase(config: PurgeConfiguration): EdgeCaseState {
		let edgeCaseMessage: string | undefined;
		const { amount, target, keyword, invert } = config;
		if (noParametersProvided([amount, target, keyword])) {
			edgeCaseMessage = invert
				? "That does nothing! You can't invert the filter if you don't specify one!"
				: "With no arguments, this command will delete all messages in the channel that are less than two weeks old!";
		} else if (!noParametersProvided([target, keyword]) && invert) {
			edgeCaseMessage =
				"Inverting the filter while also specifying the target and/or keyword " +
				"can potentially target a lot of messages!";
		}

		return {
			isEdgeCase: typeof edgeCaseMessage !== "undefined",
			warningMessage: edgeCaseMessage,
		};
	}

	/**
	 * Handles edge cases, by sending a precaution if the configuration is an
	 * edge case.
	 * @param interaction
	 * @param config
	 */
	async handleEdgeCases(
		interaction: CommandInteraction,
		config: PurgeConfiguration
	): Promise<void> {
		const edgeCaseState = this.isEdgeCase(config);
		this.edgeCasePurgeStates.set(
			interaction.channel as TextChannel,
			config
		);
		edgeCaseState.warningMessage +=
			"\nDo you still want to follow through with the operation?";
		await interaction.editReply({
			components: [responseButtons()],
			embeds: [
				createWarningEmbed(edgeCaseState.warningMessage!).setFooter({
					text: "This is a one-time choice.",
				}),
			],
		});
	}

	/**
	 * The actual deletion of the /purge command.
	 * @param config
	 */
	async purgeDelete(config: PurgeConfiguration): Promise<number> {
		const { channel, amount, target, keyword, invert } = config;
		const twoWeeksAgo = new Date();
		twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
		// prettier-ignore
		const messages = (await channel.messages.fetch({limit: 100})).filter((message) =>
			message.deletable
			&& message.createdAt > twoWeeksAgo
			&& message.id !== config.replyId
		);

		// prettier-ignore
		const messagesMatchingFilter = messages.filter((message) =>
			(!target || message.author.id === target.id)
			&& (!keyword || message.content.includes(keyword))
		);

		// prettier-ignore
		const purgelist = invert
			? messages.filter((message) => !messagesMatchingFilter.has(message.id))
			: messagesMatchingFilter;

		const purgeAmount = amount
			? Math.min(amount, purgelist.size)
			: purgelist.size;

		await channel.bulkDelete(purgelist.first(purgeAmount));
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
		const { channel, invert, amount, target, keyword, reason } = config;
		const purgedCount = await this.purgeDelete(config);

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
						inline: true,
					},
					{
						name: "Amount",
						value: purgedCount.toString(),
						inline: true,
					},
					{
						name: "Target",
						value: target ? target.toString() : "None",
						inline: true,
					},
					{
						name: "Keyword",
						value: keyword ?? "None",
					},
					{
						name: "Channel",
						value: channel.toString(), // eslint-disable-line @typescript-eslint/no-base-to-string
					},
					{
						name: "Reason",
						value: reason ?? "Unspecified",
					},
				]),
			],
		};
		if (fromForcePurge) {
			aftermath.embeds!.push(
				createInfoEmbed(
					"Okay, *here goes nothing*.",
					"You have chosen to proceed with the purge operation."
				)
			);
			aftermath.components = [
				selectOnceButton(
					responseButtons(),
					0,
					"Proceeded.",
					ButtonStyle.Success
				),
			];
			await forcePurgeButtonInteraction!.editReply(aftermath); // skipcq: JS-0349
		} else {
			await safePurgeCommandInteraction!.editReply(aftermath); // skipcq: JS-0349
		}
	}

	/**
	 * Handles the button for proceeding with an edge case purge.
	 * @param interaction
	 */
	@ButtonComponent({ id: "forcePurge" })
	async confirmPurge(interaction: ButtonInteraction): Promise<void> {
		try {
			const channel = interaction.channel as TextChannel;
			const edgeCasePurgeState = this.edgeCasePurgeStates.get(channel)!;
			if (interaction.user.id !== edgeCasePurgeState.interactor.id) {
				await tryDeferring(interaction, { ephemeral: true });
				await interaction.editReply({
					embeds: [
						createErrorEmbed(
							"Hey! Only the person who initiated the purge operation can proceed with it.",
							`You are not the person who initiated the purge operation: ${edgeCasePurgeState.interactor.toString()}`,
							"Please ask them to confirm the operation."
						),
					],
				});
			} else {
				await interaction.deferUpdate();
				await this.purgeAction(
					edgeCasePurgeState,
					true,
					null,
					interaction
				);
				this.edgeCasePurgeStates.delete(channel);
			}
		} catch (e) {} // skipcq: JS-0009
		// In case the Sentinel instance is reset and the purge state is lost.
	}

	/**
	 * Handles the button for cancelling an edge case purge.
	 * @param interaction
	 */
	@ButtonComponent({ id: "cancelPurge" })
	async cancelPurge(interaction: ButtonInteraction): Promise<void> {
		try {
			const originalInteractor = this.edgeCasePurgeStates.get(
				interaction.channel as TextChannel
			)!.interactor;
			if (interaction.user.id !== originalInteractor.id) {
				await tryDeferring(interaction, { ephemeral: true });
				await interaction.editReply({
					embeds: [
						createErrorEmbed(
							"Hey! Only the person who initiated the purge operation can cancel it.",
							`You are not the person who initiated the purge operation: ${originalInteractor.toString()}`,
							"Please ask them to cancel the operation."
						),
					],
				});
			} else {
				await interaction.deferUpdate();
				await interaction.editReply({
					components: [
						selectOnceButton(
							responseButtons(),
							1,
							"Cancelled.",
							ButtonStyle.Success
						),
					],
					embeds: [
						createInfoEmbed(
							"That was a close one.",
							"You have chosen to not follow through with the purge operation."
						),
					],
				});
			}
		} catch (e) {} // skipcq: JS-0009
		// Check comment on line 250
	}
}
