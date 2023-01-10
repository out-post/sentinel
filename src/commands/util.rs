use crate::commands::{
	general::ping::Ping,
	Module,
	SlashCommand,
};

pub fn all_commands() -> Vec<Box<dyn SlashCommand>> {
	vec![Box::new(Ping)]
}

pub fn commands_by_module(module: Module) -> Vec<Box<dyn SlashCommand>> {
	all_commands()
		.into_iter()
		.filter(|command| command.module() == module)
		.collect()
}
