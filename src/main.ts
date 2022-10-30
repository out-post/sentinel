import { dirname, importx } from "@discordx/importer";
import { Client } from "discordx";
import { config as dotenvConfig } from "dotenv";
import "reflect-metadata";
import * as mongoose from "mongoose";

dotenvConfig();

export const bot = new Client({
	botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],
	intents: 32767,
	silent: false,
});

async function run() {
	await mongoose.connect(process.env.MONGODB_URI!).catch(console.error);
	await importx(`${dirname(import.meta.url)}/{events,commands}/**/*.{ts,js}`);
	void bot.login(process.env.DISCORD_BOT_TOKEN!, true);
}

void run();
