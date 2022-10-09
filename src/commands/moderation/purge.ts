import {
	ActionRowBuilder,
	ApplicationCommandOptionType,
	ButtonBuilder,
	ButtonInteraction,
	ButtonStyle,
	CommandInteraction,
	GuildMember,
	Message,
	PermissionsBitField,
	TextChannel
} from "discord.js";
import { ButtonComponent, Discord, Slash, SlashOption } from "discordx";
import pluralize from "pluralize";
import { createSuccessEmbed, createWarningEmbed } from "../../util/embed.js";
import { noParametersProvided } from "../../util/prechecks.js";

@Discord()
export class Purge {
	resultMessage: Message | undefined;
	commandInteraction: CommandInteraction | undefined;
	reason: string | undefined;

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
			minValue: 0,
			maxValue: Math.pow(10, 5),
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
			description: "The keyword to purge messages that contain it",
			type: ApplicationCommandOptionType.String,
			required: false
		})
			keyword: string | undefined,
		@SlashOption({
			name: "reason",
			description: "The reason for purging messages",
			type: ApplicationCommandOptionType.String,
			required: false
		})
			reason: string,
		interaction: CommandInteraction
	) {
		await interaction.deferReply();
		this.resultMessage = await interaction.fetchReply();
		this.commandInteraction = interaction;
		this.reason = reason;

		if (noParametersProvided([amount, target, keyword])) {
			await interaction.editReply({
				components: [
					new ActionRowBuilder<ButtonBuilder>().addComponents([
						new ButtonBuilder()
							.setCustomId("force-purge")
							.setLabel("Yes, proceed.")
							.setStyle(ButtonStyle.Danger),

						new ButtonBuilder()
							.setCustomId("cancel-purge")
							.setLabel("Oh, heavens no.")
							.setStyle(ButtonStyle.Primary)
					])
				],
				embeds: [
					createWarningEmbed(
						"No parameters were provided! \
						This means all messages match the purge filter and will be deleted!\n\
						Did you really want to purge the entire channel?"
					).setFooter({
						text: "Once you choose one of the below options, this embed will disappear."
					})
				]
			});
		} else {
			await this.purgeAction(
				<TextChannel>interaction.channel,
				amount,
				target,
				keyword,
				interaction,
				reason
			);
		}
	}

	async purgeDelete(
		channel: TextChannel,
		amount: number | undefined,
		target: GuildMember | undefined,
		keyword: string | undefined
	): Promise<number> {
		const messages = await channel.messages.fetch();

		const twoWeeksAgo = new Date();
		twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

		const purgelist = messages.filter(message => (
			(!target || message.author.id === target.id)
			&& (!keyword || message.content.includes(keyword))
			&& this.resultMessage?.id !== message.id
			&& message.createdAt > twoWeeksAgo
		));

		let purgeAmount: number;
		if (amount === undefined) {
			purgeAmount = purgelist.size;
		} else {
			purgeAmount = Math.min(amount, purgelist.size);
		}

		const slicedPurgelist = purgelist.first(purgeAmount);
		const partitionedPurgelist = [];
		for (let i = 0; i < slicedPurgelist.length; i += 100) {
			partitionedPurgelist.push(slicedPurgelist.slice(i, i + 100));
		}

		for (const partition of partitionedPurgelist) {
			await channel.bulkDelete(partition);
		}

		return purgeAmount;
	}

	@ButtonComponent({ id: "force-purge" })
	async forcePurge(interaction: ButtonInteraction): Promise<void> {
		await interaction.deferUpdate();
		await this.purgeAction(
			<TextChannel>interaction.channel,
			undefined,
			undefined,
			undefined,
			this.commandInteraction!,
			this.reason
		);
		await this.commandInteraction?.editReply({
			components: [],
			embeds: await this.commandInteraction?.fetchReply().then(reply => reply.embeds)
		});
	}

	@ButtonComponent({ id: "cancel-purge" })
	async cancelPurge(interaction: ButtonInteraction): Promise<void> {
		await this.commandInteraction?.deleteReply();
	}

	private async purgeAction(
		channel: TextChannel,
		amount: number | undefined,
		target: GuildMember | undefined,
		keyword: string | undefined,
		interaction: CommandInteraction,
		reason: string | undefined
	) {
		const purgedCount = await this.purgeDelete(channel, amount, target, keyword);

		let purgeMessage;
		if (purgedCount === 0) {
			purgeMessage = "No messages";
		} else if (amount && purgedCount < amount) {
			purgeMessage = `Only ${pluralize("message", purgedCount, true)}`;
		} else {
			purgeMessage = `${pluralize("message", purgedCount, true)}`;
		}
		purgeMessage += ` ${pluralize("was", purgedCount)} purged.`;

		await interaction.editReply({
			embeds: [
				createSuccessEmbed(purgeMessage)
					.addFields([
						{
							name: "Amount",
							value: purgedCount.toString(),
							inline: true
						},
						{
							name: "Channel",
							value: channel.toString(),
							inline: true
						},
						{
							name: "Target",
							value: target?.toString() ?? "None",
							inline: true
						},
						{
							name: "Keyword",
							value: keyword ?? "None",
							inline: true
						},
						{
							name: "Reason",
							value: reason ?? "Unspecified",
							inline: true
						}
					])
			]
		});
	}
}
