module.exports = {
    async execute(Discord, client, msg, args, flags) {
        if (!args.length) {
            msg.reply(`give me something to encode!`);
            return;
        }

        msg.reply(btoa(args.join(" ")));
    },
    name: "encode",
    description: "encodes a message",
    aliases: ["en"],
    flags: [],
    syntax: "encode [text]",
    permissions: []
}