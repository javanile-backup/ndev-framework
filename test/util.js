"use strict";

var util = require("../src/util");
var chai = require("chai");

describe("Testing util library", function () {
    it("Test applyTokens", function () {
        var message = util.applyTokens("${token1}${token2}", {
            token1: "1",
            token2: "2"
        })
        chai.assert.equal(message, "12");
    });
});