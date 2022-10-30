# Conventions

These are conventions that are being used in this project. If you are contributing to this project, please make sure to
follow these conventions.

## Instructions for setting up the project

1. Clone the repository.
2. Run `npm install` to install all dependencies.
3. Create a `.env` file at the root of the project. This file will contain the following:
    4. `DISCORD_BOT_TOKEN`: This is the token of the bot. You can get this token by creating a new application in the
       [Discord Developer Portal](https://discord.com/developers/applications).
    5. `MONGODB_URI`: This is the URI of the MongoDB database. You can get this URI by creating a new cluster in the
       [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) website.
6. Run `npm run exec` to start the bot, or `npm run watch` to begin developing with `nodemon`.

## File structure

- The `res` folder contains all the **public** resources for the project.
- The root folder contains all of the configuration files for the project.
- The `src` folder contains all the source code for the project.
- In the `src` folder:
    - The `commands` folder contains all the commands that the bot can execute. Please create new commands here, and
      place the commands the appropriate subdirectory.
    - The `events` folder contains all the events the bot registers. Please create new events here, and preferably, keep
      the directory structure flat.
    - The `database` folder contains everything related to working with databases.
    - The `utils` folder contains all the utility functions that are used throughout the project.

## While developing

- Use `nodemon` to watch for changes in the code and restart the bot automatically.
- Use `npm run lint` to lint the code and fix any errors that may be found.

## General code rules

- Use 4-space tabs for indentation.
- Use `const` and `let` instead of `var`.
- `async`-`await` is preferred over `.then()` and `.catch()`.
- Use `import` and `export` instead of `require` and `module.exports`.
- Use `Prettier` for formatting, and ESLint for linting.

## TypeScript & Type Annotating

We have a few requirements when it comes to annotating types:

- Functions, methods and arguments **must** be annotated.
- Variables must be annotated if they are not initialized with a value.
- If a variable is initialized with a value, it must be annotated if the type of the value is not obvious.
- Type assertions use the `<>` syntax, not the `as` keyword.
- Never use `any`. When in doubt, please use `unknown`.

Otherwise, happy coding!