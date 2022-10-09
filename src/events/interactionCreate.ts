import { Interaction } from "discord.js";
import { bot } from "../main.js";

bot.on("interactionCreate", (interaction: Interaction) => {
	bot.executeInteraction(interaction);
});
