## NAME

`ban` - ban members from a guild

## SYNOPSIS

`ban target [--cleanup] [--reason reason]` 

## DESCRIPTION

Bans a member from the guild. Specifically, adds the user to the ban list. The user is removed from the guild and cannot rejoin in any way whatsoever.

## OPTIONS

`--cleanup`: Deletes the last 7 days of messages from the user.

`--reason reason`: The reason for the ban. If not specified, the reason will be "Unspecified".

## EXAMPLES

`/ban target=@user`: Bans the user from the guild.

`/ban target=@user cleanup=True reason="Example reason"`: Bans the user, supplies a ban reason and performs cleanup.

## SEE ALSO

`/kick`: A softer alternative to banning, only removing a member from a guild.

## HISTORY

`ban` was introduced in TSentinel 0.0.1.

## BUGS

`target` might accept a user ID instead of a mention. This might cause the bot to look for that ID in the guild, which might fail.