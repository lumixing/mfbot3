const words = require("an-array-of-english-words")

module.exports = {
    async execute(Discord, client, msg, args, flags) {
        if (!isNaN(args[0])) {
            const allowedWords = words.filter((w) => w.length === parseInt(args[0]));

            const rng = ~~(Math.random() * allowedWords.length);
            msg.reply(`(${rng}/${allowedWords.length}) ${allowedWords[rng]}`);

            return;
        }

        const rng = ~~(Math.random() * words.length);
        msg.reply(`(${rng}/${words.length}) ${words[rng]}`);
    },
    name: "randomword",
    description: "gives a random word",
    aliases: ["rw"],
    flags: [],
    syntax: "randomword (length)",
    permissions: []
}