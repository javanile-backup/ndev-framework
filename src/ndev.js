/**
 *
 *
 */

var path = process.cwd();
var base = require("path").basename;
var exec = require("child_process").exec;

module.exports = {
    /**
     *
     *
     * @param args
     */
    run: function(args) {
        switch (args[0]) {
            case "clone": ndev_clone(args); break;
            case "install": ndev_install(args); break;
            case "publish": ndev_publish(args); break;
            case "project": ndev_project(args); break;
            default: console.error("(ndev) Undefined command:", args[0]);
        }
    }
};

/**
 *
 *
 * @param args
 */
function ndev_clone(args) {
    if (!args[1]) {
        console.error("(ndev) Required repository url or package name.");
        return;
    }

    //
    if (!args[1].match(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)) {
        var pack = args[1];
        var name = args[2] ? args[2] : base(repo, ".git");
        exec(__dirname + "/../exec/ndev-clone-pack.sh " + path + " " + repo + " " + name,
            function (error, stdout, stderr) {
                console.log(stderr.trim());
            }
        );
    }

    //
    var repo = args[1];
    var name = args[2] ? args[2] : basename(repo, ".git");
    exec(__dirname + "/../exec/ndev-clone.sh " + path + " " + repo + " " + name,
        function (error, stdout, stderr) {
            console.log(stderr.trim());
        }
    );
}

/**
 *
 * @param args
 */
function ndev_install(args) {
    if (!args[1]) { return e("Required package name."); }

    //
    console.log("(ndev) Please wait during install...");
    exec(__dirname + "/../exec/ndev-install.sh " + path + " " + args.slice(1).join(" "),
        function (error, stdout, stderr) {
            console.log(!stderr ? stdout.trim() : stderr.trim());
        }
    );
}

/**
 *
 * @param args
 */
function ndev_publish(args) {
    if (!args[1]) { return e("Required ndev module to publish."); }

    i("Please wait during publish...");
    var name = args[1];
    exec(__dirname + "/../exec/ndev-publish.sh " + path + " " + name,
        function (error, stdout, stderr) {
            console.log(stderr.trim(), stdout);
        }
    );
}

//
function ndev_project(args) {
    if (!args[1]) { return e("Error repository required."); }

    //
    var repo = args[1];

    //
    var name = args[2] ? args[2] : base(repo, ".git");

    //
    console.log("Please wait during project creation...");

    //
    exec(__dirname + "/../exec/ndev-project.sh " + path + " " + repo + " " + name,
        function (error, stdout, stderr) {
            console.log(stderr.trim());
        }
    );
}

/**
 *
 */
function i (msg) { console.log("(ndev)", msg); }
function e (msg) { console.error("(ndev)", msg); }







