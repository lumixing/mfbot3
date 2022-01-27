const { prefix } = require("../../config.json");

module.exports = {
    async execute(Discord, client, msg, args, flags) {
        msg.reply({
            embeds: [{
                color: 0x2F3136,
                title: `${client.commands.size} commands`,
                description: client.commands.map((cmd) => `\`${prefix}${cmd.name}\``).sort().join(" ") + `\n\ntype \`${prefix}help [command name]\` for more info about a command`,
            }]
        });
    },
    name: "commands",
    description: "shows a list of commands",
    aliases: ["cmd"],
    flags: [],
    syntax: "commands",
    permissions: []
}