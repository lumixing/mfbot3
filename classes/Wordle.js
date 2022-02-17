const { setDefaults } = require("../util/util");
const words = require("an-array-of-english-words").filter((w) => w.length === 5);
const commonWords = require("../assets/words.json").words;
const { emojis } = require("../assets/custom_emojis.json");

class Wordle {
    constructor(msg) {
        this.msg = msg;
        this.mention = this.msg.mentions.members.first();
        this.player = this.msg.author;
        this.server = this.msg.guild;

        this.games = this.msg.client.games;

        this.init();

        this.try = 0;
        this.tries = [];
        this.word = words[~~(Math.random() * commonWords.length)];

        if (this.mention) {
            this.manageMentioned();
        }

        else {
            console.log(this.word);
            this.sendMessage({ edit: false, message: "type \"end\" to end the game" });
        }
    }

    init() {
        this.initGame();
        this.initState();
    }

    initGame() {
        if (!(this.server.id in this.games)) {
            this.games[this.server.id] = {};
        }

        this.games[this.server.id][this.player.id] = this;
    }

    initState() {
        // new Array(n).fill() creates refrences and not values so this is better
        this.state = Array.from({ length: 6 }, e => Array.from({ length: 5 }, e => { return {} }));
    }

    async manageMentioned() {
        if (this.mention.user.bot) {
            this.msg.reply("a bot cant send you a word!");
            this.endGame();
            return;
        }

        const waitMessage = await this.msg.reply(`waiting for ${this.mention.user.username}'s reaction...`);
        await waitMessage.react("✅");
        await waitMessage.react("🚫");

        const reactionFilter = (r, u) => ["✅", "🚫"].includes(r.emoji.name) && u.id === this.mention.id;
        let collection;

        try {
            collection = await waitMessage.awaitReactions({ filter: reactionFilter, max: 1, time: 60000, errors: ["time"] });
        }
        catch (err) {
            waitMessage.edit(`timed out ${this.mention.user.username}'s response!`)
                .catch(() => this.msg.reply(`timed out ${this.mention.user.username}'s response!`));
            this.endGame();
            return;
        }

        if (collection.first().emoji.name === "🚫") {
            waitMessage.edit(`${this.mention.user.username} rejected the game request!`)
                .catch(() => this.msg.reply(`${this.mention.user.username} rejected the game request!`));
            this.endGame();
            return;
        }

        this.mention.send(`type a **five-letter valid word** for ${this.player.username} to solve\ntype \`abort\` to cancel the game`)
            .then(async (m) => {
                waitMessage.edit(`waiting for ${this.mention.user.username}'s response...`)
                    .catch(() => this.msg.reply(`waiting for ${this.mention.user.username}'s response...`));

                const filter = (m) => /^[a-zA-Z]{5}$/.test(m.content) && words.includes(m.content.toLowerCase());
                let collection;

                try {
                    collection = await m.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ["time"] });
                }
                catch (err) {
                    this.mention.send("timed out!");
                    waitMessage.edit(`${this.mention.user.username} timed out!`)
                        .catch(() => this.msg.reply(`${this.mention.user.username} timed out!`));
                    this.endGame();
                    return;
                }

                const reply = collection.first().content.toLowerCase();

                if (reply === "abort") {
                    this.mention.send("canceled the game");
                    waitMessage.edit(`${this.mention.user.username} canceled the game`)
                        .catch(() => this.msg.reply(`${this.mention.user.username} canceled the game`));
                    this.endGame();
                    return;
                }

                this.mention.send(`using **${reply}** as the word!`);
                waitMessage.delete().catch(() => { });
                this.word = reply;
                this.sendMessage({ edit: false, message: `used ${this.mention.user.username}'s word` });
            })
            .catch((e) => {
                console.log(e);
                this.msg.reply(`could not send ${this.mention.user.username} a message, canceling game!`);
                this.endGame();
                return;
            });
    }

    async sendMessage(options) {
        const defaults = {
            edit: true,
            awaitReply: true,
            message: ""
        };

        options = setDefaults(options, defaults);

        // const content = this.formatState(options.message);
        const content = {
            embeds: [{
                color: 0x2F3136,
                author: {
                    name: `${this.player.username}'s wordle game`,
                    icon_url: this.player.avatarURL()
                },
                description: this.formatState(options.message),
                footer: {
                    text: options.message
                }
            }]
        };

        if (options.edit) {
            this.message.edit(content)
                .catch(async () => {
                    // if cant edit bc message is deleted, create new one
                    this.message = await this.msg.reply(content);
                });
        }
        else {
            this.message = await this.msg.reply(content);
        }

        if (options.awaitReply) {
            this.awaitReply();
        }
    }

    formatState(message) {
        const arr = [];

        this.state.forEach((w) => {
            const temp = w.map((l) => {
                if (!l.condition) return Math.random() > 0.01 ? "||:black_large_square:||" : "||:face_with_raised_eyebrow:||";
                if (l.condition === "correct") return emojis[`g${l.letter.toUpperCase()}`];
                if (l.condition === "order") return emojis[`y${l.letter.toUpperCase()}`];
                else return `:regional_indicator_${l.letter}:`;
            });

            arr.push(temp.join(""));
        });

        return arr.join("\n");
    }

    async awaitReply() {
        if (this.try > 5) {
            this.sendMessage({ awaitReply: false, message: `you lost! D: the word was ${this.word}` });
            this.endGame();
            return;
        }

        const filter = (m) => m.author.id === this.msg.author.id;
        let collection;

        try {
            collection = await this.msg.channel.awaitMessages({ filter, max: 1, time: 300000, errors: ["time"] });
        }
        catch (err) {
            this.msg.reply("timed out!");
            this.endGame();
            return;
        }

        const message = collection.first();
        const reply = message.content.toLowerCase();

        if (["exit", "quit", "end"].includes(reply)) {
            this.msg.reply(`ended game! word was: **${this.word}**`);
            this.endGame();
            return;
        }

        if (reply === "send") {
            this.sendMessage({ edit: false });
            return;
        }

        message.delete().catch(() => { });

        // invalid characters or word
        if (!/^[a-zA-Z]{5}$/.test(reply) || !words.includes(reply)) {
            this.sendMessage({ message: "that is not a valid word!" });
            return;
        }

        this.tries.push(reply);
        this.updateState();
        this.try++;

        if (reply === this.word) {
            this.sendMessage({ awaitReply: false, message: "you found the word! :D" });
            return;
        }

        this.sendMessage();
    }

    updateState() {
        this.updateLetters();
        this.updateConditions();
    }

    updateLetters() {
        this.tries[this.try].split("").map((l, i) => {
            this.state[this.try][i].letter = l;
        });
    }

    updateConditions() {
        this.tries[this.try].split("").map((l, i) => {
            if (!this.word.includes(l)) {
                this.state[this.try][i].condition = "false";
            }
            else if (l === this.word.charAt(i)) {
                this.state[this.try][i].condition = "correct";
            }
            else {
                this.state[this.try][i].condition = "order";
            }
        });
    }

    endGame() {
        delete this.msg.client.games[this.server.id][this.player.id];
    }
}

module.exports = Wordle;