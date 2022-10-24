import { dirname, importx } from "@discordx/importer";

await importx(`${dirname(import.meta.url)}/{events,commands}/**/*.{ts,js}`);

process.exit(0);