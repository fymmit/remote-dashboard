const express = require('express');
const router = express.Router();
const loudness = require('loudness');
const sendkeys = require('sendkeys');
const { exec } = require('child_process');
const fs = require('fs');
const screenshot = require('screenshot-desktop');
const robot = require('robotjs');

router.get('/volume', async (req, res) => {
  const volume = await loudness.getVolume();
  res.send(volume.toString());
})
router.post('/volume/:v', async (req, res) => {
  const { v } = req.params;
  const vol = Number(v);
  if (vol <= 100 && vol >= 0) {
    await loudness.setVolume(vol);
  }
  res.sendStatus(200);
})
router.post('/website', async (req, res) => {
  const { url } = req.query;
  // if (isValidUrl(url))
  {
    // exec(`start ${url}`);
    await sendkeys('^l');
    await sendkeys(url);
    await sendkeys('{ENTER}');
    res.sendStatus(200);
    return;
  }
  // res.sendStatus(400);
})
router.post('/sendkeys', async (req, res) => {
  const { keys } = req.body;
  await sendkeys(keys);
  res.sendStatus(200);
});
router.get('/screenshot', async (req, res) => {
  const ss = await screenshot();
  const timeStamp = Date.now().toString();
  const filePath = `public/${timeStamp}.jpg`;
  fs.writeFile(filePath, ss, (err) => {
    if (!err) {
      res.send(timeStamp + '.jpg');
    } else {
      res.sendStatus(500);
    }
  });
});
router.post('/click', async (req, res) => {
  const { x, y } = req.body;
  robot.moveMouse(x, y);
  robot.mouseClick();
  res.sendStatus(200);
});

module.exports = router;
