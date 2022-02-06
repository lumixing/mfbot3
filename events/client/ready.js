const { blue } = require("chalk");

module.exports = (Discord, client, bot) => {
    client.emojiStreaks = new Discord.Collection();
    client.games = {};

    console.log(blue("logged in as", client.user.tag));
}