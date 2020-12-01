const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const loudness = require('loudness');
const sendkeys = require('sendkeys');
const { exec } = require('child_process');
const { logger } = require('./middleware/loggingMiddleware.js');
const { isValidUrl } = require('./utils/validation.js');

app.use(bodyParser.json());
app.use(logger);
app.use(express.static('ui'));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname + '/ui' });
});

app.get('/volume', async (req, res) => {
  const volume = await loudness.getVolume();
  res.send(volume.toString());
});

app.post('/volume/:v', async (req, res) => {
  const { v } = req.params;
  const vol = Number(v);
  if (vol <= 100 && vol >= 0) {
    await loudness.setVolume(vol);
  }
  res.sendStatus(200);
});

app.post('/website', (req, res) => {
  const { url } = req.query;
  if (isValidUrl(url)) {
    exec(`start ${url}`);
    res.sendStatus(200);
    return;
  }
  res.sendStatus(400);
});

app.post('/sendkeys', async (req, res) => {
  const { keys } = req.body;
  await sendkeys(keys);
  res.sendStatus(200);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
