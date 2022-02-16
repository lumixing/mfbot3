const Minesweeper = require("../../classes/Minesweeper");

module.exports = {
    async execute(Discord, client, msg, args, flags) {
        new Minesweeper(msg);
    },
    name: "minesweeper",
    description: "play minesweeper",
    aliases: ["ms"],
    flags: [],
    syntax: "minesweeper",
    permissions: []
}