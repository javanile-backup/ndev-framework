/*!
 * ndev-framework
 * Copyright(c) 2016-2017 Javanile.org
 * MIT Licensed
 */

var base = require("path").basename;
var join = require("path").join;
var util = require("./util");

module.exports = {

    /**
     * Contain current working direcotry.
     * @var string
     */
    cwd: process.cwd(),

    /**
     * Run ndev module package.json scripts.
     *
     * @param args
     */
    cmdRun: function (args, callback) {
        if (!args[0]) { return util.err("&require-module", {cmd: "run"}); }
        if (!args[1]) { return util.err("&require-script", {cmd: "run"}); }

        var script = args[1].trim();

        util.info(args[0], "npm run ${script}", {script: script});

        return this.exec("run", args, callback);
    },

    /**
     * Run ndev module package.json scripts.
     *
     * @param args
     */
    cmdSetup: function (args, callback) {
        if (!args[0]) { return util.err("&require-module", {cmd: "run"}); }

        util.info(args[0], "setup in progress . . .");

        return this.exec("setup", args, callback);
    },

    /**
     * Test command.
     *
     * @param args
     */
    cmdTest: function (args, callback) {
        if (!args[0]) { return util.err("&require-module"); }

        if (!args[1]) {
            util.info(args[0], "Testing by 'npm run test'");
            return this.exec("npm-run-test", args, callback);
        }

        args[1] = 'test/' + args[1] + '-test.js';
        util.info(args[0], "Testing file '${file}' by ndev-framework", {file: args[1]});

        return this.exec("test-file", args, callback);
    },

    /**
     * Clone repository and mount as ndev module.
     *
     * @param args
     */
    cmdClone: function (args, callback) {
        if (!args[0]) { return util.err("&require-repository", {cmd: "clone"}); }

        if (!util.isRepo(args[0])) {
            args[0] = util.getModuleRepo(args[0]);
            if (!args[0]) {
                return util.err("&invalid-repository", {cmd: "clone", repo: args[0]});
            }
        }

        var repo = args[0].trim();
        var name = args[1] || base(repo, ".git");

        util.info("cloning", repo);

        this.exec("clone", [repo, name], function (resp) {
            callback(util.log(resp.trim()));
        });
    },

    /**
     *
     *
     * @param args
     */
    cmdMount: function (args, callback) {
        return this.cmdWithModule(
            "mount", "mount module: ${ndev_module}", args, callback
        );
    },

    /**
     *
     * @param args
     */
    cmdInstall: function (args, callback) {
        return this.cmdWithArgs("install", "Wait during install...", args, callback);
    },

    /**
     *
     * @param args
     */
    cmdFreeze: function (args, callback) {
        return this.cmdWithModule("freeze", "freeze", args, callback);
    },

    /**
     *
     * @param args
     */
    cmdUnfreeze: function (args, callback) {
        return this.cmdWithModule("unfreeze", "freeze", args, callback);
    },

    /**
     *
     * @param args
     */
    cmdPublish: function (args, callback) {
        if (!args[0]) { return util.err("&ndev-required"); }
        var info = this.loadPackageJson(args[0]);
        var verOld = info.version.split(".");
        verOld[verOld.length - 1] = parseInt(verOld[verOld.length - 1]) + 1;
        info.version = verOld.join(".");
        this.savePackageJson(args[0], info);
        return this.cmdWithModule("publish", "publish module: ${ndev_module}", args, callback);
    },

    /**
     *
     * @param args
     */
    cmdCommit: function (args, callback) {
        return this.cmdWithModule("commit", "commit module: ${ndev_module}", args, callback);
    },

    /**
     *
     * @param args
     */
    cmdRequire: function (args, callback) {
        return this.cmdWithModule("require", "require module: ${ndev_module}", args, callback);
    },

    /**
     *
     * @param args
     */
    cmdInfo: function (args, callback) {
        if (!args[0]) { return util.err("&require-module", {cmd: "info"}); }

        var repo = util.getModuleRepo(args[0]);

        console.log(repo);
    },

    /**
     *
     * @param cmd
     * @param args
     * @param callback
     */
    cmdWithModule: function (cmd, msg, args, callback) {
        if (!args[0]) { return util.err("&ndev-required"); }

        var ndev_module = args.shift().trim();

        args.unshift(ndev_module);
        args.unshift(this.cwd);

        util.exec(cmd, args, function(resp) {
            callback(util.log(util.trim(msg + "\n" + resp), {
                ndev_module: ndev_module
            }));
        });
    },

    /**
     *
     * @param cmd
     * @param args
     * @param callback
     */
    cmdWithArgs: function (cmd, msg, args, callback) {
        args.unshift(this.cwd);

        util.exec(cmd, args, function(resp) {
            callback(util.log(resp));
        });

        return util.log(msg);
    },

    /**
     *
     * @param cmd
     * @param args
     * @param callback
     */
    exec: function (cmd, args, callback) {
        args.unshift(this.cwd);

        util.exec(cmd, args, function(resp) {
            callback(util.log(resp));
        });

        return;
    },

    /**
     *
     * @param cmd
     * @param args
     * @param callback
     */
    loadPackageJson: function (module) {
        var file = join(this.cwd, 'node_modules', module, 'package.json');
        return util.loadJson(file);
    },

    /**
     *
     * @param cmd
     * @param args
     * @param callback
     */
    savePackageJson: function (module, info) {
        var file = join(this.cwd, 'node_modules', module, 'package.json');
        util.saveJson(file, info);
    }
}