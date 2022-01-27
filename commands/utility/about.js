const { dependencies, version } = require("../../package.json");

module.exports = {
    async execute(Discord, client, msg, args, flags) {
        const descriptionArray = [
            `**discord.js version:** ${dependencies["discord.js"]}`,
            `**node.js version:** ${process.version}`,
            `**latency:** ${client.ws.ping}ms`,
            `**uptime:** <t:${~~(client.readyTimestamp / 1000)}:R>`
        ];

        msg.reply({
            embeds: [{
                color: 0x2F3136,
                author: {
                    name: `mfbot ${version}`,
                    icon_url: client.user.avatarURL()
                },
                description: descriptionArray.join("\n")
            }]
        });
    },
    name: "about",
    description: "shows information about mfbot",
    aliases: ["a"],
    flags: [],
    syntax: "about",
    permissions: []
}