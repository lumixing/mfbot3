require("dotenv").config();

const app = require("express")();

app.get("/", (req, res) => res.send("Server is up."));
app.listen(3000);

const Discord = require("discord.js");

const client = new Discord.Client({
    failIfNotExists: false,
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "DIRECT_MESSAGES",
        "GUILD_VOICE_STATES",
        "GUILD_MESSAGE_REACTIONS"
    ],
    presence: {
        activities: [
            {
                name: "as the best bot",
                type: "PLAYING"
            }
        ]
    }
});

console.clear();

["commandHandler", "eventHandler"].forEach((handler) => {
    require(`./handlers/${handler}`)(client, Discord);
});

process.on("uncaughtException", (err) => {
    console.log("[rejection]", err);
});

client.login(process.env.DISCORD_TOKEN);
