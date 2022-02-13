const { hasFlag, getFlagValue } = require("../../util/util");

module.exports = {
    async execute(Discord, client, msg, args, flags) {
        const permissions = hasFlag(flags, "p") ? getFlagValue(flags, "p") : "371798";

        if (isNaN(permissions)) {
            msg.reply("invalid permission number!");
            return;
        }

        const url = client.generateInvite({ scopes: ["bot"], permissions });

        msg.reply(url);
    },
    name: "invite",
    description: "sends mfbot invite link",
    aliases: ["inv"],
    flags: [
        {
            key: "p",
            description: "permission number",
            needsArgument: true
        }
    ],
    syntax: "invite",
    permissions: []
}