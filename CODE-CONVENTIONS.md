# Conventions

These are conventions that are being used in this project. If you are contributing to this project, please make sure to
follow these conventions.

## Instructions for local development

1. Clone the repository.
2. Run `npm install` to install all dependencies.
3. Create a `.env` file at the root of the project. This file will contain the following: 4. `DISCORD_BOT_TOKEN`: This
   is the token of the bot. You can get this token by creating a new application in the
   [Discord Developer Portal](https://discord.com/developers/applications). 5. `MONGODB_URI`: This is the URI of the
   MongoDB database. You can get this URI by creating a new cluster in the
   [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) website.
4. Run `npm run exec` to start the bot, or `npm run watch` to begin developing with `nodemon`.
5. Run `npm test` to test-watch the bot (provide a subcommand to let `vitest` know what mode you are in).

## File structure

-   The `res` folder contains all the **public** resources for the project.
-   The root folder contains all of the configuration files for the project.
-   The `src` folder contains all the source code for the project.
-   In the `src` folder:
    -   The `commands` folder contains all the commands that the bot can execute. Please create new commands here, and
        place the commands the appropriate subdirectory.
    -   The `events` folder contains all the events the bot registers. Please create new events here, and preferably,
        keep the directory structure flat.
    -   The `database` folder contains everything related to working with databases.
    -   The `utils` folder contains all the utility functions that are used throughout the project.

## While developing

-   Use `nodemon` to watch for changes in the code and restart the bot automatically.
-   Use `npm run lint` to lint the code and fix any errors that may be found.

## General code rules

-   Use **tabs** for indentation.
-   Use `const` and `let` instead of `var`.
-   `async`-`await` is preferred over `.then()` and `.catch()`.
-   Use `import` and `export` instead of `require` and `module.exports`.
-   Use `Prettier` for formatting, and ESLint for linting.
-   Please note that there are issues with the `indent` option for `ESLint`, so we have chosen to disable any warnings
    or errors for it.
-   When `git commit`ing, make sure to run `npm run pre-commit` to lint, reformat and test.
-   For general Markdown documents, please don't mind using your own formatting, since Prettier will go in and change it
    anyways.
-   Sign your commits! See [this gist](https://gist.github.com/Beneboe/3183a8a9eb53439dbee07c90b344c77e) for a quick and
    easy tutorial on signing.

## TypeScript & Type Annotating

We have a few requirements when it comes to annotating types:

-   Functions, methods, arguments, (maybe not) optional parameters, and collection types **must** be annotated.
-   Variables must be annotated if they are not initialized with a value.
-   If a variable is initialized with a value, it must be annotated or asserted if the type of the value is not obvious.
-   Type assertions use the `as` keyword over the `<>` syntax.
-   Never use `any`. When in doubt, please use `unknown`.
-   Shorthand when you can, but don't care too much about it. We disabled this rule for DeepSource already.
-   Use `interface` over `type` for object type definitions.
-   Always use template literals over string concatenation.
-   It is best to compare `typeof x` against `"undefined"` instead of `x === undefined`.

## Miscellaneous

-   Both Jest and Chai flavors are fine for Vitest, just be consistent with using them in your commits :D
-   When `import`ing from Lodash, use `from "lodash-es"`. Traditional `lodash` is CommonJS and uses the `require`
    syntax.
-   Try to utilize Lodash as much as possible, since if we had this big-ass library, why aren't we trying to use any of
    it? We didn't bother to import individual functions' packages, by the way.
-   About the `internal` folder: Whenever you feel like something can be tested (it is highly algorithmic or has
    multiple outcomes and such), use the `internal` folder to put all of the backend code in there.
-   Mirror the `src` folder's structure in the `internal` folder.

Happy coding!
