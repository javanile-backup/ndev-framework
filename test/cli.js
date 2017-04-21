"use strict";

var cli  = require("../src/cli");
var ndev = require("../src/ndev");
var util = require("../src/util");
var chai = require('chai');

chai.use(require('chai-fs'));

describe("Testing command-line interface", function () {

    it("Not arguments", function () {
        var message = cli.run([]);
        chai.assert.match(message, /ndev --help/, "Not an help message");
    });

    it("Unknown command", function () {
        chai.assert.match(cli.run(['unknown']), /ndev --help/, "Not an help message");
    });

    it("Call help", function () {
        chai.assert.match(cli.run(["--help"]), /Usage:/, "Help not match");
    });

    it("Call command help", function () {
        var help = cli.run(["--help", "clone"]);
        chai.assert.match(help, /Usage: ndev clone/, "Command help not match");
    });

    it("Call undefined command help", function () {
        var message = cli.run(["--help", "unknown"]);
        chai.assert.match(message, /Undefined command/, "Command help not match");
    });

    it("Call version", function () {
        var version = cli.run(["--version"]);
        chai.assert.match(version, /[0-9]+\.[0-9]+\.[0-9]+/, "Version not match");
    });

    it("Call existing command", function () {
        var version = cli.run(["test"]);
        chai.assert.match(version, /\(ndev\)/, "Problem to call command");
    });

});