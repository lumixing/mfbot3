const { setDefaults, randomInteger } = require("../util/util");
const { createCanvas, loadImage } = require("canvas");
const { readdirSync } = require("fs");
const Discord = require("discord.js");

class Ms {
    constructor(msg) {
        this.msg = msg;
        // this.mention = this.msg.mentions.members.first();
        this.player = this.msg.author;
        this.server = this.msg.guild;

        this.games = this.msg.client.games;

        this.width = 9;
        this.height = 9;
        this.mines = 10;

        this.init();
        this.sendMessage({ edit: false });
    }

    init() {
        console.log("initting");
        this.initGame();
        this.initBoard();
        this.placeMines(this.mines);
    }

    initGame() {
        console.log("initting game");
        if (!(this.server.id in this.games)) {
            this.games[this.server.id] = {};
        }

        this.games[this.server.id][this.player.id] = this;
    }

    initBoard() {
        console.log("initting board");
        this.board = [];
        this.board = Array.from({ length: this.width }, e => Array.from({ length: this.height }, e => {
            return {
                value: 0,
                revealed: false,
                flagged: false
            }
        }));
    }

    placeMines(mines) {
        console.log("placing mines");
        this.minesArray = [];

        for (let i = 0; i < mines; i++) {
            const [x, y] = [randomInteger(0, this.width), randomInteger(0, this.height)];

            if (this.getCellAt(x, y).value === -1) {
                i--;
                continue;
            }

            this.setCellAt(x, y, "value", -1);
            this.minesArray.push([x, y]);
        }

        this.updateNumbers();
    }

    updateNumbers() {
        console.log("updating numbers");
        this.minesArray.forEach((m) => {
            const neighbours = this.getCellNeighbours(m[0], m[1]);

            neighbours.forEach((n) => {
                // if valid and not mine, increment value
                if (n && this.getCellAt(n[0], n[1]).value !== -1) this.setCellAt(n[0], n[1], "value", this.getCellAt(n[0], n[1]).value + 1);
            });
        });
    }

    getCellAt(x, y) {
        if (this.isValidCell(x, y)) {
            return this.board[x][y];
        }
    }

    setCellAt(x, y, key, value) {
        if (this.isValidCell(x, y)) {
            this.board[x][y][key] = value;
        }
    }

    isValidCell(x, y) {
        return !(x < 0 || x >= this.width || y < 0 || y >= this.height);
    }

    getCellNeighbours(x, y) {
        const neighbourCoords = [[-1, 1], [0, 1], [1, 1], [-1, 0], [1, 0], [-1, -1], [0, -1], [1, -1]];

        return neighbourCoords.map((c) => {
            if (this.isValidCell(x + c[0], y + c[1])) {
                return [x + c[0], y + c[1]];
            }

            return false;
        });
    }

    async sendMessage(options) {
        console.log("sending message");
        const defaults = {
            edit: true,
            awaitReply: true,
            message: ""
        };

        options = setDefaults(options, defaults);

        // reply here
        const image = await this.renderBoard();
        const attachment = new Discord.MessageAttachment(image, "board.png");

        if (options.edit) {
            this.message.edit({
                embeds: [{
                    color: 0x2F3136,
                    image: {
                        url: "attachment://board.png"
                    },
                    footer: {
                        text: options.message
                    }
                }],
                files: [attachment]
            })
                .catch(async () => {
                    // if cant edit bc message is deleted, create new one
                    this.message = await this.msg.reply(content);
                });
        }
        else {
            this.message = await this.msg.reply({
                embeds: [{
                    color: 0x2F3136,
                    image: {
                        url: "attachment://board.png"
                    },
                    footer: {
                        text: options.message
                    }
                }],
                files: [attachment]
            });
        }

        if (options.awaitReply) {
            this.awaitReply();
        }
    }

    // dont touch this idk how it works FeelsDankMan
    async renderBoard() {
        console.log("rendering board");
        const canvas = createCanvas(512, 512);
        const ctx = canvas.getContext("2d");

        // preload assets
        const imagesObject = {};

        // load images from assets folder
        readdirSync("./assets/minesweeper").forEach((folder) => {
            readdirSync(`./assets/minesweeper/${folder}`).forEach(async (file) => {
                let loadedImage = loadImage(`./assets/minesweeper/${folder}/${file}`);
                imagesObject[`${folder}/${file.split(".")[0]}`] = loadedImage;
            });
        });

        // size of each cell
        let size = Math.min(512 / (this.width + 1), 512 / (this.height + 1));
        let pos = [0, 0];

        for (let row = -1; row < this.width; row++) {
            let image = await imagesObject[`letters/${row + 1}`];
            ctx.drawImage(image, pos[0], pos[1] + size, size, size);
            pos = [pos[0] + size, pos[1]];

            for (let col = 0; col < this.height; col++) {
                if (row === -1) {
                    let image = await imagesObject[`numbers/${col + 1}`];
                    ctx.drawImage(image, pos[0], pos[1], size, size);
                    pos = [pos[0] + size, pos[1]];
                    continue;
                }

                const cell = this.getCellAt(row, col);
                let image;

                if (cell.revealed) {
                    if (cell.value === -1) image = await imagesObject["cells/mine"];
                    else if (cell.value === 0) image = await imagesObject["cells/empty_clicked"];
                    else image = await imagesObject[`cells/${cell.value}`];
                }
                else {
                    if (cell.flagged) image = await imagesObject["cells/flag"];
                    else image = await imagesObject["cells/empty_unclicked"];
                }

                ctx.drawImage(image, pos[0], pos[1], size, size);
                pos = [pos[0] + size, pos[1]];
            }

            pos = [0, pos[1] + size];
        }

        return canvas.toBuffer();
    }

