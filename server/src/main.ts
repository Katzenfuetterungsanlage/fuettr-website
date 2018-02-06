import * as path from 'path';
import * as https from 'https';
import * as http from 'http';
import * as child from 'child_process';
import * as fs from 'fs';
import * as express from 'express';
import * as bodyparser from 'body-parser';
import * as morgan from 'morgan';

import * as itf from './interfaces';

const privKey = fs.readFileSync(path.join(__dirname, '../../x509/server.pem'));
const cert = fs.readFileSync(path.join(__dirname, '../../x509/server.crt'));
const app = express();
app.use(bodyparser.json());
app.use(morgan('tiny'));

app.get('/data', (req, res) => {
  res.sendFile(path.join(__dirname, '../updates.json'));
});
app.post('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const date = new Date();
  const file: itf.Root = JSON.parse(fs.readFileSync(path.join(__dirname, '../updates.json')).toString());
  let newv: itf.Update = JSON.parse(JSON.stringify(req.body));
  newv.time = date.toLocaleTimeString();
  newv.date = date.toDateString();
  let result: itf.Update[];
  result.push(newv);
  for (let i = 0; i < file.updates.length; i++) {
    result.push(file.updates[i]);
  }
  fs.writeFileSync(path.join(__dirname, '../updates.json'), JSON.stringify(result));
  res.sendStatus(200);
});
app.use('/', express.static(path.join(__dirname, '../ng2/dist')));

const port = 2526;
const httpserver = http.createServer(app).listen(port, () => {
  console.log('Server running on port ' + port);
});
// const httpsserver = https.createServer({ key: privKey, cert: cert }, app).listen(port, () => {
//   console.log('Server running on port ' + port);
// });
