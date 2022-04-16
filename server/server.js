//const scrapper = require('x-kom-scrapper');
const scrapper = require('x-kom-scrapper');

const express = require('express');
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  const scrapData = await scrapper();
  console.log(scrapData);
  res.send('Done');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
