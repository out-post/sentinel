import { dirname, importx } from "@discordx/importer";
import { Client } from "discordx";
import { config as dotenvConfig } from "dotenv";
import "reflect-metadata";

dotenvConfig();

const ALL_INTENTS_NUMBER = 32767;
export const bot = new Client({
	botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],
	intents: ALL_INTENTS_NUMBER,
	silent: false
});

async function run() {
	await importx(dirname(import.meta.url) + "/{events,commands}/**/*.{ts,js}");
	bot.login(process.env.DISCORD_BOT_TOKEN!, true)
		.then(() => console.log("Logged in!"))
		.catch(console.error);
}

run();
