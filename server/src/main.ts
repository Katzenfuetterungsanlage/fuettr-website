import * as path from 'path';
import * as http from 'http';
import * as child from 'child_process';
import * as fs from 'fs';
import * as express from 'express';
import * as bodyparser from 'body-parser';
import * as debugsx from 'debug-sx';

const app = express();

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../updates.json'));
});
app.post('/', (req, res, next) => {
  fs.appendFileSync(path.join(__dirname, '../updates.json'), req.body);
});

const port = 2526;
http.createServer().listen(port);
