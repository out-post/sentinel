import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonInteraction,
	ButtonStyle,
	CommandInteraction,
	InteractionDeferReplyOptions,
} from "discord.js";

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
