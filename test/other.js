"use strict";

var util = require("../src/util");
var path = require("path");
var chai = require("chai");

chai.use(require("chai-fs"));

describe("Other tests", function () {
    it("Have bin file ndev", function () {
        chai.assert.isFile(path.join(__dirname, "../bin/ndev"));
    });
});