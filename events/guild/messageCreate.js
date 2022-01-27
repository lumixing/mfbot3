const { prefix, developers } = require("../../config.json");

// TODO: maybe refactor this with more object orianted shit and documentation
module.exports = async (Discord, client, msg) => {
    if (!msg.content.startsWith(prefix)) return;
    if (msg.author.bot) return;

    let args = msg.content.slice(prefix.length).split(/\s+/);
    const cmd = args.shift().toLowerCase();
    const flags = [];

    const command = client.commands.get(cmd) || client.aliases.get(cmd);

    if (!command) return;

    // check for user permissions
    if (command.permissions.length) {
        let missingPerms = [];

        for (const perm of command.permissions) {
            if (perm === "DEVELOPER" && !developers.includes(msg.author.id)) {
                missingPerms.push(perm);
                break;
            }

            if (!msg.member.permissions.has(perm)) {
                missingPerms.push(perm);
            }
        };

        if (missingPerms.length) {
            // TODO: do this a better way since vscode is having a mental breakdown
            msg.reply(`you are missing these permissions: ${missingPerms.map((p) => `\`${p}\``).join(" ")}`);
            return;
        }
    }

    // if command has flags
    if (command.flags.length) {

        const flagsRegex = /(?<!\/)-(?<key>\w+)(?:(?: |=)(?:('|")(?<longvalue>.*?)(?<!\\)\2|(?<value>\S+)))?/g;
        const matches = args.join(" ").matchAll(flagsRegex);

        for (const match of matches) {
            const commandFlag = command.flags.find((f) => f.key == match.groups.key);

            // if flag doesnt exist in command flags
            if (!commandFlag) {
                msg.reply(`\`-${match.groups.key}\` is not a valid command flag, type \`${prefix}help ${command.name}\` to look at the command flags\nenter a \`/\` before the dash to count a flag as an argument like \`/-${match.groups.key}\``);
                return;
            }

            // if command flag requires arguments and flag doesnt have any
            if (commandFlag.needsArgument && (!match.groups.value && !match.groups.longvalue)) {
                msg.reply(`\`-${match.groups.key}\` expected an argument but did not get any, type \`${prefix}help ${command.name}\` to look at the command flags`);
                return;
            }

            // push to flags
            flags.push({
                key: match.groups.key,
                value: match.groups.value || match.groups.longvalue
            });

            // remove flag from args
            args = args.join(" ").replace(flagsRegex, "").split(" ").filter((a) => a !== "");
        }
    }

    // escapes flags
    args = args.map((a) => {
        if (a.startsWith("/-")) return a.replace("/-", "-");
        else return a;
    });

    // TODO: error handling forsenInsane
    command.execute(Discord, client, msg, args, flags);

    // on error (dont use this, its shit)
    // process.once("uncaughtException", (error) => {
    //   const buffer = Buffer.from(error.stack);

    //   msg.reply({
    //     content: `an error occured while running this command, please report this to lumix#2759!`,
    //     files: [{ attachment: buffer, name: "error.txt" }]
    //   });
    // });
}