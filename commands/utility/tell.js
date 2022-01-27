const { hasFlag } = require("../../util/util");

module.exports = {
    async execute(Discord, client, msg, args, flags) {
        const member = msg.mentions.members.first();

        if (!member) {
            msg.reply("mention a member to send something to!");
            return;
        }

        args.shift();

        if (!args.length) {
            msg.reply("enter a message to send to!");
            return;
        }

        member.send({
            embeds: [{
                color: 0x2F3136,
                author: {
                    name: hasFlag(flags, "a") ? "" : msg.author.tag,
                    icon_url: hasFlag(flags, "a") ? "" : msg.author.avatarURL()
                },
                description: args.join(" "),
                footer: {
                    text: new Date().toLocaleString()
                }
            }]
        })
            .then(() => {
                msg.reply(`successfully sent message to ${member.user.tag}`);
            })
            .catch(() => {
                msg.reply("could not send message to that user");
            });
    },
    name: "tell",
    description: "tells a user something",
    aliases: ["t"],
    flags: [
        {
            key: "a",
            description: "send anonymously",
            needsArgument: false
        }
    ],
    syntax: "tell [@mention] [text]",
    permissions: []
}