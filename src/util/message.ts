import { readdirSync, readFileSync } from "fs";

const files: string[] = readdirSync("res/messages");
export type Category = "ban" | "error" | "warning" | "success" | "info";
export const messages: Record<string, string[]> = {};

for (const file of files) {
	messages[file.split(".")[0]] = readFileSync(`res/messages/${file}`, "utf-8").split("\n");
}

/**
 * Gets a random message from the specified category.
 *
 * @param category
 */
export function getRandomMessage(category: Category): string {
	return messages[category][Math.floor(Math.random() * messages[category].length)];
}
