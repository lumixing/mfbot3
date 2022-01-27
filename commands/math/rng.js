const { hasFlag, randomInteger, randomFloat } = require("../../util/util");

module.exports = {
    async execute(Discord, client, msg, args, flags) {
        if (!args.length) {
            msg.reply(hasFlag(flags, "b") ? (Math.random() > 0.5).toString() : Math.random().toString());
            return;
        }

        const min = parseInt(args[0]);
        const max = parseInt(args[1]);

        if (!args[1]) {
            msg.reply("you need to provide a max number aswell!");
            return;
        }

        if (isNaN(min) || isNaN(max)) {
            msg.reply("min and max need to be integer numbers!");
            return;
        }

        msg.reply(hasFlag(flags, "f") ? randomFloat(min, max).toString() : randomInteger(min, max).toString())
            .catch((err) => {
                msg.reply(`could not send message\n\`${err.toString()}\``);
            });
    },
    name: "rng",
    description: "generates random number",
    aliases: ["random", "rand"],
    flags: [
        {
            key: "b",
            description: "boolean",
            needsArgument: false
        },
        {
            key: "f",
            description: "float",
            needsArgument: false
        },
    ],
    syntax: "rng (min) (max)",
    permissions: []
}