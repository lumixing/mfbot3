const { dependencies, devDependencies } = require("../../package.json");

module.exports = {
    async execute(Discord, client, msg, args, flags) {
        msg.reply({
            embeds: [{
                color: 0x2F3136,
                title: `node.js ${process.version}`,
                description: `${Object.entries(dependencies).concat(Object.entries(devDependencies)).map(([name, version]) => `**${name}:** ${version}`).join("\n")}`
            }]
        });
    },
    name: "npm",
    description: "shows npm packages and their versions",
    aliases: [],
    flags: [],
    syntax: "npm",
    permissions: []
}