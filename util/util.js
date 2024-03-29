const _ = require("underscore");

module.exports = {
    hasFlag(flags, key) {
        return Boolean(flags.find((f) => f.key === key));
    },
    getFlagValue(flags, key) {
        // weird error for now ill ignore
        // if (!this.hasFlag(flags, key)) {
        //     return console.error(`key "${key}" does not exist in flags`);
        // }

        return flags.find((f) => f.key === key).value;
    },
    randomInteger(min, max) {
        return ~~(Math.random() * (max - min) + min);
    },
    randomFloat(min, max) {
        return Math.random() * (max - min) + min;
    },
    setDefaults(options, defaults) {
        return _.defaults({}, _.clone(options), defaults);
    }
}