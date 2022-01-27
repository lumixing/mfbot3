const { readdirSync } = require("fs");
const { green } = require("chalk");

module.exports = (client, Discord) => {
    client.commands = new Discord.Collection();
    client.aliases = new Discord.Collection();

    const categoryFolders = readdirSync("./commands");

    for (const folder of categoryFolders) {
        const commandFiles = readdirSync(`./commands/${folder}`).filter((file) => file.endsWith(".js"));

        for (const file of commandFiles) {
            // command handler
            const command = require(`../commands/${folder}/${file}`);
            client.commands.set(command.name, command);

            // aliases handler
            if (command.aliases.length) {
                command.aliases.forEach((alias) => {
                    client.aliases.set(alias, command);
                });
            }

            command.category = folder;

            // console.log(green("loaded command", file));
        }
    }
}