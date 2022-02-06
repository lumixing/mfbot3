module.exports = {
    async execute(Discord, client, msg, args, flags) {
        msg.channel.bulkDelete(100, true)
            .catch((e) => msg.reply(e.toString()));
    },
    name: "clear",
    description: "clears messages from channel",
    aliases: ["c", "clr", "cls"],
    flags: [],
    syntax: "clear",
    permissions: ["MANAGE_MESSAGES"]
}