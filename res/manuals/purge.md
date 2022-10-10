## NAME

`purge` - Purge messages from a channel

## SYNOPSIS

`purge [--amount amount] [--target target] [--keyword keyword] [--reason reason]`

## DESCRIPTION

Purge messages from a channel. Messages are purged based on the options specified. If no options are specified, the entire channel matches and will be deleted. Messages older than 14 days cannot be deleted.

## OPTIONS

`--amount amount`: The maximum amount of messages to delete. Please note that this does not dictate how many messages the bot **will delete**, but it will tell the bot _how many to delete until_. If `amount > 100`, messages will be `bulkDelete`d in chunks of 100.

`--target target`: The target whose messages are to be deleted.

`--keyword keyword`: The keyword to search for in messages. Worded otherwise, messages that **contain the keyword** is purged. Please note that this is **NOT a regex**, as this command has been implemented to only use the method `String.prototype.includes(keyword)`.

`--reason reason`: The reason for the purge. If not specified, the reason will be "Unspecified".

## EXAMPLES

`/purge target=@user`: Purges all messages from a user

`/purge keyword="abc" amount=1000`: Purges up to 1000 messages that contain the word "abc"

## HISTORY

`purge` was introduced in TSentinel 0.0.1.

## BUGS

`kick` might accept a user ID instead of a mention. This might cause the bot to look for that ID in the guild, which might fail.