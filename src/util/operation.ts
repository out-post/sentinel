import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonInteraction,
	ButtonStyle,
	CommandInteraction,
	InteractionDeferReplyOptions,
} from "discord.js";

export function disableAllButtons(buttons: ActionRowBuilder<ButtonBuilder>): typeof buttons {
	buttons.components.forEach((button) => button.setDisabled(true));
	return buttons;
}

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
export async function tryDeferring(
  interaction: CommandInteraction | ButtonInteraction,
  options: InteractionDeferReplyOptions
): Promise<void> {
  try {
    await interaction.deferReply(options);
  } catch (e) {  // skipcq: JS-0009
  }
// To be used when you are not sure if the interaction has already been deferred
}
