import { dirname, importx } from "@discordx/importer";
import { Client } from "discordx";
import { config as dotenvConfig } from "dotenv";
import "reflect-metadata";

dotenvConfig();

export const bot = new Client({
	botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],
	intents: 32767,
	silent: false,
});

async function run() {
	await importx(`${dirname(import.meta.url)}/{events,commands}/**/*.{ts,js}`);
	bot.login(process.env.DISCORD_BOT_TOKEN!, true);
}

run();
