use std::env;
use serenity::{async_trait, Client};
use serenity::client::{Context, EventHandler};
use serenity::model::gateway::Ready;
use serenity::prelude::GatewayIntents;

struct Handler;

#[async_trait]
impl EventHandler for Handler {
    async fn ready(&self, _: Context, ready: Ready) {
        println!("{} has reached the Out-Post!", ready.user.name);
    }
}

#[tokio::main]
async fn main() {
    dotenv::dotenv().expect("Failed to read .env file");
    let token = env::var("DISCORD_BOT_TOKEN").expect("No Discord bot token found in the environment");
    let intents = GatewayIntents::all();
    let mut client =
        Client::builder(&token, intents)
            .event_handler(Handler)
            .await
            .expect("Something went wrong while creating the client");

    if let Err(why) = client.start().await {
        println!("Client error: {:?}", why);
    }
}
