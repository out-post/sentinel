import { ColorResolvable, Colors, EmbedBuilder } from "discord.js";
import { Category, getRandomMessage } from "./message.js";

/**
 * Creates an embed with the specified text.
 *
 * @param emoji
 * @param category
 * @param description
 * @param color
 */
function createEmbedWithRandomCategorizedTitle(
	emoji: string,
	category: Category,
	description: string,
	color: ColorResolvable
): EmbedBuilder {
	return new EmbedBuilder()
		.setTitle(`:${emoji}: ${getRandomMessage(category)}`)
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
export function createErrorEmbed(
	description: string,
	cause: string,
	hint: string | null
): EmbedBuilder {
	return createEmbedWithRandomCategorizedTitle(
		"x",
		"error",
		description,
		Colors.Red
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
		Colors.Gold
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
		Colors.Green
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
		Colors.Blurple
	).setTitle(`:information_source: ${title}`);
}
