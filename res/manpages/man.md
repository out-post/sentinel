## NAME

`man` - view a manpage

## SYNOPSIS

`man command:"", broadcast?:false`

## DESCRIPTION

Views a manpage for a command.

You might have noticed that this and the manpage system is an exact rendition of the UNIX `man` command and the manpage system. Well, you're _not wrong_...

## OPTIONS

`command:""`: The command to view the manpage of.

`broadcast?:false`: Send the manpage to the channel instead of sending it as an ephemeral message.

## EXAMPLES

`/man command:/purge`: Views the manpage for the `purge` command.

## HISTORY

`man` was introduced in Sentinel 0.0.2.
