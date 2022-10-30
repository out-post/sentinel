[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE-OF-CONDUCT.md)

---

# Code of Conduct

This is the code of conduct in which contributors must follow when contributing to this repository. This code of conduct
is based on the [Contributor Covenant](https://www.contributor-covenant.org/), version 2.0.

## Specifications

We request that you keep in sync with our project the following:

- File structure: **Unless** your new feature and/or contribution is large and feels like it would
  be better suited in its own folder, we request that you keep the same file structure elsewhere.


- Tools: **Unless** your feature and/or contribution requires a new tool, we request that you keep the same
  tooling as the rest of the project and as specified below. If your new feature requires usage of a new tool, or of the
  database, please be
  prepared to explain why you think it is necessary.
  Tools that are being employed in this project are:
    - [Node.js](https://nodejs.org/en/). Please make sure to keep your `node` versions and `npm` packages up to date. If
      breaking changes are found just when your pull request is submitted, we will make sure to work with you in order
      to update your code to the latest version.
    - [TypeScript](https://www.typescriptlang.org/). Please make sure to follow conventions found throughout the project
      as well as in the [Code Conventions](CODE-CONVENTIONS.md) file.
    - **_discord.js_** and **_DiscordX_**. For these tools, if you submitted a pull request and it is found that there
      has been a new update to the tool, or it
      requires a new version of either of these tools, we will make sure to work with you in order to update your code
      to
      the latest version.
    - [ESLint](https://eslint.org/). Please make sure use ESLint to validate your code. If you are using VSCode, we
      recommend using the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
      .
      If you are using another editor, please make sure to use a plugin that supports ESLint.
    - [Prettier](https://prettier.io/). Please make sure to use Prettier to format your code. If you are using VSCode,
      we
      recommend using
      the [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).
      If you are using another editor, please make sure to use a plugin that supports Prettier.
    - The above two plugins can be used in tandem with the command `npm run lint`. Before committing, please make sure
      to run this command and fix any errors that may be found.


- Configuration files, and the `res` folder: Please do **not** change them without purpose.

Otherwise, happy coding!