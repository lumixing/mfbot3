module.exports = {
    async execute(Discord, client, msg, args, flags) {
        if (!args.length) {
            msg.reply(`you need to enter a number to calculate the root of!`);
            return;
        }

        const radicand = parseFloat(args[0]);
        const index = parseFloat(args[1]) || 2;

        if (isNaN(radicand) || isNaN(index)) {
            msg.reply(`root radicand and index need to be valid integer or float numbers!`);
            return;
        }

        msg.reply((radicand ** (1 / index)).toString());
    },
    name: "root",
    description: "calculates root of a number",
    aliases: ["rt"],
    flags: [
        {
            key: "s",
            description: "flag description",
            needsArgument: false
        }
    ],
    syntax: "root [radicand] (index)",
    permissions: []
}