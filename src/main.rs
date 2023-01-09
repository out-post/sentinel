use std::{env, process, thread, time::Duration};

use log::*;
use serenity::{prelude::*, Client};

use handler::Handler;

mod commands;
mod handler;

static mut READY: bool = false;
const READY_UP_TIME: Duration = Duration::from_secs(10);

#[tokio::main]
async fn main() {
	// Preferred logging level; set in this file if needed.
	// env::set_var("RUST_LOG", "serenity=info,sentinel=trace");

	dotenv::dotenv().expect("Failed to read .env file");
	env_logger::init();
	info!(".env and env_logger initialized.");

	let token =
		env::var("DISCORD_BOT_TOKEN").expect("No Discord bot token found in the environment.");
	let intents = GatewayIntents::non_privileged(); // TODO: Will need to specify these later when done porting everything from TypeScript to Rust.
	let mut client = Client::builder(&token, intents)
		.event_handler(Handler)
		.await
		.expect("Something went wrong while creating the client.");

	// Timeout mechanism for client.
	#[rustfmt::skip]
	thread::spawn(|| {
		thread::sleep(READY_UP_TIME);
		unsafe {
			if !READY {
				error!("Timeout: Client was not ready for {:#?}", READY_UP_TIME);
				process::exit(1);
			}
		}
	});

	trace!("Starting the client...");
	if let Err(why) = client.start().await {
		error!("Client error: {:?}", why);
	}
	info!("Client started!");
}
