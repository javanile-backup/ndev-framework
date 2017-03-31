
var ndev = requrie("./ndev");
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
            case "test": return ndev.clone(args); break;
            case "clone": return ndev.clone(args); break;
            case "mount": return ndev.mount(args); break;
            case "commit": return ndev.commit(args); break;
            case "install": return ndev.install(args); break;
            case "publish": return ndev.publish(args); break;

            case "--help": return ndev.publish(args); break;
            case "--version": return ndev.publish(args); break;

            default: return util.err("Undefined command: " + cmd);
        }
    }
};
