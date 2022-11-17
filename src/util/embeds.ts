import { ColorResolvable, Colors, EmbedBuilder } from "discord.js";
import { Category, getRandomMessage } from "./messages.js";

/**
 * Creates an embed with the specified text.
 *
 * @param category
 * @param description
 * @param color
 */
function createEmbedWithRandomCategorizedTitle(
	category: Category | null,
	description: string,
	color: ColorResolvable
): EmbedBuilder {
	return new EmbedBuilder()
		.setTitle(category === null ? "placeholder" : getRandomMessage(category))
		.setDescription(description)
		.setColor(color)
		.setTimestamp(new Date());
}

/**
 * Creates an embed with the specified error cause and hint.
 *
 * @param description
 * @param cause
 * @param hint
 */
export function createErrorEmbed(description: string, cause: string, hint: string | null): EmbedBuilder {
	return createEmbedWithRandomCategorizedTitle("error", description, Colors.Red).addFields([
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
	return createEmbedWithRandomCategorizedTitle("warning", warning, Colors.Gold);
}

/**
 * Creates an embed with the specified success message.
 *
 * @param success
 */
export function createSuccessEmbed(success: string): EmbedBuilder {
	return createEmbedWithRandomCategorizedTitle("success", success, Colors.Green);
}

/**
 * Creates an embed with the specified information.
 *
 * @param title
 * @param info
 */
export function createInfoEmbed(title: string, info: string): EmbedBuilder {
	return createEmbedWithRandomCategorizedTitle(null, info, Colors.Blurple).setTitle(title);
}
