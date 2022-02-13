module.exports = {
    async execute(Discord, client, msg, args, flags) {
        msg.reply(args.join(" ").length.toString());
    },
    name: "length",
    description: "shows the length of a message",
    aliases: ["len"],
    flags: [],
    syntax: "length [text]",
    permissions: []
}