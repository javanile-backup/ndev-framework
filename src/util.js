/*!
 * ndev-framework
 * Copyright(c) 2016-2017 Javanile.org
 * MIT Licensed
 */

module.exports = {
    /**
     * Print info message.
     *
     * @param msg
     */
    log: function (msg) {
        return this.indent("(ndev) ", msg);
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
    }
};


