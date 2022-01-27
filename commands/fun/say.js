module.exports = {
    async execute(Discord, client, msg, args, flags) {
        msg.reply(args.join(" "))
            .catch((e) => {
                msg.reply("could not send message!");
            });
    },
    name: "say",
    description: "says anything you want",
    aliases: ["s"],
    flags: [],
    syntax: "say [text]",
    permissions: []
}