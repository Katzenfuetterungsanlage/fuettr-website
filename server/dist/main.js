"use strict";
exports.__esModule = true;
var path = require("path");
var http = require("http");
var fs = require("fs");
var express = require("express");
var app = express();
app.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../updates.json'));
});
app.post('/', function (req, res, next) {
    fs.appendFileSync(path.join(__dirname, '../updates.json'), req.body);
});
var port = 2526;
http.createServer().listen(port);

//# sourceMappingURL=main.js.map
