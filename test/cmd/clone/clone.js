"use strict";

var ndev = require("../../../src/ndev");
var util = require("../../../src/util");
var path = require("path");
var chai = require("chai");

chai.use(require("chai-fs"));

describe("Testing 'clone' commnad", function () {
    describe("Clone by repository url", function () {
        it("Test folders and files exists", function (done) {
            ndev.cwd = path.join(__dirname, "/../../tmp/clone/");
            ndev.cmdClone(["https://github.com/javanile/nodejs-skeleton"], function(log) {
                chai.assert.isDirectory(ndev.cwd + "/ndev_modules/declinejs/");
                chai.assert.isFile(ndev.cwd + "/ndev_modules/declinejs/LICENSE");
                done();
            });
        });
    });
});