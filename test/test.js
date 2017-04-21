"use strict";

var ndev = require("../src/ndev");
var util = require("../src/util");
var chai = require('chai');

chai.use(require('chai-fs'));

describe("test/test.js: ", function () {
    it("should copy the title", function () {
        /*
        ndev.cwd = __dirname + "/tmp/clone/";
        ndev.cmdClone(["https://github.com/javanile/declinejs"], function(log) {
            console.log(log);
            chai.assert.isDirectory(ndev.cwd + "/ndev_modules/declinejs/");
            chai.assert.isFile(ndev.cwd + "/ndev_modules/declinejs/LICENSE");
            done();
        });*/
    });
});