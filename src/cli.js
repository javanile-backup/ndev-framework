/*!
 * ndev-framework
 * Copyright(c) 2016-2017 Javanile.org
 * MIT Licensed
 */

var ndev = require("./ndev");
var util = require("./util");

module.exports = {
    /**
     *
     *
     * @param args
     */
    run: function(args, callback) {
        if (!args || args.length === 0) { util.err("&cmd-required"); }

        var cmd = args.shift().trim();
        var fnc = "cmd" + cmd.charAt(0).toUpperCase() + cmd.slice(1).toLowerCase();

        if (typeof ndev[fnc] === "function") {
            return ndev[fnc](args, callback);
        }

        switch (cmd) {
            case "--help":
                return ndev.getHelp(args); break;
            case "--version":
                return ndev.getVersion(); break;
            default:
                return util.err("&cmd-undefined", { cmd: cmd });
        }
    }
};
