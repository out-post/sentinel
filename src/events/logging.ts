import { bot } from "../main.js";

bot.on("error", console.error);
bot.on("warn", console.warn);
bot.on("debug", console.info);
