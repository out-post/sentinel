use serenity::{
	async_trait,
	builder::CreateApplicationCommand,
	http::Http,
	model::application::interaction::{
		application_command::ApplicationCommandInteraction, InteractionResponseType,
	},
};

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
					.kind(InteractionResponseType::ChannelMessageWithSource)
					.interaction_response_data(|message| message.content("Pong!").ephemeral(true))
			})
			.await
	}
}
