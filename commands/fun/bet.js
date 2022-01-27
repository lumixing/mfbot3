module.exports = {
    async execute(Discord, client, msg, args, flags) {
        const choices = [
            "dont bet",
            "its up to you",
            "all on doubt",
            "half on doubt",
            "all on believe",
            "half on believe"
        ];

        msg.reply(choices[~~(Math.random() * choices.length)]);
    },
    name: "bet",
    description: "let mfbot bet for you on a twitch prediction",
    aliases: [],
    flags: [],
    syntax: "bet",
    permissions: []
}