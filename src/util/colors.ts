/**
 * Converts the hexadecimal color string to a tuple of three numbers that correspond
 * to the RGB values.
 *
 * @param   hex The hexadecimal color string
 * @returns The RGB values
 */
export function convertHexToRGB(hex: string): [number, number, number] {
	return [
		parseInt(hex.slice(1, 3), 16),
		parseInt(hex.slice(3, 5), 16),
		parseInt(hex.slice(5, 7), 16)
	];
}

/**
 * A simple palette that covers most use cases of the bot.
 */
export const palette = {
	successEmbedColor: "#34d000",
	warningEmbedColor: "#d9a600",
	errorEmbedColor: "#ff6969",
	infoEmbedColor: "#00baff"
};