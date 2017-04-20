"use strict";

var ndev = require("../src/ndev");
var util = require("../src/util");
var assert = require("chai").assert;

describe("first test", function () {
    it("should copy the title", function () {

        ndev.cwd = __basename + "/"
        ndev.cmdClone();

    });
});