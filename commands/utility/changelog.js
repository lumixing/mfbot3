const { version } = require("../../package.json");

module.exports = {
    async execute(Discord, client, msg, args, flags) {
        const descriptionArray = [
            "**new:**",
            " · added `;gif`",
            " · added `;nuke`",
            " · added `;invite`",
            " · added `;length`",
            " · added `;muteall`",
            " · added `;unmuteall`",
            " · added `;emote`",
            " · added `;pfp`",
            "**improved:**",
            " · changed bot status text"
        ];

        msg.reply({
            embeds: [{
                color: 0x2F3136,
                author: {
                    name: `mfbot ${version} changelog`,
                    icon_url: client.user.avatarURL()
                },
                description: descriptionArray.join("\n"),
                footer: {
                    text: "2022.02.13"
                }
            }]
        });
    },
    name: "changelog",
    description: "shows the mfbot changelog",
    aliases: ["changes", "clog"],
    flags: [],
    syntax: "changelog",
    permissions: []
}