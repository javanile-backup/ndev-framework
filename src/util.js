/*!
 * ndev-framework
 * Copyright(c) 2016-2017 Javanile.org
 * MIT Licensed
 */

var join = require("path").join;
var exec = require("child_process").exec;

module.exports = {
    /**
     * Print info message.
     *
     * @param msg
     */
    log: function (msg) {
        return this.indent("(ndev)  ", msg);
    },

    /**
     * Print error message.
     *
     * @param msg
     */
    err: function (msg, args) {
        switch (msg) {
            case "@command-required": msg = "Command required, type 'ndev --help'.";
        }
        return this.indent("(ndev)  ", msg);
    },

    /**
     *
     */
    indent: function (pre, msg) {
        return pre + msg.split("\n").join("\n" + this.pad(pre.length));
    },

    /**
     *
     */
    pad: function (len) {
        var str = "";
        for (var i = 0; i < len; i++) { str += " "; }
        return str;
    },

    /**
     *
     */
    exec: function (cmd, args, callback) {
        var ext = ".sh";
        var script = join(__dirname, "../exec/ndev-" + cmd + ext);
        var params = args.length > 0 ? args.join(" ") : "";

        exec(script + " " + params, function (error, stdout, stderr) {
            //if (error) { console.error(error); }
            callback(stderr ? stderr : stdout);
        });
    }
};


