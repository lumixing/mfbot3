const words = require("an-array-of-english-words");
const commonWords = require("../../assets/words.json").words;
const { hasFlag } = require("../../util/util");

module.exports = {
    async execute(Discord, client, msg, args, flags) {
        if (!isNaN(args[0])) {
            let allowedWords = words.filter((w) => w.length === parseInt(args[0]));

            const rng = ~~(Math.random() * allowedWords.length);
            msg.reply(`(${rng}/${allowedWords.length}) ${allowedWords[rng]}`);

            return;
        }

        if (hasFlag(flags, "c")) {
            const rng = ~~(Math.random() * commonWords.length);
            msg.reply(`(${rng}/${commonWords.length}) ${commonWords[rng]}`);
            return;
        }

        const rng = ~~(Math.random() * words.length);
        msg.reply(`(${rng}/${words.length}) ${words[rng]}`);
    },
    name: "randomword",
    description: "gives a random word",
    aliases: ["rw"],
    flags: [
        {
            key: "c",
            description: "common words",
            needsArgument: false
        }
    ],
    syntax: "randomword (length)",
    permissions: []
}