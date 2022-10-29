## NAME

`purge` - Purge messages from a channel

## SYNOPSIS

`purge [--amount amount] [--target target] [--keyword keyword] [--reason reason]`

## DESCRIPTION

Purge messages from a channel. Messages are purged based on the options specified. If no options are specified, you will
receive a precaution before letting the entire channel matches and will be deleted. Messages older than 14 days cannot
be deleted.

## OPTIONS

`--amount amount`: The maximum amount of messages to delete. Please note that this does not dictate how many messages
the bot **will delete**, but it will tell the bot _how many to delete until_. This option must be lower than 100.

`--target target`: The target whose messages are to be deleted.

`--keyword keyword`: The keyword to search for in messages. Worded otherwise, messages that **contain the keyword** is
purged. Please note that this is **NOT a regex**, as this command has been implemented to only use the
method `String.prototype.includes(keyword)`.

`--reason reason`: The reason for the purge. If not specified, the reason will be "Unspecified".

`--invert`: Whether to invert the search. If this option is specified, the filter will be inverted, so all the messages
that **do not** match the filter **will be deleted.** By default, this option is `false`.

`--silent`: Whether to send a message to the channel after the purge. By default, this option is `false`. Using this
option will cause a precaution to be sent before the purge.

`--force`: Whether to force the purge. By default, this option is `false`. Using this option will cause a precaution to
be sent before the purge.

`--help`: Show this help message.

## EXAMPLES

`/purge target=@user`: Purges all messages from a user

`/purge keyword="abc" amount=100`: Purges up to 100 messages that contain the word "abc"

## HISTORY

`purge` was introduced in TSentinel 0.0.1.

## BUGS

`purge` might accept a user ID instead of a mention. This might cause the bot to look for that ID in the guild, which
might fail.
