/*!
 * ndev-framework
 * Copyright(c) 2016-2018 Javanile.org
 * MIT Licensed
 */

const fs = require('fs')
    , join = require('path').join
    , basename = require('path').basename
    , spawn = require('child_process').spawn
    , exec = require('child_process').execSync
    , col = require('colors')
    , request = require('request')
    , parse = require('url').parse
    , validate = require('validate-npm-package-name')
    , util = require('./util')

module.exports = {

    /**
     * Load package.json file for specific node module.
     *
     * @param cmd
     * @param args
     * @param callback
     */
    isValidPackageName: function (name) {
        return validate(name).validForNewPackages;
    },

    /**
     * Load package.json file for specific node module.
     *
     * @param cmd
     * @param args
     * @param callback
     */
    loadPackageJson: function (name, cwd) {
        cwd = cwd || process.cwd()
        var file = join(cwd, 'node_modules', name, 'package.json');
        return util.loadJson(file);
    },

    /**
     *
     * @param cmd
     * @param args
     * @param callback
     */
    savePackageJson: function (name, info, cwd) {
        cwd = cwd || process.cwd()
        var file = join(cwd, 'node_modules', name, 'package.json');
        util.saveJson(file, info);
    },

    /**
     *
     */
    getPackageRepository: function (name) {
        var repo = null;

        try {
            repo = exec('npm view ' + name + ' repository.url --silent')+'';
        } catch (ex) {
            // suppress any errors
        }

        return repo ? repo.replace(/^git\+https/i, 'https').trim() : null;
    },

    /**
     *
     */
    existsPackage: function (name) {
        try {
            return !!(exec('npm search ' + name + ' --parseable')+'')
        } catch (ex) {
            return false
        }
    },

    /**
     * Get version number of module.
     */
    getVersion: function (name, cwd) {
        var info = this.loadPackageJson(name, cwd);
        if (typeof info["version"] != "undefined" && info["version"]) {
          return info["version"];
        }
        return "0.0.0";
    },

    /**
     * Update version number by smallest unit.
     */
    versionUpdate: function (name, cwd) {
        var info = this.loadPackageJson(name, cwd);
        var verOld = info.version.split(".");
        verOld[verOld.length - 1] = parseInt(verOld[verOld.length - 1]) + 1;
        info.version = verOld.join(".");
        this.savePackageJson(name, info, cwd);
        return info.version;
    },

    /**
     * Check is valid repository url.
     */
    getPackageNameFromRepository: function (url, cb) {
        url = parse(url);
        switch (url.host) {
            case 'github.com':
                url.packageJson = 'https://raw.githubusercontent.com'
                    + url.path.replace(/\.git$/, '') + '/master/package.json'
                break
        }
        request.get(url.packageJson, (error, response, body) => {
            var defaultName = basename(url.path, '.git')
            if (!error && response.statusCode == 200) {
                cb(JSON.parse(body).name || defaultName)
            } else {
                cb(defaultName)
            }
        });
    }
}