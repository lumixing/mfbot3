module.exports = {
    async execute(Discord, client, msg, args, flags) {
        if (!args.length) {
            msg.reply("type an emote!");
            return;
        }

        const emote = msg.guild.emojis.cache.find((e) => `<${!e.animated ? ":" : ""}${e.identifier}>` === args[0]);

        if (!emote) {
            msg.reply("could not find that emote!");
            return;
        }

        msg.reply({
            embeds: [{
                color: 0x2F3136,
                title: emote.name,
                image: {
                    url: emote.url
                }
            }]
        });
    },
    name: "emote",
    description: "gives info about a server emote",
    aliases: ["em"],
    flags: [],
    syntax: "emote [emote]",
    permissions: []
}