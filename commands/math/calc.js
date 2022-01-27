const { evaluate } = require("mathjs");

module.exports = {
    async execute(Discord, client, msg, args, flags) {
        if (!args.length) {
            msg.reply("you need to enter an expression for me to calculate!");
            return;
        }

        try {
            const result = evaluate(args.join(" "));
            msg.reply(result.toString());
        }
        catch (err) {
            msg.reply(`an error occured:\n\`${err.toString()}\``);
        }
    },
    name: "calc",
    description: "calculate an expression",
    aliases: ["calculate"],
    flags: [],
    syntax: "calc [expression]",
    permissions: []
}