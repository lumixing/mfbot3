const deaths = require("../../assets/deaths.json");
const { randomInteger } = require("../../util/util");

module.exports = {
    async execute(Discord, client, msg, args, flags) {
        let time = ~~(new Date().getTime() / 1000);
        const rng = Math.random();

        if (rng < 0.05) time += randomInteger(1, 60); // seconds
        else if (rng < 0.1) time += randomInteger(31556926, 3153600000); // years
        else if (rng < 0.25) time += randomInteger(60, 3600); // minutes
        else if (rng < 0.4) time += randomInteger(2629743, 31556926); // months
        else if (rng < 0.7) time += randomInteger(3600, 86400); // hours
        else time += randomInteger(86400, 2592000); // days

        const death = deaths.deaths[~~(Math.random() * deaths.deaths.length)];

        const message = await msg.reply("you will die in *???*\ncause of death: *???*");

        setTimeout(() => {
            message.edit(`you will die in <t:${time}:R>\ncause of death: *???*`);
        }, 2000);

        setTimeout(() => {
            message.edit(`you will die in <t:${time}:R>\ncause of death: **${death}**`);
        }, 5000);
    },
    name: "death",
    description: "tells when you will die",
    aliases: ["dth"],
    flags: [],
    syntax: "death",
    permissions: []
}