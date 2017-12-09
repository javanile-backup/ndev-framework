/*!
 * ndev-framework
 * Copyright(c) 2016-2017 Javanile.org
 * MIT Licensed
 */

var fs = require("fs"),
    path = require("path"),
    ndev = require("./ndev"),
    util = require("./util");

module.exports = {

    /**
     * Command line entry point.
     *
     * @param args
     */
    run: function(args, callback) {
        if (!args || args.length === 0) { return util.err("&require-command"); }

        var cmd = args.shift().trim();
        var fnc = "cmd" + cmd.charAt(0).toUpperCase() + cmd.slice(1).toLowerCase();

        if (typeof ndev[fnc] === "function") {
            return ndev[fnc](args, callback);
        }

        switch (cmd) {
            case "--help":
                return this.getHelp(args);
            case "--version":
                return this.getVersion();
        }

        return util.err("&cmd-undefined", { cmd: cmd });
    },

    /**
     * Get software help.
     *
     * @param args
     */
    getHelp: function (args) {
        var help = path.join(__dirname, "../help/help.txt");
        if (!args[0]) { console.log(fs.readFileSync(help)+""); }
        help = path.join(__dirname, "../help/" + args[0] + ".txt");
        if (fs.existsSync(help)) { return console.log(fs.readFileSync(help)+""); }
        return util.err("&cmd-undefined", { cmd: args[0] });
    },

    /**
     * Get software version.
     *
     * @param args
     */
    getVersion: function () {
        var info = JSON.parse(fs.readFileSync(path.join(__dirname, "../package.json")), "utf8");
        util.info("ndev-framework " + info.version, "developed by Francesco Bianco <bianco@javanile.org>");
        return info.name + "@" + info.version;
    }
};
