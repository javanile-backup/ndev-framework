/*!
 * ndev-framework
 * Copyright(c) 2016-2017 Javanile.org
 * MIT Licensed
 */

var fs = require("fs");
var ndev = require("./ndev");
var util = require("./util");

module.exports = {
    /**
     *
     *
     * @param args
     */
    run: function(args, callback) {
        if (!args || args.length === 0) { return util.err("&cmd-required"); }

        var cmd = args.shift().trim();
        var fnc = "cmd" + cmd.charAt(0).toUpperCase() + cmd.slice(1).toLowerCase();

        if (typeof ndev[fnc] === "function") {
            return ndev[fnc](args, callback);
        }

        switch (cmd) {
            case "--help":
                return this.getHelp(args); break;
            case "--version":
                return this.getVersion(); break;
            default:
                return util.err("&cmd-undefined", { cmd: cmd });
        }
    },

    /**
     *
     * @param args
     */
    getHelp: function (args) {
        var help = "help.txt";
        if (args[0] && fs.existsSync(__dirname + "/../help/" + args[0] + ".txt")) {
            help = args[0] + ".txt";
        }
        return fs.readFileSync(__dirname + "/../help/" + help);
    },

    /**
     * Get software version.
     *
     * @param args
     */
    getVersion: function () {
        var package = JSON.parse(fs.readFileSync(__dirname + "/../package.json"), "utf8");
        return package.name + "@" + package.version;
    }
};
