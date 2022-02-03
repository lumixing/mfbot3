const { hasFlag } = require("../../util/util");

module.exports = {
    async execute(Discord, client, msg, args, flags) {
        if (!args.length) {
            msg.reply(`give me code to execute!`);
            return;
        }

        const code = args.join(" ");

        try {
            let result = await eval(code);
            result = JSON.stringify(result, null, 2);

            if (hasFlag(flags, "r")) {
                result = result.replaceAll("\\n", "\n");
            }

            result = Discord.Formatters.codeBlock("json", result);

            if (!hasFlag(flags, "n")) {
                msg.reply(result)
                    .catch((err) => {
                        if (String(err).match(/Must be 2|4000 or fewer in length/g)) {
                            let buffer = Buffer.from(result);
                            msg.reply({ content: "result was over 2000 characters", files: [{ attachment: buffer, name: "result.json" }] });
                        }
                        else {
                            msg.reply(err.toString());
                        }
                    });
            }
        }
        catch (err) {
            msg.reply(err.toString());
            return;
        }
    },
    name: "eval",
    description: "evaluates code",
    aliases: ["ev"],
    flags: [
        {
            key: "n",
            description: "no return message",
            needsArgument: false
        },
        {
            key: "r",
            description: "replace output \\n with new line",
            needsArgument: false
        }
    ],
    syntax: "eval [code]",
    permissions: ["DEVELOPER"]
}