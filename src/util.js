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
    log: function (msg, tokens) {
        return this.indent("(ndev)  ", this.applyTokens(msg, tokens));
    },

    /**
     * Print error message.
     *
     * @param msg
     */
    err: function (msg, tokens) {
        switch (msg) {
            case "&cmd-undefined": msg = "Undefined command '${cmd}', type 'ndev --help'."; break;
            case "&cmd-required":  msg = "Command required, type 'ndev --help'."; break;
        }
        return this.indent("(ndev)  ", this.applyTokens(msg, tokens));
    },

    /**
     *
     * @param token
     */
    applyTokens: function (msg, tokens) {
        for (token in tokens) {
            if (tokens.hasOwnProperty(token)) {
                msg = msg.replace("${"+token+"}", tokens[token]);
            }
        }
        return msg;
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
    trim: function (str) {
        return str.trim();
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
            callback((stdout + "\n" + stderr).trim());
        });
    }
};


