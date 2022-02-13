module.exports = {
    async execute(Discord, client, msg, args, flags) {
        if (!msg.member.voice.channel) {
            msg.reply("you are not connected to any voice channel!");
            return;
        }

        msg.member.voice.channel.members.each((m) => {
            m.voice.setMute(false, "unmuteall")
                .catch((e) => { });
        });
    },
    name: "unmuteall",
    description: "unmute all members in your voice chat",
    aliases: ["ua"],
    flags: [],
    syntax: "unmuteall",
    permissions: ["MUTE_MEMBERS"]
}