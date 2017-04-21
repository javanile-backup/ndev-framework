"use strict";

var ndev = require("../../../src/ndev");
var util = require("../../../src/util");
var path = require("path");
var chai = require("chai");

describe("Testing 'run' commnad", function () {
    describe("Run script on mounted modules", function () {
        it("Simple package.json script", function (done) {
            ndev.cwd = path.join(__dirname, "/../../tmp/run/");
            ndev.cmdClone(["https://github.com/javanile/nodejs-skeleton"], function(log) {
                ndev.cmdRun(["nodejs-skeleton", "script"], function(log) {
                    chai.assert.match(log, /cannolo con la ricotta/);
                    done();
                });
            });
        });
    });
});