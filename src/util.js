/*!
 * ndev-framework
 * Copyright(c) 2016-2017 Javanile.org
 * MIT Licensed
 */

var fs = require("fs");
var join = require("path").join;
var spawn = require("child_process").spawn;
var exec = require("child_process").execSync;
var col = require("colors");

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
     * Print info message.
     *
     * @param msg
     */
    info: function (key, msg, tokens) {
        console.log(
            this.indent(
                col.yellow.bold("<<info>> "+key+": "),
                col.white(this.applyTokens(msg, tokens))
            )
        );
    },

    /**
     * Print error message.
     *
     * @param msg
     */
    err: function (msg, tokens) {
        switch (msg) {
            case "&require-command": msg = "Missing command, type 'ndev --help'."; break;
            case "&require-script": msg = "Missing script name, type 'ndev --help ${cmd}'."; break;
            case "&require-module": msg = "Missing module name, type 'ndev --help ${cmd}'."; break;
            case "&cmd-undefined": msg = "Undefined command '${cmd}', type 'ndev --help'."; break;
        }
        return this.indent(col.red.bold("<<error>> "), col.white(this.applyTokens(msg, tokens)));
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
     * Upper case first char.
     *
     * @param str
     */
    ucfirst: function (str) {
        return str ? str.charAt(0).toUpperCase() + str.substr(1) : "";
    },

    /**
     * Check is valid repository url.
     */
    isRepo: function (repo) {
        return repo.match(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/);
    },

    /**
     *
     */
    getModuleRepo: function (module) {
        var repo = null;
        try {
            repo = exec("npm view " + module + " repository.url --silent")+"";
        } catch (ex) {}
        return repo ? repo.replace(/^git\+https/i, "https") : null;
    },

    /**
     *
     */
    exec: function (cmd, args, callback) {
        var ext = ".sh";
        var script = join(__dirname, "../exec/ndev-" + cmd + ext);
        var rawCommand = cmd + " " + args.join(" ");

        // Running command
        var wrapper = spawn(script, args);

        // Attach stdout handler
        wrapper.stdout.on("data", function (data) {
            process.stdout.write(data.toString());
        });

        // Attach stderr handler
        wrapper.stderr.on("data", function (data) {
            process.stdout.write(data.toString());
        });

        // Attach exit handler
        wrapper.on("exit", function (code) {
            var code = code.toString();
        });

        return rawCommand;
    },

    /**
     *
     * @param file
     */
    loadJson: function (file) {
        return require(file);
    },

    /**
     *
     * @param file
     * @param info
     */
    saveJson: function (file, info) {
        fs.writeFileSync(file, JSON.stringify(info, null, 4));
    },

    /**
     *
     */
    dirExists: function (path) {
        return fs.existsSync(path);
    }
};
