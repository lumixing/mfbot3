module.exports = {
    async execute(Discord, client, msg, args, flags) {
        const date = client.readyTimestamp.toString().slice(0, -3);
        msg.reply(`<t:${date}:f>\n<t:${date}:R>`);
    },
    name: "uptime",
    description: "gets uptime of mfbot",
    aliases: ["up"],
    flags: [],
    syntax: "uptime",
    permissions: []
}