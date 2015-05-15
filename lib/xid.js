"use strict";

/**
 * Module dependencies.
 */

var base32 = require("base32.js");
var crc8 = require("./crc8");

/**
 * Number of random bytes to use per generated ID.
 */

var bsize = 9;

/**
 * Generate a human-tolerant ID.
 *
 * @api public
 */

exports.generateId = function () {
  var bytes = exports.randomBytes(bsize);
  return exports._encode(bytes);
};

/**
 * Validate a generated ID.
 *
 * @param {String} id Input ID to validate.
 * @throws {Error} Throws an error if the given ID is invalid.
 * @api public
 */

exports.validate = function (id) {
  exports._decode(id);
};

/**
 * Normalize a generated ID.
 *
 * @param {String} id Input ID to normalize.
 * @throws {Error} Throws an error if the given ID is invalid.
 * @api public
 */

exports.normalize = function (id) {
  var bytes = exports._decode(id);
  var last = bytes.length - 1;
  return exports._encode(bytes.slice(0, last), bytes[last]);
};

/**
 * Generate random bytes.
 *
 * @param {Integer} n Number of bytes to generate.
 * @api public
 */

exports.randomBytes = function (n) {
  var bytes = [];
  if (n > 0) while (n-- > 0) bytes.push(~~(Math.random()*256));
  return bytes;
};

/**
 * Encode an ID.
 *
 * @param {byte[]} bytes Byte array to encode.
 * @param {Integer} [check] Precomputed CRC-8 checksum.
 * @api public
 */

exports._encode = function (bytes, check) {
  var encoder = new base32.Encoder({ type: "crockford", lc: true });
  var check = check || crc8(bytes);
  return encoder.write(bytes).finalize([check]);
};

/**
 * Decode a generated ID.
 *
 * @param {String} id Input ID to decode.
 * @returns {byte[]} Decoded byte array.
 * @throws {Error} Throws an error if the given ID is invalid.
 * @api private
 */

exports._decode = function (id) {
  var bytes = base32.decode(id, { type: "crockford" });
  var last = bytes.length - 1;
  var calc = crc8(bytes, 0, last);
  var check = bytes[last];
  if (calc !== check) throw new Error("invalid id");
  return bytes;
};
