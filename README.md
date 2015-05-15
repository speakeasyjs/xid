# Human-tolerant ID generator for NodeJS and the browser

`xid` uses the URL-friendly Crockford Base32 encoding with CRC-8 checksum to generate random identifiers that are tolerant to inaccurate human inputs.

## Install

```sh
$ npm install --save xid
```

## Usage

```js
var xid = require("xid");
var id = xid.generateId();

// do something with generated ID...

// validate user input
try {
  xid.validate(id);
} catch (err) {
  // id is invalid
}

// normalize user input
try {
  id = xid.normalize(id);
} catch (err) {
  // id is invalid
}
```

## License

Apache 2.0
