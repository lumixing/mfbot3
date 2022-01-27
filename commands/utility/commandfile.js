const { prefix } = require("../../config.json");

module.exports = {
    async execute(Discord, client, msg, args, flags) {
        if (!args.length) {
            msg.reply(`give me a command name or alias!`);
            return;
        }

        const input = args[0].toLowerCase();
        const command = client.commands.get(input) || client.aliases.get(input);
        const branch = args[1] || "main";

        if (!command) {
            msg.reply(`could not find command on current branch so try searching instead here:\n<https://github.com/lumixing/mfbot/find/${branch}>`);
            return;
        }

        msg.reply(`<https://github.com/lumixing/mfbot/blob/${branch}/commands/${command.category}/${command.name}.js>`);
    },
    name: "commandfile",
    description: "gets github repo file for command",
    aliases: ["cmdfile", "cmdf"],
    flags: [],
    syntax: "commandfile [command name/alias] (branch name)",
    permissions: []
}