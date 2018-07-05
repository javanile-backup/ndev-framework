/*!
 * ndev-framework
 * Copyright(c) 2016-2018 Javanile.org
 * MIT Licensed
 */

const fs = require('fs')
    , join = require('path').join
    , spawn = require('child_process').spawn
    , exec = require('child_process').execSync
    , col = require('colors')
    , validate = require('validate-npm-package-name')

module.exports = {

    /**
     * Load package.json file for specific node module.
     *
     * @param cmd
     * @param args
     * @param callback
     */
    isValidModuleName: function (module) {
        return validate(module);
    },

    /**
     * Load package.json file for specific node module.
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
    },

    /**
     *
     */
    getModuleRepo: function (module) {
        var repo = null;
        try {
            repo = exec('npm view ' + module + ' repository.url --silent')+'';
        } catch (ex) {}
        return repo ? repo.replace(/^git\+https/i, 'https') : null;
    },

    /**
     * Get version number of module.
     */
    getVersion: function (module) {
        var info = this.loadPackageJson(module);
        if (typeof info["version"] != "undefined" && info["version"]) {
          return info["version"];
        }
        return "0.0.0";
    },

    /**
     * Update version number by smallest unit.
     */
    versionUpdate: function (module) {
        var info = this.loadPackageJson(module);
        var verOld = info.version.split(".");
        verOld[verOld.length - 1] = parseInt(verOld[verOld.length - 1]) + 1;
        info.version = verOld.join(".");
        this.savePackageJson(module, info);
        return info.version;
    }
}