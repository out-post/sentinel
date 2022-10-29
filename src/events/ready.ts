import { ActivityType } from "discord.js";
import { bot } from "../main.js";

bot.once("ready", async () => {
	await bot.guilds.fetch();
	await bot.initApplicationCommands();

	bot.user!.setPresence({
		activities: [{ name: "over the server", type: ActivityType.Watching }],
		status: "online",
	});
});
