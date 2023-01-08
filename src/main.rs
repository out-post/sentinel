use std::env;
use log::{error, info};
use serenity::{async_trait, Client};
use serenity::client::{Context, EventHandler};
use serenity::model::application::interaction::Interaction;
use serenity::model::gateway::Ready;
use serenity::prelude::GatewayIntents;

mod commands;

struct Handler;

#[async_trait]
impl EventHandler for Handler {
	async fn ready(&self, _ctx: Context, ready: Ready) {
		info!("{} has reached the Out-Post!", ready.user.name);
	}

	async fn interaction_create(&self, ctx: Context, interaction: Interaction) {
		if let Interaction::ApplicationCommand(command) = interaction {
			info!("Received command: {}", command.data.name);

			todo!();
		}
	}
}

#[tokio::main]
async fn main() {
	dotenv::dotenv().expect("Failed to read .env file");
	env_logger::init();

	let token = env::var("DISCORD_BOT_TOKEN").expect("No Discord bot token found in the environment");
	let intents = GatewayIntents::all(); // TODO: Will need to specify these later when done porting everything from TypeScript to Rust.
	let mut client =
		Client::builder(&token, intents)
			.event_handler(Handler)
			.await
			.expect("Something went wrong while creating the client");

	if let Err(why) = client.start().await {
		error!("Client error: {:?}", why);
	}
}
