module.exports = {
    async execute(Discord, client, msg, args, flags) {
        const message = await msg.reply(`:clock${~~(Math.random() * 12) + 1}: spinning gun...`);

        setTimeout(() => {
            if (Math.random() < 1 / 6) {
                message.edit(":boom: you pulled the trigger and shot yourself!");
                msg.member.timeout(5 * 60 * 1000, "died in russian roulette")
                    .catch((err) => { 0 });
                return
            }

            message.edit(":tada: you pulled the trigger and luckily you survived...");
        }, 1000);
    },
    name: "roulette",
    description: "play russian roulette",
    aliases: ["rr"],
    flags: [],
    syntax: "roulette",
    permissions: []
}