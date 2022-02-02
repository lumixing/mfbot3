module.exports = {
    async execute(Discord, client, msg, args, flags) {
        const a = parseFloat(args[0]);
        const b = parseFloat(args[1]);
        const c = parseFloat(args[2]);

        if (!a || !b || !c) {
            msg.reply(`you need to enter a, b and c for the equation!`);
            return;
        }

        const d = b ** 2 - 4 * a * c;

        let x;

        if (d < 0) msg.reply(`Δ: ${d}\nx: indefinite`);
        else if (d === 0) msg.reply(`Δ: ${d}\nx: ${x = -b / 2 * a}`);
        else msg.reply(`Δ: ${d}\nx: ${(-b + Math.sqrt(d)) / 2 * a}\n   ${(-b - Math.sqrt(d)) / 2 * a}`);

    },
    name: "quad",
    description: "calculate quadratic equation",
    aliases: ["q", "quadratic"],
    flags: [],
    syntax: "quad [a] [b] [c]",
    permissions: []
}