"use strict";

/**
 * Module dependencies.
 */

var crypto = require("crypto");

/**
 * Assign default export to client implementation.
 */

exports = module.exports = require("./lib/xid");

/**
 * Generate random bytes using crypto module.
 *
 * @param {Integer} bytes Number of bytes to generate.
 * @api public
 */

exports.randomBytes = function (bytes) {
  return crypto.randomBytes(bytes);
};
