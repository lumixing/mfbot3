module.exports = {
    async execute(Discord, client, msg, args, flags) {
        if (!args.length) {
            msg.reply(`give me something to decode!`);
            return;
        }

        try {
            msg.reply(atob(args.join(" ")))
                .catch((e) => {
                    msg.reply(`could not send encoded text!`);
                });
        }
        catch (e) {
            msg.reply(`that is not valid encoded text!`);
            return;
        }
    },
    name: "decode",
    description: "decodes a message",
    aliases: ["de"],
    flags: [],
    syntax: "decode [text]",
    permissions: []
}