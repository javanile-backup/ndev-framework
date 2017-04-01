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
    run: function(args) {
        if (!args || args.length === 0) { util.err("&cli-required"); }

        var cmd = args.shift();

        switch (cmd) {
            case "test": return ndev.cmdTest(args); break;
            case "clone": return ndev.cmdClone(args); break;
            case "mount": return ndev.cmdMount(args); break;
            case "commit": return ndev.cmdCommit(args); break;
            case "install": return ndev.cmdInstall(args); break;
            case "publish": return ndev.cmdPublish(args); break;

            case "--version": return this.getVersion(); break;
            case "--help": return this.getHelp(args); break;

            default: return util.err("Undefined command: " + cmd);
        }
    }
};
