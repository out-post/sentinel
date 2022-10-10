## NAME

`kick` - kick members from a guild

## SYNOPSIS

`kick target [--reason reason]` 

## DESCRIPTION

Kicks a member from the guild. Specifically, removes the user from the guild.

## OPTIONS

`--cleanup`: Deletes the last 7 days of messages from the user.

`--reason reason`: The reason for the ban. If not specified, the reason will be "Unspecified".

## EXAMPLES

`/kick target=@user`: Kicks the user from the guild.

`/ban target=@user reason="Example reason"`: Kicks the user and supplies a kick reason.

## SEE ALSO

`/ban`: A harsher alternative to kicking, also preventing the user from ever re-entering the guild.

## HISTORY

`kick` was introduced in TSentinel 0.0.1.

## BUGS

`kick` might accept a user ID instead of a mention. This might cause the bot to look for that ID in the guild, which might fail.