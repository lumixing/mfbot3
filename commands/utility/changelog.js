const { version } = require("../../package.json");

module.exports = {
    async execute(Discord, client, msg, args, flags) {
        const descriptionArray = [
            "**new:**",
            " · added `;wordle`",
            " · added `;clear`",
            " · added `;quad`",
            " · added `;randomword`",
            " · added `;eval -r` flag",
            "**fixes:**",
            " · fixed `;death` \"in in\" text"
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
                    text: "2022.02.06"
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