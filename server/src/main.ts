import * as path from 'path';
import * as https from 'https';
import * as child from 'child_process';
import * as fs from 'fs';
import * as express from 'express';
import * as bodyparser from 'body-parser';
import * as morgan from 'morgan';

const privKey = fs.readFileSync(path.join(__dirname, '../../x509/server.pem'));
const cert = fs.readFileSync(path.join(__dirname, '../../x509/server.crt'));
const app = express();
app.use(bodyparser.json());
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../updates.json'));
});
app.post('/', (req, res) => {
  fs.appendFileSync(path.join(__dirname, '../updates.json'), JSON.stringify(req.body));
  res.sendStatus(200);
});

const port = 2526;
const server = https.createServer({ key: privKey, cert: cert }, app).listen(port, () => {
  console.log('Server running on port ' + port);
});
