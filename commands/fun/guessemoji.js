const { emojis } = require("../../assets/emojis.json");

module.exports = {
    async execute(Discord, client, msg, args, flags) {
        const emoji = emojis[~~(Math.random() * emojis.length)];
        const emojiStreaks = client.emojiStreaks;

        const message = await msg.reply(`:${emoji}:`);

        if (!emojiStreaks.has(msg.guild.id)) {
            emojiStreaks.set(msg.guild.id, 0);
        }

        let previousStreak = emojiStreaks.get(msg.guild.id);

        const filter = (m) => m.author.id === msg.author.id;
        msg.channel.awaitMessages({ filter, time: 15000, max: 1, errors: ["time"] })
            .then((m) => {
                const reply = m.first().content.toLowerCase().replaceAll(" ", "_");

                if (reply === emoji) {
                    emojiStreaks.set(msg.guild.id, previousStreak + 1);
                    previousStreak = emojiStreaks.get(msg.guild.id)
                    message.reply(`<@${msg.author.id}> you got it right!\n\`${previousStreak}\` streak!`);
                }
                else {
                    emojiStreaks.set(msg.guild.id, 0);
                    message.reply(`<@${msg.author.id}> nope! it was \`${emoji}\`\nyou ruined the \`${previousStreak}\` streak!`);
                }
            })
            .catch((e) => {
                emojiStreaks.set(msg.guild.id, 0);
                message.reply(`<@${msg.author.id}> you ran out of time! it was \`${emoji}\`\nyou ruined the \`${previousStreak}\` streak!`);
            });
    },
    name: "guessemoji",
    description: "guess the name of the given emoji",
    aliases: ["ge"],
    flags: [],
    syntax: "guessemoji",
    permissions: []
}