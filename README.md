<div>
  <p align="center">
      <img src="https://i.imgur.com/onuSpJZ.png" width="630"/>
  <p align="center">
    <b> A satisfactory moderation solution for server owners! </b>
  </p>
</div>

<p align="center">
<img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/out-post/sentinel/node.js.build.yml?logo=github&style=flat-square">
<img alt="GitHub issues" src="https://img.shields.io/github/issues/out-post/sentinel?logo=github&style=flat-square">

<img alt="DeepSource" title="DeepSource" src="https://deepsource.io/gh/out-post/sentinel.svg/?label=active+issues&show_trend=true&token=5QX3JPBP9sBcihXWIGbKZVD8"/>
<img alt="DeepSource" title="DeepSource" src="https://deepsource.io/gh/out-post/sentinel.svg/?label=resolved+issues&show_trend=true&token=5QX3JPBP9sBcihXWIGbKZVD8"/>

<img alt="Code Climate maintainability" src="https://img.shields.io/codeclimate/maintainability/out-post/sentinel?logo=codeclimate&style=flat-square">
<img alt="Code Climate issues" src="https://img.shields.io/codeclimate/issues/out-post/sentinel?logo=codeclimate&style=flat-square">
<img alt="Code Climate technical debt" src="https://img.shields.io/codeclimate/tech-debt/out-post/sentinel?logo=codeclimate&style=flat-square">
</p>

# 📖 Sentinel (Bodyguard)

An experimental utilitarian and administration assistant for Discord server owners written in TypeScript.

## 🛡 Preamble

This bot aims to be an all-in-one solution for server owners, providing a variety of utilities and administration tools
to make server management easier. These features, whether implemented or on the roadmap, are listed below:

- Moderation tool suite: Commands, infraction system, censorship, and more.
- Raid prevention and verification.
- Server management tools: Customizable welcome messages, auto-role, etc.
- A revolutionary, intuitive and convenient way to manage the server through Groups.
- Other features: Key guild data & visualizations, fun commands, and more!

More advanced features are expected to diverge into Sentinel Guardian.

## 🔧 Languages, Tools & Frameworks:

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Discord.js](https://discord.js.org/#/)
- [DiscordX](https://discordx.js.org/)

## 🤔 About...

### ✅ Branding

Sentinel is this product's name. Previously, Sentinel Bodyguard and Sentinel Guardian are two separate (but closely
related) entities, but now, Sentinel is the only suitable name to call this product, and Sentinel Bodyguard and Sentinel
Guardian will not be suitable names to call this product anymore.

### 🪪 Licensing

This project is licensed under a custom license made only for this bot. While it is possible to just redistribute the
code of this bot elsewhere, we highly encourage you to clone this repository, make changes and improvements, and even self-host
your own instance of Sentinel Bodyguard.

### 💻 Contributing

Please feel free to make changes, improvements, and fixes to this repository. We are always open to new ideas ~~and are
planning to have a strike in mid-2024~~. Please make sure to follow the [Code of Conduct](CODE-OF-CONDUCT.md) before
making a pull request.

## 🧮 Setup

### 📲 Prerequisites

- [Node.js](https://nodejs.org/en/) (preferably `v18.*`, as it has been tested) (required to even run this project)
- [Git](https://git-scm.com/downloads) (optional for cloning and developing - you can download the repository as a ZIP
  file otherwise)
- [A Discord application and bot token](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)
- [A MongoDB cluster](https://www.mongodb.com/) (required)

### 📥 Installation

1. Download the ZIP file for this repository, or `git clone` it.
2. Run `npm install` to install the dependencies.
3. Create a `.env` file in the root directory of the project, and add the following:

```env
DISCORD_BOT_TOKEN=your-bot-token
MONGODB_URI=your-mongo-uri
```

4. Run `npm run start` to run the project.

---

Copyright (C) 2022 - Kisuzume & developer-ramen