    async awaitReply() {
        console.log("awaiting reply");
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
            this.msg.reply(`ended game!`);
            this.endGame();
            return;
        }

        // if (reply === "send") {
        //     this.sendMessage({ edit: false });
        //     return;
        // }

        message.delete().catch(() => { });

        const coords = reply.split(" ")[0];

        // invalid reply
        if (!/^[a-zA-Z]\d+$/.test(coords)) {
            console.log("invalid coords");
            this.awaitReply();
            return;
        }

        const action = reply.split(" ")[1];

        const letter = coords[0];
        const number = coords.substring(1);

        const [x, y] = this.alphanum2xy(letter, number);

        console.log(`input coords: [${letter}, ${number}] (${x}, ${y}) with action ${action}`);

        // out of scope cell
        if (!this.isValidCell(x, y)) {
            console.log("invalid cell");
            this.awaitReply();
            return;
        }

        // flagging
        if (["flag", "fl", "f"].includes(action)) {
            // flagging revealed cell
            if (this.getCellAt(x, y).revealed) {
                console.log("cant flag cuz is revealed!");
                this.awaitReply();
                return;
            }

            console.log("flagging");
            this.setCellAt(x, y, "flagged", !this.getCellAt(x, y).flagged);
        }
        else {
            // revealing already revealed cell
            if (this.getCellAt(x, y).revealed) {
                console.log("cant reveal cuz already revealed!");
                this.awaitReply();
                return;
            }

            // revealing flagged cell
            if (this.getCellAt(x, y).flagged) {
                console.log("cant reveal cuz flagged!");
                this.awaitReply();
                return;
            }

            console.log("revealing");

            const result = this.revealCellAt(x, y);

            // won
            if (result === 1) {
                this.sendMessage({ awaitReply: false, message: "you found all the mines and won!" });
                this.endGame();
                return;
            }

            // lost
            if (result === -1) {
                this.sendMessage({ awaitReply: false, message: "you revealed a mine and lost!" });
                this.endGame();
                return;
            }
        }

        this.sendMessage();
    }

    // converts alphanumeric coords (a, 1) to xy coords (0, 0)
    alphanum2xy(letter, number) {
        let lettersArray = "abcdefghijklmnopqrstuvwxyz";
        lettersArray = lettersArray.split("");

        let lettersObject = {};

        lettersArray.forEach((l, i) => {
            lettersObject[l] = i;
        });

        return [lettersObject[letter], number - 1];
    }

    revealCellAt(x, y) {
        const cell = this.getCellAt(x, y);
        this.setCellAt(x, y, "revealed", true);

        // if cell is mine
        if (cell.value === -1) {
            console.log("revealed mine");

            this.minesArray.forEach((m) => {
                this.setCellAt(m[0], m[1], "revealed", true);
            });

            return -1;
        }

        if (cell.value === 0) {
            const locationsToUncover = [];
            locationsToUncover.push({ x: x, y: y });
            const neighbourCoords = [{ x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: -1, y: 0 }, { x: 1, y: 0 }, { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 }];

            while (locationsToUncover.length > 0) {
                for (var i = 0; i < neighbourCoords.length; i++) {
                    let newCoord = { x: locationsToUncover[0].x + neighbourCoords[i].x, y: locationsToUncover[0].y + neighbourCoords[i].y };
                    if (!this.isValidCell(newCoord.x, newCoord.y) || this.getCellAt(newCoord.x, newCoord.y).revealed) continue;
                    this.getCellAt(newCoord.x, newCoord.y).revealed = true;

                    // continue revealing
                    if (this.getCellAt(newCoord.x, newCoord.y).value === 0) {
                        locationsToUncover.push(newCoord);
                    }
                }

                locationsToUncover.shift();
            }
        }

        if (this.checkForWin()) {
            console.log("won!");
            return 1;
        }
    }

    checkForWin() {
        let unrevealedCells = 0;

        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                let cell = this.getCellAt(x, y);

                if (!cell.revealed) {
                    unrevealedCells++;
                }
            }
        }

        return unrevealedCells === this.mines;
    }

    endGame() {
        delete this.msg.client.games[this.server.id][this.player.id];
        console.log("ended game");
    }
}

module.exports = Ms;