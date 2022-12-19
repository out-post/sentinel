import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonInteraction,
	ButtonStyle,
	CommandInteraction,
	EmbedBuilder,
	InteractionDeferReplyOptions,
} from "discord.js";
import { createWarningEmbed } from "./embeds.js";

/**
 * Disables all buttons in a button row.
 * @param buttons
 */
export function disableAllButtons(buttons: ActionRowBuilder<ButtonBuilder>): typeof buttons {
	buttons.components.forEach((button) => button.setDisabled(true));
	return buttons;
}

/**
 * Emulates a single-use button row when selected.
 * @param buttons
 * @param selectedButtonIndex
 * @param selectedText
 * @param selectedStyle
 */
export function selectOnceButton(
	buttons: ActionRowBuilder<ButtonBuilder>,
	selectedButtonIndex: number,
	selectedText: string,
	selectedStyle?: ButtonStyle
): typeof buttons {
	disableAllButtons(buttons);
	buttons.components[selectedButtonIndex].setLabel(selectedText);
	if (selectedStyle) {
		buttons.components[selectedButtonIndex].setStyle(selectedStyle);
	}
	return buttons;
}

// prettier-ignore
/**
 * Quickly try-catches a deferReply() call.
 * To be used when you are not sure if the interaction has already been deferred.
 * @param interaction
 * @param options
 */
export async function tryDeferring(
	interaction: CommandInteraction | ButtonInteraction,
	options: InteractionDeferReplyOptions
): Promise<void> {
	try {
		await interaction.deferReply(options);
	} catch (e) {
	} // skipcq: JS-0009
}

/**
 * Default reply editing execution for suppressing output.
 * @param interaction
 * @param suppress
 * @param embeds
 */
export async function editReplyIfSuppressed(
	interaction: CommandInteraction | ButtonInteraction,
	suppress: boolean,
	embeds: EmbedBuilder[]
): Promise<void> {
	// prettier-ignore
	await interaction.editReply({
		embeds: suppress
			? [ createWarningEmbed(
				`All output has been disabled for this command execution. \
				You will not see any results, warnings, or errors, even if they occur.`
			) ]
			: embeds,
	});
}
