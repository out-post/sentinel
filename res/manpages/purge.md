## NAME

`purge` - Purge messages from a channel

## SYNOPSIS

`purge amount?:123, target?:@usr, keyword?:"", suppress?:false, reason?:"Unspecified", invert?:y/n`

## DESCRIPTION

Purge messages from a channel. Messages are purged based on the options specified. If no options are specified, you will receive a precaution before letting the entire channel matches and will be deleted. Messages older than 14 days cannot be deleted.

## OPTIONS

`amount?:123`: The maximum amount of messages to delete. Please note that this does not dictate how many messages the bot **will delete**, but it will tell the bot _how many to delete until_. This option must be lower than 100.

`target?:@usr`: The target whose messages are to be deleted.

`keyword?:""`: The keyword to search for in messages. Worded otherwise, messages that **contain the keyword** is purged. Please note that this is **NOT a regex**, as this command has been implemented to only use the method `String.prototype.includes(keyword)`.

`suppress?:false`: Suppress all output.

`reason?:"Unspecified"`: The reason for the purge. If not specified, the reason will be "Unspecified".

`invert?:y/n`: Whether to invert the search. If this option is specified, the filter will be inverted, so all the messages that **do not** match the filter **will be deleted.** By default, this option is `false`.

## EXAMPLES

`/purge target:@user`: Purges all messages from a user

`/purge keyword:"abc" amount:100`: Purges up to 100 messages that contain the word "abc".

## HISTORY

`purge` was introduced in Sentinel 0.0.1.

## BUGS

`purge` might accept a user ID instead of a mention. This might cause the bot to look for that ID in the guild, which might fail.
