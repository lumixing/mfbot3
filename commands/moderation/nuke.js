module.exports = {
    async execute(Discord, client, msg, args, flags) {
        const nukeChannel = msg.mentions.channels.first() || msg.channel;

        nukeChannel.clone()
            .then((channel) => {
                nukeChannel.delete("nuke")
                    .catch(() => {
                        msg.reply("could not delete original channel!");
                    });

                channel.send("successfully nuked channel!");
            })
            .catch((e) => {
                if (e.message === "Missing Permissions") {
                    msg.reply("i am missing permissions to clone this channel!");
                    return;
                }

                msg.reply(`could not clone original channel!\n\`${e.toString()}\``);
            });
    },
    name: "nuke",
    description: "clones and deletes text channel",
    aliases: [],
    flags: [],
    syntax: "nuke (#text channel)",
    permissions: ["MANAGE_CHANNELS"]
}