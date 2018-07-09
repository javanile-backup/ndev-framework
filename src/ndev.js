/*!
 * ndev-framework
 * Copyright(c) 2016-2018 Javanile.org
 * MIT Licensed
 */

const basename = require('path').basename
    , exec = require('child_process').execSync
    , join = require('path').join
    , util = require('./util')
    , repo = require('./repo')
    , pack = require('./pack')

module.exports = {

    /**
     * Contain current working direcotry.
     *
     * @var string
     */
    cwd: process.cwd(),

    /**
     * Init new module and setup template files.
     *
     * @param args
     */
    cmdInit: function (args, callback) {
        if (!args[0]) {
            return util.err('&require-module-or-repository', {cmd: 'init'})
        }

        // check if require clone before
        if (repo.isRepositoryName(args[0]) || repo.isRepositoryUrl(args[0])) {
            var name = args[1] || basename(args[0], '.git');
            if (!util.dirExists(join(this.cwd, 'ndev_modules', name))) {
                return this.cmdClone(args, (err) => {
                    if (!err) {
                        args[0] = name
                        this.runInit(args)
                    }
                })
            }
        }

        //
        var name = args[1] || args[0];
        var moduleDir = join(this.cwd, 'ndev_modules', name)

        //
        var packageJsonFile = join(moduleDir, 'package.json')
        if (!util.fileExists(packageJsonFile)) {
            util.info(args[0], "Create 'package.json' file.")
            var data = util.loadJson(join(__dirname, '../tpl/package.json'))
            data.name = basename(args[0])
            try {
                data.author.name = (exec('cd ' + moduleDir + '&& git config user.name')+'').trim()
                data.author.email = (exec('cd ' + moduleDir + '&& git config user.email')+'').trim()
                data.repository.url = (exec('cd ' + moduleDir + '&& git config --get remote.origin.url')+'').trim()
            } catch (e) {
                console.log(e);
                util.err("Check manually 'ndev_modules/" + name + "/package.json' file.");
            }
            util.saveJson(packageJsonFile, data);
        }
    },

    /**
     * Run ndev module package.json scripts.
     *
     * @param args
     */
    cmdRun: function (args, callback) {
        if (!args[0]) {
            return util.err('&require-module', {cmd: 'run'});
        }
        if (!args[1]) {
            return util.err('&require-script', {cmd: 'run'});
        }

        util.info(args[0], 'Executing: \'npm run ${script}\'', {script: args[1]});

        return this.exec('run', args, callback);
    },

    /**
     * Run ndev module package.json scripts.
     *
     * @param args
     */
    cmdSetup: function (args, callback) {
        if (!args[0]) {
            return util.err('&require-module', {cmd: 'run'});
        }

        util.info(args[0], 'Setup in progress...');

        return this.exec('setup', args, callback);
    },

    /**
     * Run ndev module package.json scripts.
     *
     * @param args
     */
    cmdFix: function (args, callback) {
        if (!args[0]) {
            return util.err('&require-module', {cmd: 'fix'});
        }

        util.info(args[0], 'ESLint fix...');

        return this.exec('fix', args, callback);
    },

    /**
     * Test command.
     *
     * @param args
     */
    cmdTest: function (args, callback) {
        if (!args[0]) {
            return util.err('&require-module', {cmd: 'test'});
        }

        if (!args[1]) {
            util.info(args[0], 'Testing by \'npm run test\'');
            return this.exec('npm-run-test', args, callback);
        }

        args[1] = 'test/' + args[1] + '-test.js';
        util.info(args[0], 'Testing file \'${file}\' by ndev-framework', {file: args[1]});

        return this.exec('test-file', args, callback);
    },

    /**
     * Clone repository and mount as ndev module.
     *
     * @param args
     */
    cmdClone: function (args, cb) {
        console.log(args)
        if (!args[0]) {
            return cb(util.err('&require-repository', {cmd: 'clone'}))
        }

        if (args[1] && !pack.isValidPackageName(args[1])) {
            return cb(util.err('&invalid-module-name', {mod: args[1]}))
        }

        if (repo.isRepositoryName(args[0])) {
            args[0] = 'https://github.com/' + args[0]
        }

        if (repo.isRepositoryUrl(args[0])) {
            return util.urlExists(args[0], (exists) => {
                if (exists) {
                    pack.getPackageNameFromRepository(args[0], (name) => {
                        var alias = args[1] || basename(args[0], '.git');
                        util.info(name, 'Cloning ' + args[0]);
                        this.exec('clone', [args[0], name, alias], (err) => {
                            console.log('clone ret', err)
                            return cb(err);
                        })
                    })
                } else {
                    return cb(util.err('&unreachable-repository-url', { url: args[0] }))
                }
            })
        }

        if (!pack.isValidPackageName(args[0])) {
            return cb(util.err('&invalid-module-name', {mod: args[0]}))
        }

        if (!pack.existsPackage(args[0])) {
            return cb(util.err('&module-not-exists', {mod: args[0]}))
        }

        args[0] = pack.getPackageRepository(args[0]);
        if (!args[0]) {
            return cb(util.err('&repository-not-found'));
        }

        return this.cmdClone(args, cb)
    },

    /**
     *
     *
     * @param args
     */
    cmdMount: function (args, callback) {
        if (!args[0]) {
            return util.err('&require-repository', {cmd: 'mount'});
        }

        util.info(args[0], 'Mounting...');

        return this.exec('mount', args, callback);
    },

    /**
     *
     *
     * @param args
     */
    cmdPurge: function (args, callback) {
        if (!args[0]) {
            return util.err('&require-repository', {cmd: 'purge'});
        }

        util.info(args[0], 'Purge...');

        return this.exec('purge', args, callback);
    },

    /**
     *
     * @param args
     */
    cmdInstall: function (args, callback) {
        util.info('running', 'npm install ' + args.join(' '));
        return this.exec('install', args, callback);
    },

    /**
     *
     * @param args
     */
    cmdFreeze: function (args, callback) {
        var path = null;

        if (!args[0]) {
            util.info('freeze', 'Freezing all ndev modules...');
            return this.exec('freeze-all', args, callback);
        }

        path = join(this.cwd, 'node_modules', '.' + args[0]);
        if (util.dirExists(path)) {
            return util.err('Module \'${mod}\' already freeze.', {mod: args[0]});
        }

        path = join(this.cwd, 'node_modules', args[0]);
        if (!util.dirExists(path)) {
            return util.err('Module \'${mod}\' not found.', {mod: args[0]});
        }

        util.info(args[0], 'Freezing...');

        return this.exec('freeze', args, callback);
    },

    /**
     *
     * @param args
     */
    cmdUnfreeze: function (args, callback) {
        var path = null;
        if (!args[0]) {
            util.info('unfreeze', 'Unfreezing all ndev modules...');
            return this.exec('unfreeze-all', args, callback);
        }

        path = join(this.cwd, 'node_modules', args[0]);
        if (util.dirExists(path)) {
            return util.err('Module \'${mod}\' already unfreeze.', {mod: args[0]});
        }

        path = join(this.cwd, 'node_modules', '.' + args[0]);
        if (!util.dirExists(path)) {
            return util.err('Missing module freeze for \'${mod}\'.', {mod: args[0]});
        }

        util.info(args[0], 'Unfreezing...');

        return this.exec('unfreeze', args, callback);
    },

    /**
     *
     * @param args
     */
    cmdPublish: function (args, callback) {
        if (!args[0]) {
            return util.err('&require-module', {cmd: 'publish'})
        }

        var ver = pack.versionUpdate(args[0], this.cwd)
        var name = args[0].trim()

        if (!util.dirExists(join(this.cwd, 'ndev_modules', name))) {
            return cb(util.err('&package-not-found', { pack: name }))
        }

        util.info(name, "Publish new version '${ver}'", {ver: ver});

        return this.exec('publish', args, callback);
    },

    /**
     * Commit package changes on repository.
     *
     * @param args
     */
    cmdCommit: function (args, cb) {
        if (!args[0]) {
            return util.err('&require-package', {cmd: 'commit'});
        }

        var name = args.shift().trim();
        var info = util.ucfirst(args.join(' ').trim()) || 'Update from ' + pack.getVersion(name, this.cwd);

        if (!util.dirExists(join(this.cwd, 'ndev_modules', name))) {
            return cb(util.err('&package-not-found', { pack: name }));
        }

        util.info(name, 'Commit and push changes (git login)');

        return this.exec('commit', [name, info], cb);
    },

    /**
     *
     * @param args
     */
    cmdUpdate: function (args, callback) {
        if (!args[0]) {
            return util.err('&require-package', {cmd: 'update'});
        }

        var name = args.shift().trim();

        if (!util.dirExists(join(this.cwd, 'ndev_modules', name))) {
            return cb(util.err('&package-not-found', { pack: name }));
        }

        util.info(args[0], 'Update source code (git login)');

        return this.exec('update', [name], callback);
    },

    /**
     *
     * @param args
     */
    cmdRequire: function (args, callback) {
        return this.exec('require', args, callback);
    },

    /**
     *
     * @param args
     */
    cmdInfo: function (args, callback) {
        if (!args[0]) { return util.err('&require-module', {cmd: 'info'}) }

        var repo = pack.getModuleRepo(args[0]);

        console.log(repo);
    },

    /**
     * Execute ndev exec command.
     *
     * @param cmd
     * @param args
     * @param callback
     */
    exec: function (cmd, args, cb) {
        args.unshift(this.cwd)

        return util.exec(cmd, args, (err) => {
            cb(err);
        })
    }
}
