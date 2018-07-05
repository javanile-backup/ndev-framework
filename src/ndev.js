/*!
 * ndev-framework
 * Copyright(c) 2016-2018 Javanile.org
 * MIT Licensed
 */

const basename = require('path').basename
    , join = require('path').join
    , util = require('./util')
    , mod = require('./mod')

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

        if (args[1] && !mod.isValidModuleName(args[1])) {
            return util.err('&invalid-module-name', {mod: args[1]})
        }

        if (util.isRepositoryName(args[0])) {
            args[0] = 'https://github.com/' + args[0]
        }

        if (util.isRepositoryUrl(args[0])) {
            var name = args[1] || basename(args[0], '.git');
            this.cmdClone(args, () => {
                this.cmdInit([name])
            })
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
    cmdClone: function (args, callback) {
        if (!args[0]) {
            return util.err('&require-repository', {cmd: 'clone'});
        }

        if (!util.isRepositoryName(args[0])) {
            args[0] = mod.getModuleRepository(args[0]);
            if (!args[0]) {
                return util.err('&invalid-repository', {cmd: 'clone', repo: args[0]});
            }
        }

        var repo = args[0].trim();
        var name = args[1] || basename(repo, '.git');

        util.info('Cloning', repo);

        this.exec('clone', [repo, name], function (resp) {
            callback(util.log(resp.trim()));
        });
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
            return util.err('&require-module', {cmd: 'publish'});
        }

        var ver = mod.versionUpdate(args[0], this.cwd);

        util.info(args[0], "Publish new version '${ver}'", {ver: ver});

        return this.exec('publish', args, callback);
    },

    /**
     *
     * @param args
     */
    cmdCommit: function (args, callback) {
        if (!args[0]) {
            return util.err('&require-module', {cmd: 'commit'});
        }

        util.info(args[0], 'Commit and push changes (git login)');

        var module = args.shift().trim();
        var message = util.ucfirst(args.join(' ').trim()) || 'Update from ' + mod.getVersion(module, this.cwd);

        return this.exec('commit', [module, message], callback);
    },

    /**
     *
     * @param args
     */
    cmdUpdate: function (args, callback) {
        if (!args[0]) {
            return util.err('&require-module', {cmd: 'update'});
        }

        util.info(args[0], 'Update source code (git login)');

        var module = args.shift().trim();

        return this.exec('update', [module], callback);
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

        var repo = mod.getModuleRepo(args[0]);

        console.log(repo);
    },

    /**
     * Execute ndev command.
     *
     * @param cmd
     * @param args
     * @param callback
     */
    exec: function (cmd, args, callback) {
        args.unshift(this.cwd)

        return util.exec(cmd, args, function (resp) {
            callback(util.log(resp));
        })
    }
};
