const { hasFlag } = require("../../util/util");

module.exports = {
    async execute(Discord, client, msg, args, flags) {
        let member = msg.member;
        const mention = msg.mentions.members.first();

        // if mention is a valid member
        if (mention) {
            member = mention;
        }

        const descriptionArray = [
            `account created <t:${~~(member.user.createdTimestamp / 1000)}:R>`,
            `joined server <t:${~~(member.joinedTimestamp / 1000)}:R>`
        ];

        msg.reply({
            embeds: [{
                color: 0x2F3136,
                author: {
                    name: member.user.tag,
                    icon_url: member.user.avatarURL()
                },
                description: descriptionArray.join("\n"),
                footer: {
                    text: hasFlag(flags, "m") ? `ms: ${member.user.createdTimestamp} | ${member.joinedTimestamp}` : ""
                }
            }]
        });
    },
    name: "age",
    description: "shows account creation and joined server date",
    aliases: [],
    flags: [
        {
            key: "m",
            description: "shows ms",
            needsArgument: false
        }
    ],
    syntax: "age (@mention)",
    permissions: []
}