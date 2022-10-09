import { EmbedBuilder } from "discord.js";
import { convertHexToRGB, palette } from "./colors.js";
import { Category, getRandomMessage } from "./message.js";

/**
 * Creates an embed with the specified text.
 *
 * @param emoji
 * @param category
 * @param description
 * @param color
 * @param footnote
 */
function createEmbedWithRandomCategorizedTitle(
	emoji: string,
	category: Category,
	description: string,
	color: string
): EmbedBuilder {
	return new EmbedBuilder()
		.setTitle(`:${emoji}: ${getRandomMessage(category)}`)
		.setDescription(description)
		.setColor(convertHexToRGB(color))
		.setTimestamp(new Date());
}

/**
 * Creates an embed with the specified error cause and hint.
 *
 * @param description
 * @param cause
 * @param hint
 */
export function createErrorEmbed(
	description: string,
	cause: string,
	hint: string | null
): EmbedBuilder {
	return createEmbedWithRandomCategorizedTitle(
		"x",
		"error",
		description,
		palette.errorEmbedColor
	).addFields([
		{ name: "Cause", value: cause, inline: true },
		{ name: "Hint", value: hint ?? "No hints provided", inline: true }
	]);
}

/**
 * Creates an embed with the specified warning.
 *
 * @param warning
 */
export function createWarningEmbed(
	warning: string
): EmbedBuilder {
	return createEmbedWithRandomCategorizedTitle(
		"warning",
		"warning",
		warning,
		palette.warningEmbedColor
	);
}

/**
 * Creates an embed with the specified success message.
 *
 * @param success
 */
export function createSuccessEmbed(
	success: string
): EmbedBuilder {
	return createEmbedWithRandomCategorizedTitle(
		"white_check_mark",
		"success",
		success,
		palette.successEmbedColor
	);
}

/**
 * Creates an embed with the specified information.
 *
 * @param title
 * @param info
 */
export function createInfoEmbed(
	title: string,
	info: string
): EmbedBuilder {
	return createEmbedWithRandomCategorizedTitle(
		"information_source",
		"placeholder",
		info,
		palette.infoEmbedColor
	).setTitle(`:information_source: ${title}`);
}
