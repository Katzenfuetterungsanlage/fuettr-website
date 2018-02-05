"use strict";
exports.__esModule = true;
var path = require("path");
var http = require("http");
var fs = require("fs");
var express = require("express");
var bodyparser = require("body-parser");
var morgan = require("morgan");
var privKey = fs.readFileSync(path.join(__dirname, '../../x509/server.pem'));
var cert = fs.readFileSync(path.join(__dirname, '../../x509/server.crt'));
var app = express();
app.use(bodyparser.json());
app.use(morgan('tiny'));
app.get('/data', function (req, res) {
    res.sendFile(path.join(__dirname, '../updates.json'));
});
app.post('/', function (req, res, next) {
    var file = JSON.parse(fs.readFileSync(path.join(__dirname, '../updates.json')).toString());
    file.updates.push(JSON.parse(JSON.stringify(req.body)));
    fs.writeFileSync(path.join(__dirname, '../updates.json'), JSON.stringify(file));
    res.sendStatus(200);
});
app.use('/', express.static(path.join(__dirname, '../ng2/dist')));
var port = 2526;
var httpserver = http.createServer(app).listen(port, function () {
    console.log('Server running on port ' + port);
});
// const httpsserver = https.createServer({ key: privKey, cert: cert }, app).listen(port, () => {
//   console.log('Server running on port ' + port);
// });

//# sourceMappingURL=main.js.map
