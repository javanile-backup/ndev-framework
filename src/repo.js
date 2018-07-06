/*!
 * ndev-framework
 * Copyright(c) 2016-2018 Javanile.org
 * MIT Licensed
 */

const fs = require('fs')
    , join = require('path').join
    , spawn = require('child_process').spawn
    , exec = require('child_process').execSync
    , col = require('colors')
    , validate = require('validate-npm-package-name')
    , util = require('./util')

module.exports = {
    /**
     *
     */
    isRepositoryName: function (name) {
        return name.match(/^[a-z0-9-]+\/[a-z0-9-]+$/i);
    },

    /**
     * Check is valid repository url.
     */
    isRepositoryUrl: function (url) {
        return url.match(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/);
    }
}