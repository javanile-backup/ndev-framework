
//
var exec = require("child_process").exec;

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

    var path = process.cwd();

    var repo = args[1];

    var name = args[2];

    exec(__dirname + "/../exec/ndev-clone.sh " + path + " " + repo + " " + name,
        function (error, stdout, stderr) {
            console.log(stderr.trim());
        }
    );
}




