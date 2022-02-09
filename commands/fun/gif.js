const { gifs } = require("../../assets/gifs.json");

module.exports = {
    async execute(Discord, client, msg, args, flags) {
        msg.reply(gifs[~~(Math.random() * gifs.length)])
            .catch(() => {
                msg.reply("could not send gif!");
            });
    },
    name: "gif",
    description: "sends a random gif",
    aliases: [],
    flags: [],
    syntax: "gif",
    permissions: []
}