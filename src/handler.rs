use log::*;
use serenity::{
	async_trait,
	client::{Context, EventHandler},
	model::{application::interaction::Interaction, gateway::Ready},
};

use crate::{
	commands::{general::ping::Ping, SlashCommand},
	READY,
};

pub struct Handler;

#[async_trait]
impl EventHandler for Handler {
	async fn ready(&self, ctx: Context, ready: Ready) {
		unsafe {
			READY = true;
		}
		info!("{} has reached the Out-Post!", ready.user.name);
		for guild in ready.guilds {
			let guild = guild.id;
			trace!("Creating application commands for guild {}...", guild);

			if let Err(why) = guild
				.create_application_command(&ctx.http, |command| Ping.register(command))
				.await
			{
				error!("Cannot register slash command in guild {}: {}", guild, why);
			}
		}
	}

	async fn interaction_create(&self, ctx: Context, interaction: Interaction) {
		if let Interaction::ApplicationCommand(command) = interaction {
			let command_name = &command.data.name;
			let cmd = match command_name.as_str() {
				"ping" => Ping,
				_ => {
					error!("Unknown slash command: {}", command_name);
					return;
				},
			};
			info!("Received command interaction: {}", command_name);

			trace!("Running slash command {}", command_name);
			if let Err(why) = cmd.run(&ctx.http, &command).await {
				error!("Error while running slash command: {why}");
			}
		}
	}
}
