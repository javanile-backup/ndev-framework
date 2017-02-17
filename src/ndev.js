
//
var exec     = require("child_process").exec;
var basename = require("path").basename;

//
module.exports = {

    //
    run: function(args) {

        //
        var tool = args[0];

        //
        switch (tool) {
            case "clone": return ndev_clone(args);
            default: console.error("Undefined tool:", tool);
        }
    }
}

//
function ndev_clone(args) {

    //
    var path = process.cwd();

    //
    if (!args[1]) {
        console.error("Error repository required.");
        return;
    }

    //
    var repo = args[1];

    //
    var name = args[2] ? args[2] : basename(repo, ".git");

    //
    exec(__dirname + "/../exec/ndev-clone.sh " + path + " " + repo + " " + name,
        function (error, stdout, stderr) {
            console.log(stderr.trim());
        }
    );
}




