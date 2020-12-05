require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const loudness = require('loudness');
const sendkeys = require('sendkeys');
const { exec } = require('child_process');
const { logger } = require('./src/middleware/loggingMiddleware.js');
const { isValidUrl } = require('./src/utils/validation.js');

const { PORT } = process.env;

app.use(bodyParser.json());
app.use(logger);
app.use(cors());
// app.use(express.static('src/ui'));
app.use(express.static('front/build'));

app.get('/', (req, res) => {
  // res.sendFile('index.html', { root: __dirname + '/src/ui' });
  res.sendFile('index.html', { root: __dirname + '/front/build' });
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

app.post('/website', async (req, res) => {
  const { url } = req.query;
  // if (isValidUrl(url))
  {
    // exec(`start ${url}`);
    await sendkeys(`^l${url}~`);
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

app.listen(PORT || 9000, () => {
  console.log('Listening on port', PORT);
});
