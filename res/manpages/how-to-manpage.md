# Manpages 101

_(not the unix kind btw)_

## What is a manpage?

In Unix, a manpage is a document that explains how to use a program/binary. Using the `man` command with the name of a
program/binary, for example, `cat` will open the relevant manpage associated with it. It covers most general information
about the command, as well as documents the entirety of a command's functionality and options/flags. It is a very useful
tool for learning how to use a command, and for reference.

Example for `man cat`:

![Man Command Demonstration](man-demonstration.gif)

## Why manpages?

Manpages' level of technicality, we think, suits that of Discord moderation. Conversely, they are meant to be easy to
read and reason with, since we require manpages to be written with extreme care and attention to vocabulary.

## How do I manpage?

Refer to the [official Unix guide on manpages](https://linux.die.net/man/7/man-pages), but the guide below will take
precedence before this.

Manpages are written in Markdown, and are stored in the `res/manpages` folder. The file name is the command name, and
the file extension is `.md`.

## Manpage sections

These sections listed below are required, or is highly recommended if specified otherwise. When you can, please follow
the order in which these sections are introduced.

### 1. `NAME`

This is where you list the command's name and give a **very concise** one-liner on what the command does.

### 2. `SYNOPSIS`

This is where you show the command's syntax. It is a very important section, as it is the first thing a user will see
when they view the manpage.

In an attempt to mimic how Unix does command syntax, but make it more intuitive for different command option types that
Discord provides, the syntax should be written in the following format:

1. Begin with `/<command-name>`.
2. List the command's options/flags with the syntax `option`, if any:

|  Data Type   | Description                                            | Syntax        |
| :----------: | :----------------------------------------------------- | :------------ |
|  `boolean`   | A boolean option that can contain either True or False | `option:y/n`  |
|   `string`   | A string option                                        | `option:""`   |
|   `number`   | A number option                                        | `option:123`  |
|    `user`    | A user option                                          | `option:@usr` |
|    `role`    | A role option                                          | `option:@rol` |
|  `channel`   | A channel option                                       | `option:#cnl` |
| `attachment` | An attachment                                          | `option:att`  |
| `subcommand` | A subcommand                                           | `subcommand`  |

3. If the option is, well, optional, then you should add a question mark before the equal sigh, like so: `option?:...`
4. Fill in the `...` if there is a default value attached to that parameter, instead of the notation above. 5. Make it
   **obvious** what type that option is. For example, if the option is a user, then you should use `@user` instead of
   `user` or `@usr`. Or maybe, an option might take a string, and by default it is `"123"`, but you wrote `123`. This is
   confusing, and you should avoid doing this.
5. If the command has no options/flags, you can simply write `/<command-name>`.
6. At the end of every parameter, add a comma and space (not if it is the last parameter in the list).

Note: Replace the `option` with the actual option name, except for the `subcommand` type, where the syntax is to
literally type out the word `subcommand`.

Refer to the rest of the `manpages` directory for examples.

### 3. `DESCRIPTION`

This is where you give a more detailed description of the command. It is recommended to just go into detail about what
the command does, and general requirements/side effects of the command.

### 4. `OPTIONS`

This is where you list the command's options/flags, and explain what they entail. The options' data type can be inferred
from this guide and the `SYNOPSIS` section, but it is recommended to list the options in the same order as the syntax,
and to list the options in the same order as the syntax.

### 5. `EXAMPLES`

This is where you list examples of the command's usage. It is recommended to list at least one example, and use options
that are associated with the command. Also recommended that you include combinations of arguments and options that might
cause special/unexpected behavior and bugs.

### 6. `SEE ALSO`

This is where you list other commands that are related to the command. This section is highly recommended, but optional.

### 7. `HISTORY`

This is where you list the command's history. It is recommended to list the version of the command's creation, and any
major changes that has happened to the command.

### 8. `BUGS`

This is where you list any known bugs with the command. It is recommended to be very clear with what the bug does, and
how to avoid it.

The manpage can include any other sections if required.

Happy writing manpages!
