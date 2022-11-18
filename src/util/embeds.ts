import { ColorResolvable, Colors, EmbedBuilder } from "discord.js";

/**
 * Creates an embed with the specified text.
 *
 * @param category
 * @param description
 * @param color
 */
function createEmbed(description: string, color: ColorResolvable): EmbedBuilder {
	return new EmbedBuilder().setDescription(description).setColor(color).setTimestamp(new Date());
}

/**
 * Creates an embed with the specified error cause and hint.
 *
 * @param description
 * @param cause
 * @param hint
 */
export function createErrorEmbed(description: string, cause: string, hint: string | null): EmbedBuilder {
	return createEmbed(description, Colors.Red)
		.setTitle("**Error!**")
		.addFields([
			{ name: "Cause", value: cause, inline: false },
			{ name: "Hint", value: hint ?? "No hints provided", inline: false },
		]);
}

/**
 * Creates an embed with the specified warning.
 *
 * @param warning
 */
export function createWarningEmbed(warning: string): EmbedBuilder {
	return createEmbed(warning, Colors.Gold).setTitle("*Warning!*");
}

/**
 * Creates an embed with the specified success message.
 *
 * @param success
 */
export function createSuccessEmbed(success: string): EmbedBuilder {
	return createEmbed(success, Colors.Green).setTitle("Success!");
}

/**
 * Creates an embed with the specified information.
 *
 * @param title
 * @param info
 */
export function createInfoEmbed(title: string, info: string): EmbedBuilder {
	return createEmbed(info, Colors.Blurple).setTitle(title);
}
