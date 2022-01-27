module.exports = {
    async execute(Discord, client, msg, args, flags) {
        const choices = args.join(" ").split(" or ");

        if (!args.length || choices.length < 2) {
            msg.reply("you have to enter more than 2 choices with the word or like: `yes or no`");
            return;
        }

        msg.reply(choices[Math.floor(Math.random() * choices.length)]);
    },
    name: "choose",
    description: "let mfbot make a choice for you",
    aliases: ["ch"],
    flags: [],
    syntax: "choose [choices]",
    permissions: []
}