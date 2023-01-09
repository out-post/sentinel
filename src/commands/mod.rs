use serenity::async_trait;
use serenity::builder::CreateApplicationCommand;
use serenity::http::Http;
use serenity::model::application::interaction::application_command::ApplicationCommandInteraction;

pub mod general;

#[async_trait]
pub trait SlashCommand {
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
