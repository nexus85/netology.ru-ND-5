const fs = require('fs');
const hash = require('crypto').createHash('md5');
const Readable = require('stream').Readable;
const Writable = require('stream').Writable;
const Transform = require('stream').Transform;

const input = fs.createReadStream('in.txt');
const output = fs.createWriteStream('out.txt');

class NewTransform extends Transform {
    constructor(options) {
        super(options);
    }

    _transform(chunk, encoding, callback) {
        let hex = chunk.toString('hex');
        this.push(hex);
        callback();
    }
}

const out = new NewTransform();

input.pipe(out).pipe(process.stdout);
input.pipe(out).pipe(output);