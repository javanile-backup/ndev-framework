"use strict";

var ndev = require("../src/ndev");
var util = require("../src/util");
var assert = require("chai").assert;

describe("first test", function () {
    it("should copy the title", function (done) {

        ndev.cwd = __dirname + "/tmp/clone/";
        ndev.cmdClone(["https://github.com/javanile/declinejs"], function(out) {
            console.log(out);
            done();
        });

    });
});