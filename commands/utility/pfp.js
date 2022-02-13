module.exports = {
    async execute(Discord, client, msg, args, flags) {
        const member = msg.mentions.members.first() || msg.member;

        msg.reply(member.user.avatarURL(true));
    },
    name: "pfp",
    description: "gets the profile picture of a member",
    aliases: [],
    flags: [],
    syntax: "pfp (@member)",
    permissions: []
}