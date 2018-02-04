import * as path from 'path';
import * as http from 'http';
import * as child from 'child_process';
import * as fs from 'fs';
import * as express from 'express';
import * as bodyparser from 'body-parser';
import * as morgan from 'morgan';

const app = express();
app.use(bodyparser.json());
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../updates.json'));
});
app.post('/', (req, res) => {
  fs.appendFileSync(path.join(__dirname, '../updates.json'), req.body);
});

const port = 2526;
const server = http.createServer(app).listen(port, () => {
  console.log('Server running on port ' + port);
});
