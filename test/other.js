"use strict";

var util = require("../src/util");
var chai = require("chai");

describe("Other tests", function () {
    it("Simple test", function () {
        chai.assert.equal(util.pad(2), "  ");
    });
});