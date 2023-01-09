use serenity::async_trait;
use serenity::builder::CreateApplicationCommand;
use serenity::http::Http;
use serenity::model::application::interaction::application_command::ApplicationCommandInteraction;
use serenity::model::application::interaction::InteractionResponseType;

use crate::commands::SlashCommand;

pub struct Ping;

#[async_trait]
impl SlashCommand for Ping {
	fn register<'a>(
		&self,
		creator: &'a mut CreateApplicationCommand,
	) -> &'a mut CreateApplicationCommand {
		creator
			.name("ping")
			.description("Returns the ping of the bot. Also, pong!")
	}

	async fn run(
		&self,
		http: &Http,
		command: &ApplicationCommandInteraction,
	) -> serenity::Result<()> {
		command
			.create_interaction_response(http, |response| {
				response
					.kind(InteractionResponseType::Pong) // TODO: Should this be IRT::Pong instead?
					.interaction_response_data(|message| message.content("Pong!").ephemeral(true))
			})
			.await
	}
}
