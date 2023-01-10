use serenity::{
	async_trait,
	builder::CreateApplicationCommand,
	http::Http,
	model::application::interaction::application_command::ApplicationCommandInteraction,
};

pub mod general;
pub mod util;

#[derive(Eq, PartialEq)]
pub enum Module {
	General,
}

#[async_trait]
pub trait SlashCommand: Send + Sync {
	fn name(&self) -> &'static str;
	fn module(&self) -> Module;

	fn register<'a>(
		&self,
		creator: &'a mut CreateApplicationCommand,
	) -> &'a mut CreateApplicationCommand;

	async fn run(
		&self,
		http: &Http,
		command: &ApplicationCommandInteraction,
	) -> serenity::Result<()>;
}
