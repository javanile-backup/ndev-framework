/*!
 * ndev-framework
 * Copyright(c) 2016-2017 Javanile.org
 * MIT Licensed
 */

var base = require("path").basename;
var exec = require("child_process").exec;
var util = require("./util");

module.exports = {
    /**
     *
     *
     */
    cwd: process.cwd(),

    /**
     *
     * @param args
     */
    cmdTest: function (args, callback) {
        return this.cmdWithNdevModule(
            "test", "testing: ${ndev_module}", args, callback
        );
    },

    /**
     *
     *
     * @param args
     */
    cmdClone: function (args, callback) {
        var self = this;

        if (!args[0]) {
            console.error("(ndev) Required repository url or package name.");
            return;
        }

        //
        /*
        if (!args[1].match(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)) {
            var pack = args[1];
            var name = args[2] ? args[2] : base(repo, ".git");

            util.exec("clone", [this.cwd, repo, name], function(resp) {
                callback(util.log(msg + "\n" + resp.trim(), {
                    ndev_module: ndev_module
                }));
            });

            exec(__dirname + "/../exec/ndev-clone-pack.sh " + path + " " + repo + " " + name,
                function (error, stdout, stderr) {
                    console.log("(ndev)", stderr.trim());
                }
            );
        }
        */

        var repo = args[0].trim();
        var name = args[1] || base(repo, ".git");

        util.exec("clone", [self.cwd, repo, name], function (resp) {
            callback(util.log(resp.trim()));
        });
    },

    /**
     *
     *
     * @param args
     */
    cmdMount: function (args, callback) {
        return this.cmdWithNdevModule(
            "mount", "mount module: ${ndev_module}", args, callback
        );
    },

    /**
     *
     * @param args
     */
    cmdInstall: function (args) {
        if (!args[1]) {
            return e("Required package name.");
        }

        //
        console.log("(ndev) Please wait during install...");
        exec(join(__dirname, + "/../exec/ndev-install.sh ")  + path + " " + args.slice(1).join(" "),
            function (error, stdout, stderr) {
                console.log(!stderr ? stdout.trim() : stderr.trim());
            }
        );
    },

    /**
     *
     * @param args
     */
    cmdFreeze: function (args, callback) {
        return this.cmdWithNdevModule(
            "freeze", "freeze", args, callback
        );
    },

    /**
     *
     * @param args
     */
    cmdUnfreeze: function (args, callback) {
        return this.cmdWithNdevModule(
            "unfreeze", "freeze", args, callback
        );
    },

    /**
     *
     * @param args
     */
    cmdPublish: function (args) {
        if (!args[1]) {
            return e("Required ndev module to publish.");
        }

        i("Please wait during publish...");
        var name = args[1];
        exec(__dirname + "/../exec/ndev-publish.sh " + path + " " + name,
            function (error, stdout, stderr) {
                console.log(stderr.trim(), stdout);
            }
        );
    },

    /**
     *
     * @param args
     */
    cmdCommit: function (args, callback) {
        return this.cmdWithNdevModule(
            "commit", "commit module: ${ndev_module}", args, callback
        );
    },

    /**
     *
     * @param args
     */
    cmdRequire: function (args, callback) {
        return this.cmdWithNdevModule(
            "require", "require module: ${ndev_module}", args, callback
        );
    },

    /**
     *
     * @param cmd
     * @param args
     * @param callback
     */
    cmdWithNdevModule: function (cmd, msg, args, callback) {
        if (!args[0]) { return util.err("&ndev-required"); }

        var ndev_module = args.shift().trim();

        args.unshift(ndev_module);
        args.unshift(this.cwd);

        util.exec(cmd, args, function(resp) {
            callback(util.log(msg + "\n" + resp.trim(), {
                ndev_module: ndev_module
            }));
        });
    }
}