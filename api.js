require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { logger } = require('./src/middleware/loggingMiddleware.js');
const { isValidUrl } = require('./src/utils/validation.js');
const apiRouter = require('./routes/apiRouter.js');

const { PORT } = process.env;

app.use(bodyParser.json());
app.use(logger);
app.use(cors());
// app.use(express.static('src/ui'));
app.use(express.static('front/build'));
app.use('/api', apiRouter);

app.get('*', (_, res) => {
  // res.sendFile('index.html', { root: __dirname + '/src/ui' });
  res.sendFile('index.html', { root: __dirname + '/front/build' });
});


app.listen(PORT || 9000, () => {
  console.log('Listening on port', PORT);
});
