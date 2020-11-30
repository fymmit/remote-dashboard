const express = require('express');
const app = express();
const loudness = require('loudness');
const sendkeys = require('sendkeys');
const { exec } = require('child_process');
const { logger } = require('./middleware/loggingMiddleware.js');
const { isValidUrl } = require('./utils/validation.js');

app.use(logger);
app.use(express.static('ui'));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname + '/ui' });
});

app.get('/volume/:v', async (req, res) => {
  const { v } = req.params;
  const vol = Number(v);
  if (vol <= 100 && vol >= 0) {
    await loudness.setVolume(vol);
  }
  res.sendStatus(200);
});

app.get('/website', (req, res) => {
  const { url } = req.query;
  if (isValidUrl(url)) {
    exec(`start ${url}`);
    res.sendStatus(200);
    return;
  }
  res.sendStatus(400);
});

app.get('/sendkeys', async (req, res) => {
  const { keys } = req.query;
  await sendkeys(keys);
  res.sendStatus(200);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
