const { hasFlag } = require("../../util/util");

module.exports = {
    async execute(Discord, client, msg, args, flags) {
        if (hasFlag(flags, "a")) {
            msg.reply(`api: ${client.ws.ping}ms\nmsg: ${Math.abs(Date.now() - msg.createdTimestamp)}ms`);
            return;
        }

        msg.reply(`${client.ws.ping}ms`);
    },
    name: "ping",
    description: "gets latency of mfbot",
    aliases: ["p"],
    flags: [
        {
            key: "a",
            description: "advanced information",
            needsArgument: false
        }
    ],
    syntax: "ping",
    permissions: []
}