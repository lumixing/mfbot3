module.exports = {
    async execute(Discord, client, msg, args, flags) {
        if (!args.length) {
            const descriptionArray = client.commands.map((c) => `\`${c.syntax}\` ${c.description}`);

            msg.reply({
                embeds: [{
                    color: 0x2F3136,
                    description: descriptionArray.join("\n"),
                    // footer: {
                    //   text: `${client.commands.size} commands`
                    // }
                }]
            });

            return;
        }
    },
    name: "help",
    description: "gets list of commands or info for specific command",
    aliases: ["h"],
    flags: [],
    syntax: "help (command name/alias)",
    permissions: []
}