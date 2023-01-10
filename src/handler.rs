use crate::{
	commands::{
		general::ping::Ping,
		util::commands_by_module,
		Module,
		SlashCommand,
	},
	READY,
};
use log::*;
use serenity::{
	async_trait,
	client::{
		Context,
		EventHandler,
	},
	http::Http,
	model::{
		application::interaction::Interaction,
		gateway::Ready,
		prelude::UnavailableGuild,
	},
};
use std::sync::atomic::Ordering;

async fn register_commands(guild: &UnavailableGuild, http: &Http, command: &dyn SlashCommand) {
	if guild.unavailable {
		warn!("Unavailable guild {} found in cache.", guild.id)
	}

	let guild = guild.id;
	let general_info = format!("slash command /{} for guild {guild}", command.name());

	trace!("Creating {general_info}...");
	match guild
		.create_application_command(http, |creator| command.register(creator))
		.await
	{
		Ok(_) => info!("Created {general_info}."),
		Err(why) => error!("Cannot register {general_info}: {why}"),
	}
}

pub struct Handler;

#[async_trait]
impl EventHandler for Handler {
	async fn ready(&self, ctx: Context, ready: Ready) {
		unsafe {
			READY.store(true, Ordering::Relaxed);
		}

		info!("{} has reached the Out-Post!", ready.user.name);
		for command in commands_by_module(Module::General).iter() {
			for guild in ready.guilds.as_slice() {
				register_commands(guild, &ctx.http, &**command).await;
			}
		}
	}

	async fn interaction_create(&self, ctx: Context, interaction: Interaction) {
		if let Interaction::ApplicationCommand(command) = interaction {
			let command_name = &command.data.name;
			// skipcq: RS-W1007
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
