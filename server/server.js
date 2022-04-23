//const scrapper = require('x-kom-scrapper');
const scrapper = require('x-kom-scrapper');

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(
  cors({
    origin: ['http://localhost:3000'],
  })
);

app.get('/scrap-x', async (req, res) => {
  const scrapData = await scrapper();
  console.log(scrapData);
  res.send(scrapData);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/* {
  paginationParameters: [ { success: true, current: '1-30', all: '77', pages: 3 } ],
  products: {
    items: [
      [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object],
      [Object], [Object]
    ],
    total: 77
  },
  message: 'Success'
} */
