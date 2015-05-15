"use strict";

var assert = require("assert");
var xid;

xid = require("../lib/xid");
describe("xid client", test);
xid = require("../index");
describe("xid nodejs", test);

function test () {

  it("should generate an ID", function () {
    this.id = xid.generateId();
    assert.notEqual(this.id, "0000000000000000");
    assert.notEqual(this.id, xid.generateId());
  });

  it("should validate an ID", function () {
    xid.validate(this.id);
  });

  it("should not validate an invalid ID", function () {
    var valid = this.id;
    assert.throws(function () { xid.validate("") });
    assert.throws(function () { xid.validate("0") });
    assert.throws(function () { xid.validate("0000000000000001") });
    assert.throws(function () { xid.validate(valid + "z") });
  });

  it("should normalize an ID", function () {
    assert.equal(xid.normalize("phhzzrk5kahgve6s"), "phhzzrk5kahgve6s")
    assert.equal(xid.normalize("Phhzzrk5kahgve6s"), "phhzzrk5kahgve6s")
    assert.equal(xid.normalize("PHHzzrk5kahgve6s"), "phhzzrk5kahgve6s")
    assert.equal(xid.normalize("wmsws6b4ff9Lv27w"), "wmsws6b4ff91v27w")
    assert.equal(xid.normalize("jgvTWvOjbp2p262e"), "jgvtwv0jbp2p262e")
  });

  it("should not normalize an invalid ID", function () {
    assert.throws(function () {
      xid.normalize("phhzzrkskahgve6s");
    });
    assert.throws(function () {
      xid.normalize("Phhzzrk5aahgve6s");
    });
    assert.throws(function () {
      xid.normalize("PHKzzrk5kahgve6s");
    });
    assert.throws(function () {
      xid.normalize("wmsws6b4ffOLv27w");
    });
    assert.throws(function () {
      xid.normalize("jgvTWvOjbpZp262e");
    });
  });

}
