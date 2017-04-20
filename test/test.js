"use strict";

var ndev = require("../src/ndev");
var util = require("../src/util");
var chai = require('chai');

chai.use(require('chai-fs'));

describe("first test", function () {
    it("should copy the title", function (done) {
        ndev.cwd = __dirname + "/tmp/clone/";
        ndev.cmdClone(["https://github.com/javanile/declinejs"], function(out) {
            chai.assert.isDirectory(ndev.cwd + "/ndev_modules/declinejs/");
            chai.assert.isFile(ndev.cwd + "/ndev_modules/declinejs/LICENSE");
            done();
        });
    });
});