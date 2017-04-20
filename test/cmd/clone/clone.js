"use strict";

var ndev = require("../../../src/ndev");
var util = require("../../../src/util");
var assert = require("chai").assert;

describe("Testing 'clone' commnad", function () {
    describe("Clone by repository url", function () {
        it("Test folders and files exists", function () {
            ndev.cwd = __dirname + "/tmp/clone/";
            ndev.cmdClone(["https://github.com/javanile/declinejs"], function(log) {
                console.log(log);
                chai.assert.isDirectory(ndev.cwd + "/ndev_modules/declinejs/");
                chai.assert.isFile(ndev.cwd + "/ndev_modules/declinejs/LICENSE");
                done();
            });
        });
    });
});