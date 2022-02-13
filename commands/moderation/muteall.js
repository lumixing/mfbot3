module.exports = {
    async execute(Discord, client, msg, args, flags) {
        if (!msg.member.voice.channel) {
            msg.reply("you are not connected to any voice channel!");
            return;
        }

        msg.member.voice.channel.members.each((m) => {
            m.voice.setMute(true, "muteall")
                .catch((e) => { });
        });
    },
    name: "muteall",
    description: "mute all members in your voice chat",
    aliases: ["ma"],
    flags: [],
    syntax: "muteall",
    permissions: ["MUTE_MEMBERS"]
}