"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var fileName = path.join(__dirname, '173.txt');
fs.readFile(fileName, 'utf8', function (err, data) {
    if (err) {
        console.error("Error  ".concat(err.message));
        process.exit(1);
    }
    console.log(data);
});
