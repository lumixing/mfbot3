require("dotenv").config();

const app = require("express")();

app.get("/", (req, res) => res.send("Server is up."));
app.listen(3000);

const Discord = require("discord.js");

const client = new Discord.Client({
    failIfNotExists: false,
    intents: [
        "GUILDS",
        "GUILD_MESSAGES"
    ]
});

console.clear();

["commandHandler", "eventHandler"].forEach((handler) => {
    require(`./handlers/${handler}`)(client, Discord);
});

process.on("uncaughtException", (err) => {
    console.log("[rejection]", err);
});

client.login(process.env.DISCORD_TOKEN);
