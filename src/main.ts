import { dirname, importx } from "@discordx/importer";
import { Client } from "discordx";
import { config as dotenvConfig } from "dotenv";
import { connect } from "mongoose";
import "reflect-metadata";

dotenvConfig();

export const bot = new Client({
	botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],
	intents: 32767,
	silent: false,
});

void (async () => {
	await connect(process.env.MONGODB_URI!);
	await importx(`${dirname(import.meta.url)}/{events,commands}/**/*.{ts,js}`);
	void bot.login(process.env.DISCORD_BOT_TOKEN!);
})();
