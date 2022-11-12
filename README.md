<div>
  <p align="center">
      <img src="https://i.imgur.com/zUKsSHE.png" width="600"/>
  <p align="center">
    <b> A satisfactory moderation solution for server owners! </b>
  </p>
</div>

# 📖 Sentinel (Bodyguard)

An experimental utilitarian and administration assistant for Discord server owners written in TypeScript.

## 🛡 Preamble

This bot aims to be an all-in-one solution for server owners, providing a variety of utilities and administration tools
to make server management easier. These features, whether implemented or on the roadmap, are listed below:

-   Moderation tool suite: Commands, infraction system, censorship, and more.
-   Raid prevention and verification.
-   Server management tools: Customizable welcome messages, auto-role, etc.
-   A revolutionary, intuitive and convenient way to manage the server through Groups.
-   Other features: Key guild data & visualizations, fun commands, and more!

More advanced features are expected to diverge into Sentinel Guardian.

## 🔧 Languages, Tools & Frameworks:

-   [Node.js](https://nodejs.org/en/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Discord.js](https://discord.js.org/#/)
-   [DiscordX](https://discordx.js.org/)

## 🤔 About...

### ✅ Branding

Sentinel is a brand name - **NOT THIS PRODUCT'S NAME**. This repository and the product associated with it is planned to
diverge into Sentinel Guardian and **be renamed** into Sentinel Bodyguard in 2024. Until then, "Sentinel" and " Sentinel
Bodyguard" are still suitable names for this product.

### 🪪 Licensing

This project is licensed under a custom license made only for this bot. While it is not possible to redistribute the
code of this bot, we highly encourage you to clone this repository, make changes and improvements, and even self-host
your own instance of Sentinel Bodyguard.

### 💻 Contributing

Please feel free to make changes, improvements, and fixes to this repository. We are always open to new ideas ~~and are
planning to have a strike in mid-2024~~. Please make sure to follow the [Code of Conduct](CODE-OF-CONDUCT.md) before
making a pull request.

### 💂 Bodyguard & 🛡 Guardian

Sentinel Bodyguard is planned to be kind of like a "Home Version", while Sentinel Guardian is expected to be a "Pro" or
"Enterprise Version" of sorts. **IMPORTANT:** Despite what "Enterprise" sounds like, it will be completely free to use,
with a few requirements before using it. Sentinel Guardian is expected to be closed-source, however.

## 🧮 Setup

### 📲 Prerequisites

-   [Node.js](https://nodejs.org/en/) (preferably `v18.*`, as it has been tested) (required to even run this project)
-   [Git](https://git-scm.com/downloads) (optional for cloning and developing - you can download the repository as a ZIP
    file otherwise)
-   [A Discord application and bot token](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)
-   [A MongoDB cluster](https://www.mongodb.com/) (required)

### 📥 Installation

1. Download the ZIP file for this repository, or `git clone` it.
2. Run `npm install` to install the dependencies.
3. Create a `.env` file in the root directory of the project, and add the following:

```env
DISCORD_BOT_TOKEN=your-bot-token
MONGO_URI=your-mongo-uri
```

4. Run `npm run exec` to run the project.

---

Copyright (C) 2022 - Kisuzume & developer-ramen
