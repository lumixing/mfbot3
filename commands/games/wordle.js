const Wordle = require("../../classes/Wordle");

module.exports = {
    async execute(Discord, client, msg, args, flags) {
        new Wordle(msg);
    },
    name: "wordle",
    description: "guess the word",
    aliases: ["wrdl", "wrd"],
    flags: [],
    syntax: "wordle",
    permissions: []
}