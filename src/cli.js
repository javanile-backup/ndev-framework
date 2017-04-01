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
        if (!args || args.length === 0) { util.err("&cli-required"); }

        var cmd = args.shift();

        switch (cmd) {
            case "test": return ndev.cmdTest(args, callback); break;
            case "clone": return ndev.cmdClone(args, callback); break;
            case "mount": return ndev.cmdMount(args, callback); break;
            case "commit": return ndev.cmdCommit(args, callback); break;
            case "freeze": return ndev.cmdFreeze(args, callback); break;
            case "install": return ndev.cmdInstall(args, callback); break;
            case "publish": return ndev.cmdPublish(args, callback); break;

            case "--version": return this.getVersion(); break;
            case "--help": return this.getHelp(args); break;

            default: return util.err("Undefined command: " + cmd);
        }
    }
};
