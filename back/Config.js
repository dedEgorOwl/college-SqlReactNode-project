const cfg = require("./config.json");

module.exports = class Config {
    static getData = () => {
        return cfg;
    }
}